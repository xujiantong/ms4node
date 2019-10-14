<template>
    <div class="logFund">
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialog.show"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <div class="form">
                <el-form
                        ref="form"
                        :model="form"
                        :rules="form_rules"
                        label-width="120px"
                        style="margin:10px;width:auto;">

                    <!--                    <el-form-item label="收支类型:" >-->
                    <!--                        <el-select v-model="form.type" placeholder="收支类型">-->
                    <!--                            <el-option-->
                    <!--                                    v-for="(formtype, index) in format_type_list"-->
                    <!--                                    :key="index"-->
                    <!--                                    :label="formtype" :value="formtype"-->
                    <!--                            ></el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </el-form-item>-->

                    <el-form-item prop='name' label="部门名称:">
                        <el-input  v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item prop='parentId' label="上级部门:">
                        <el-select v-model="form.parentId" placeholder="请选择">
                            <el-option
                                    v-for="item in deptFlatTreeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                {{item.level | transSplit}} {{item.name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='seq' label="排序:">
                        <el-input  v-model="form.seq"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DialogFound",
        props:{
            dialog: Object,
            form: Object
        },
        created(){
            this.getAllDeptList()
        },
        data(){
            return {
                deptTreeList:[],
                deptFlatTreeList:[],
                formData:{
                    name: "",
                    parentId: "",
                    seq: "",
                    remark: "",
                    id: ""
                },
                form_rules: {
                    name: [
                        { required: true, message: "部门名称不可以为空！", trigger: "blur" },
                        { min: 2, max: 15, message: '部门名称需要在2-15个字符之间', trigger: 'blur' }
                    ],
                    seq: [
                        { required: true, message: "展示顺序不可以为空！", trigger: "blur" }
                    ],
                    remark: [
                        {  max: 150, message: '备注长度在150个字之内', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            getAllDeptList(){
                this.$axios.get(`/mokcloud/sys/dept/tree.json`).then(res => {
                    this.deptTreeList = res.data.data;
                    this.deptFlatTreeList = this.flatten(this.deptTreeList);
                    this.deptFlatTreeList.unshift({id: 0, name: '顶级菜单', parentId: 0, level: 0});
                    console.log(this.deptFlatTreeList);
                });
            },
            /** 方法 : 树形结构扁平化  * */
            flatten(data, level = 0) {
                return data.reduce((arr, {id, name, parentId, level, seq, deptList = []}) =>
                    arr.concat([{id, name, parentId, level, seq}], this.flatten(deptList, level + 1)), [])
            },
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        //表单数据验证完成之后，提交数据;
                        const url =  this.dialog.option == "add" ? "save.json" : `update.json`;
                        this.dialog.option == "add" && delete this.form.id;
                        this.$axios.get(`/mokcloud/sys/dept/${url}`,{params:this.form}).then(res => {
                            // 操作成功
                            this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                            this.dialog.show = false;
                            // this.$emit("update");
                        });
                    }
                });
            }
        },
        filters: {
            transSplit(val) {
                let level = val.toString().split(".").length - 1;
                if (level === 0) {
                    return "|--"
                } else {
                    return "|--" + "--".repeat(level * level);
                }
            },
            statusFilter(val) {
                switch (val) {
                    case 0 :
                        return "冻结";
                    case 1 :
                        return "正常";
                    case 2 :
                        return "删除";
                    default :
                        return ""
                }
            },

        }
    }
</script>

<style scoped>

</style>
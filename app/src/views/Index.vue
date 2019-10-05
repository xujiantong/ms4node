<template>
    <div class="index">
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeadNav from "../components/HeadNav"
    import LeftMenu from "../components/LeftMenu";
    export default {
        name: "index",
        components:{LeftMenu, HeadNav},
        data(){
            return {

            }
        }
    }
</script>

<style scoped lang="less">
    .index{
        width: 100%;
        height: 100%;
        background: #eee;
        overflow: hidden;
        /*background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;*/
        /*background-blend-mode: multiply,multiply;*/
    }
    .rightContainer {
        position: relative;
        top: 0;
        left: 180px;
        width: calc(100% - 180px);
        height: calc(100% - 60px);
        overflow: auto;
    }
</style>
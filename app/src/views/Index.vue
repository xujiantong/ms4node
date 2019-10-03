<template>
    <div class="index">
        <HeadNav></HeadNav>
    </div>
</template>

<script>
    import HeadNav from "../components/HeadNav"
    export default {
        name: "index",
        components:{HeadNav},
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
        background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
        background-blend-mode: multiply,multiply;
    }

</style>
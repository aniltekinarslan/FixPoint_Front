<template>
    <div class="breadcrumb-box">
        <el-breadcrumb separator="/" class="breadcrumb-box-in">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in ((this.$parent && this.$parent.$route && this.$parent.$route.matched) || [])" :to="item">
                {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/_variables';
    @import '../assets/scss/card-shadow';

    .breadcrumb-box {
        width: 100%;
        margin-top:8px;
        margin-left:15px;
    }
    .breadcrumb-box .breadcrumb-box-in {
        font-weight: bolder;
        font-size: 1.2em;
    }
</style>

<script>
    export default {
        name: 'BreadCrumb',
    }
</script>

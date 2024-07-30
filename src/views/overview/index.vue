<template>
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
</template>
<script lang="ts" setup>
import {ref} from "vue";

//面包屑
import bread_Crumb from '@/components/bread_crumb.vue';
const breadcrumb =ref()
const item = ref({
  first:'系统概览'
})
</script>
<style scoped lang="scss">

</style>
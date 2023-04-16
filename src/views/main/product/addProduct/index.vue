<!--
 * @Author: fgq
 * @Date: 2023-04-15 17:05:51
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-17 00:58:22
 * @Description: 
-->
<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="填写商品信息" />
    <el-step title="填写商品属性" />
    <el-step title="Step 3" />
  </el-steps>
  <Form ref="form" v-if="active === 0" :schemas="productFormModal"></Form>
  <Form ref="form1" v-if="active === 1" :schemas="productAttributeFormModal"></Form>
  <el-button v-show="active > 0" style="margin-top: 12px" @click="pre">previous step</el-button>
  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Form from "@/components/form/index.vue";
import { useProductFormModel } from "./useProductFormModel";
import { useProductAttributeFormModel } from "./useProductAttributeFormModel";
const active = ref(0);
const categoryId = ref(0);
const { productFormModal } = useProductFormModel();
const { productAttributeFormModal, getAttribute } = useProductAttributeFormModel();
const form = ref(null);
const next = () => {
  if (active.value === 0) {
    form.value.sumbitForm().then((res) => {
      categoryId.value = res.productCategoryName[res.productCategoryName.length - 1];
      getAttribute(categoryId.value)
       if (active.value++ > 2) active.value = 0

    });
  }
};
const pre = () =>{
    if(active.value>0){
        active.value --
    }
}
</script>

<style lang="scss" scoped>
.statusName {
  margin-right: 10px;
}
</style>

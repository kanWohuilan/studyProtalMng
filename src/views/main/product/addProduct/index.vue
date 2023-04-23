<!--
 * @Author: fgq
 * @Date: 2023-04-15 17:05:51
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-24 00:59:45
 * @Description: 
-->
<template>
  <el-card class="box-wrapper">
    <template #header>
      <el-steps align-center :active="active" finish-status="success">
        <el-step title="填写商品信息" />
        <el-step title="填写商品属性" />
        <el-step title="Step 3" />
      </el-steps>
    </template>
    <div class="step" v-if="active === 0">
      <Form ref="productForm" :schemas="productFormModal"></Form>
    </div>
    <div class="step" v-if="active === 1">
      <el-form>
        <el-form-item
          v-for="item in customizeAttributeFormModal"
          :key="item.field"
          :label="item.label+'：'"
        >
          <div class="">
            <el-checkbox-group v-model="formModel[item.field]">
              <el-checkbox
                v-for="item1 in item.selectOptions"
                :key="item1.label"
                :label="item1.label"
              />
            </el-checkbox-group>
            <div class="add-attribute">
            <el-input class="attribute-input"></el-input>
            <el-button>增加</el-button>
          </div>
          </div>
        </el-form-item>
      </el-form>
      <el-table :data="skuTable" border>
        <el-table-column v-for="item in tableRow" :key="item.id" v-bind="item"></el-table-column>
        <!-- <el-table-column v-for="item in tableRow" :key="item.id" v-bind="item">
          <template #default="scope">
            <el-input
              v-if="skuAttributeFormModal[item.prop].inputType === 0"
              v-model="skuTable[0][item.prop]"
            />
            <el-select v-else v-model="skuTable[0][item.prop]">
              <el-option
                v-for="item1 in skuAttributeFormModal[item.prop].selectOptions"
                :key="item1.value"
                :label="item1.label"
                :value="item1.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->
      </el-table>
      <el-button @click="add">增加sku</el-button>
      <Layer :layer="layer" @confirm="submit">
        <Form ref="skuForm" v-if="active === 1" :schemas="skuAttributeFormModal">
          <template #price-append>
            ￥
          </template>
        </Form>
      </Layer>
    </div>

    <el-button v-show="active > 0" style="margin-top: 12px" @click="pre">previous step</el-button>
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Form from "@/components/form/index.vue";
import { useProductFormModel } from "./useProductFormModel";
import { useProductAttributeFormModel } from "./useProductAttributeFormModel";
import { addProductAndSku } from "@/api/product/product";
import Layer from "@/components/layer/index.vue";
const skuTable = ref([]);
const formModel = ref({});
const rules = ref({});
const active = ref(0);
const categoryId = ref(0);
const layer = ref({
  show: false,
  title: "",
  showButton: true,
  row: {},
});
const productForm = ref(null);
const skuForm = ref(null);
const productData = ref({});
const { productFormModal } = useProductFormModel();
const { customizeAttributeFormModal, getAttribute, skuAttributeFormModal, tableRow } =
  useProductAttributeFormModel();
const form = ref(null);
const add = () => {
  layer.value.show = true;
};
function submit() {
  skuForm.value.sumbitForm().then((model) => {
    skuTable.value.push(model);
    layer.value.show = false;
  });
}
const next = () => {
  if (active.value === 0) {
    productForm.value.sumbitForm().then((res) => {
      productData.value = res;
      categoryId.value = res.productCategoryId[res.productCategoryId.length - 1];
      getAttribute(categoryId.value).then((res) => {
        initDefault(customizeAttributeFormModal.value);
      });
      if (active.value++ > 2) active.value = 0;
    });
  }
  if (active.value === 1) {
    const data = { ...productData.value };
    data.skuList = skuTable.value;
    data.productCategoryId = Number(categoryId.value);
    console.log(data);

    addProductAndSku(data).then((res) => {
      debugger;
    });
  }
};
const initDefault = (model) => {
  model.forEach((item) => {
    formModel[item.field] = item.defaultValue;
    if (item.ruleOptions) {
      rules[item.field] = item.ruleOptions;
    }
  });
};
const pre = () => {
  if (active.value > 0) {
    active.value--;
  }
};
</script>

<style lang="scss" scoped>
.statusName {
  margin-right: 10px;
}
.box-wrapper {
  margin: 0 60px;
  padding: 30px;
}
.step {
  padding: 0 50px;
  width: 70%;
}
.add-attribute {
  display: flex;
  .attribute-input {
    width: 100px;
    margin-right: 10px;
  }
}
</style>

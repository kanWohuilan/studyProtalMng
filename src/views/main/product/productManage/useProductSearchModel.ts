import { ref } from "vue";

import { getProductBrandList } from "@/api/product/productBrand";
import { getProductCategoryList } from "@/api/product/productCategory";

/*
 * @Author: fgq
 * @Date: 2023-04-09 15:19:19
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-15 16:31:36
 * @Description:
 */
export const useProductSearchModel = () => {
  const productSearchModel:any = ref([
    {
      component: "el-input",
      // Field name
      field: "name",
      valueField: "name",
      // Label name
      label: "商品名称:",
      defaultValue: "",
      placeholder: "1",
    },
    {
      component: "el-input",
      // Field name
      field: "productSn",
      valueField: "productSn",
      // Label name
      label: "货号",
      defaultValue: "",
      placeholder: "1",
    },
    {
      component: "select",
      // Field name
      field: "brandId",
      valueField: "brandId",
      // Label name
      label: "品牌:",
      defaultValue: "",
      placeholder: "1",
      selectOptions: [
       
      ],
    },
    {
      component: "cascader",
      // Field name
      field: "productCategoryName",
      valueField: "productCategoryName",
      // Label name
      label: "分类:",
      defaultValue: "",
      placeholder: "1",
      options: [],
    },
    {
      component: "select",
      // Field name
      field: "publishStatus",
      valueField: "publishStatus",
      // Label name
      label: "上架状态：",
      defaultValue: "",
      ruleOptions: { required: true, message: "请输入账号", trigger: "blur" },
      placeholder: "1",
      attributes: {
        clearable: true,
      },
      selectOptions: [
        { value: 1, label: "上架" },
        { value: 0, label: "下架" },
      ],
    },
  ]);
  getProductCategoryList({}).then(res=>{
    const {data} = res
    productSearchModel.value.forEach(element => {
      if(element.field=== "productCategoryName") {
        element.options = data
      }
    });
  })
  getProductBrandList({}).then(res=>{
    const {data} = res
    productSearchModel.value.forEach(element => {
      if(element.field=== "brandId") { 
        element.selectOptions = data.map(item=>{
          return {label:item.name,
          value:item.id}
        })
      }
    });
  })
  return {
    productSearchModel
  }
};

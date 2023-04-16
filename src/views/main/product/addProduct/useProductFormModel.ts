import { ref } from "vue";

import { getProductBrandList } from "@/api/product/productBrand";
import { getProductCategoryList } from "@/api/product/productCategory";

export const useProductFormModel = ()=>{
    const model = [
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
            component: "el-input",
            // Field name
            field: "subTitle",
            valueField: "subTitle",
            // Label name
            label: "副标题",
            defaultValue: "",
            placeholder: "1",
          },
          {
            component: "el-input",
            // Field name
            field: "description",
            valueField: "description",
            // Label name
            label: "商品介绍",
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
            ruleOptions: { required: true, message: "请输入账号", trigger: "blur" },
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
            placeholder: "1",
            attributes: {
              clearable: true,
            },
            selectOptions: [
              { value: 1, label: "上架" },
              { value: 0, label: "下架" },
            ],
          },
    ]
    const productFormModal = ref(model)
    getProductCategoryList({}).then(res=>{
        const {data} = res
        productFormModal.value.forEach(element => {
          if(element.field=== "productCategoryName") {
            element.options = data
          }
        });
      })
      getProductBrandList({}).then(res=>{
        const {data} = res
        productFormModal.value.forEach(element => {
          if(element.field=== "brandId") { 
            element.selectOptions = data.map(item=>{
              return {label:item.name,
              value:item.id}
            })
          }
        });
      })
      return {
        productFormModal
      }
}
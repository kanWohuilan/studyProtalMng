/*
 * @Author: fgq
 * @Date: 2023-04-15 23:08:17
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-23 23:35:36
 * @Description: 商品表单
 */
import { ref } from "vue";

import { getProductBrandList } from "@/api/product/productBrand";
import { getProductCategoryList } from "@/api/product/productCategory";

export const useProductFormModel = () => {
  const model = [
    {
      component: "cascader",
      field: "productCategoryId",
      valueField: "productCategoryId",
      label: "分类：",
      defaultValue: "",
      ruleOptions: { required: true, message: "请选择分类", trigger: "blur" },
      placeholder: "请选择分类",
      options: [],
    },
    {
      component: "input",
      field: "name",
      valueField: "name",
      label: "商品名称：",
      ruleOptions: { required: true, message: "请输入商品名称", trigger: "blur" },
      defaultValue: "",
      placeholder: "请输入商品名称",
    },
    {
      component: "select",
      field: "brandId",
      valueField: "brandId",
      label: "品牌：",
      defaultValue: "",
      placeholder: "请选择商品品牌",
      selectOptions: [],
    },
    {
      component: "input",
      field: "productSn",
      valueField: "productSn",
      ruleOptions: { required: true, message: "请输入货号", trigger: "blur" },
      label: "货号：",
      defaultValue: "",
      placeholder: "请输入货号",
    },
    {
      component: "input",
      field: "description",
      valueField: "description",
      label: "商品介绍：",
      defaultValue: "",
      placeholder: "请输入商品介绍",
    },

    {
      component: "select",
      field: "publishStatus",
      valueField: "publishStatus",
      label: "上架状态：",
      defaultValue: "",
      placeholder: "请选择上架状态",
      attributes: {
        clearable: true,
      },
      selectOptions: [
        { value: 1, label: "上架" },
        { value: 0, label: "下架" },
      ],
    },
  ];
  const productFormModal = ref(model);
  getProductCategoryList({}).then((res) => {
    const { data } = res;
    productFormModal.value.forEach((element) => {
      if (element.field === "productCategoryId") {
        element.options = data;
      }
    });
  });
  getProductBrandList({}).then((res) => {
    const { data } = res;
    productFormModal.value.forEach((element) => {
      if (element.field === "brandId") {
        element.selectOptions = data.map((item) => {
          return { label: item.name, value: item.id };
        });
      }
    });
  });
  return {
    productFormModal,
  };
};

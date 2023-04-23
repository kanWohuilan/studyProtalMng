/*
 * @Author: fgq
 * @Date: 2023-04-16 11:07:27
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-24 01:12:02
 * @Description: sku属性参数表单
 */
import { ref } from "vue";

import { getProductAttributeList } from "@/api/product/productAttribute";

export const useProductAttributeFormModel = () => {
  //sku 基础属性
  const model= [
    { 
      component: "el-input",
      field: "skuCode",
      valueField: "skuCode",
      label: "sku编号",
      defaultValue: "",
      placeholder: "请输入sku编号",
    },
    {
      component: "input",
      field: "price",
      valueField: "price",
      label: "价格",
      defaultValue: "",
      placeholder: "请输入价格",
      slotList:['append']
    },
    {
      component: "el-input",
      field: "stock",
      valueField: "stock",
      label: "库存",
      attributes:{
        type:'number'
      },
      defaultValue: "",
      placeholder: "请输入库存",
    }
  ];
  const tableModel = [{
    prop: "skuCode",
    label: "sku编号",
    align: "center",
    width: "80",
    id: "2",
  },{
    prop: "price",
    label: "价格",
    align: "center",
    width: "80",
    id: "3",
  },{
    prop: "stock",
    label: "库存",
    align: "center",
    width: "80",
    id: "4",
  }]
  const customizeAttributeFormModal: any = ref([]);
  const inputAttributeFormModal: any = ref([]);
  const selectAttributeFormModal: any = ref([]);
  const skuAttributeFormModal: any = ref(model);
  const tableRow: any = ref(tableModel);
  const getAttribute = async (categoryId: number) => {
    getProductAttributeList({ categoryId: categoryId }).then((res) => {
      const { data } = res;
      data.forEach((item) => {
        tableRow.value.push({
          prop: item.id,
          label: item.name,
          align: "center",
          width: "80",
          id: item.id,
        });
        //手工录入属性
        if (item.inputType === 0) {
          skuAttributeFormModal.value.push({
            component: "el-input",
            field: item.id.toString(),
            valueField: item.id.toString(),
            label: item.name,
            defaultValue: "",
            placeholder: `请输入${item.name}`,
          });
          inputAttributeFormModal.value.push({
            component: "el-input",
            field: item.id.toString(),
            valueField: item.id.toString(),
            label: item.name,
            defaultValue: "",
            placeholder: `请输入${item.name}`,
          });
        } else {
          //列表录入属性
          // 不可自定义属性
          if (item.selectType === 2) {
            const selectOptions = item.inputList.split(",").map((item) => {
              return { value: item, label: item };
            });
            skuAttributeFormModal.value.push({
              component: "select",
              field: item.id.toString(),
              valueField: item.id.toString(),
              label: item.name,
              defaultValue: "",
              placeholder: `请选择${item.name}`,
              selectOptions,
            });
            customizeAttributeFormModal.value.push({
              component: "select",
              field: item.id.toString(),
              valueField: item.id.toString(),
              label: item.name,
              defaultValue: "",
              placeholder: `请选择${item.name}`,
              selectOptions,
            });
          } else {
            const selectOptions = item.inputList.split(",").map((item) => {
              return { value: item, label: item };
            });
            skuAttributeFormModal.value.push({
              component: "select",
              field: item.id.toString(),
              valueField: item.id.toString(),
              label: item.name,
              defaultValue: "",
              placeholder: `请选择${item.name}`,
              selectOptions,
            });
            selectAttributeFormModal.value.push({
              component: "select",
              field: item.id.toString(),
              valueField: item.id.toString(),
              label: item.name,
              defaultValue: "",
              placeholder: `请选择${item.name}`,
              selectOptions,
            });
          }
        }
      });
    });
  };
  return {
    customizeAttributeFormModal,
    getAttribute,
    skuAttributeFormModal,
    tableRow,
  };
};

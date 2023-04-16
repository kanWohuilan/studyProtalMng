/*
 * @Author: fgq
 * @Date: 2023-04-16 11:07:27
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-17 00:55:08
 * @Description:
 */
import { ref } from "vue";

import { getProductAttributeList } from "@/api/product/productAttribute";

export const useProductAttributeFormModel = () => {
  const productAttributeFormModal: any = ref([]);
  const getAttribute = (categoryId: number) => {
    getProductAttributeList({ categoryId: categoryId }).then((res) => {
      const { data } = res;
   debugger
      data.forEach((item) => {
        if (item.inputType === 0) {
          productAttributeFormModal.value.push({
            component: "el-input",
            field: item.id.toString(),
            valueField: item.id.toString(),
            label: item.name,
            defaultValue: "",
            placeholder: "1",
          });
        } else {
          const selectOptions = item.inputList.split(",").map((item) => {
            return { value: item, label: item };
          });
          productAttributeFormModal.value.push({
            component: "select",
            field: item.id.toString(),
            valueField: item.id.toString(),
            label: item.name,
            defaultValue: "",
            placeholder: "1",
            selectOptions,
          });
        }
      });
    });
  };
  return {
    productAttributeFormModal,
    getAttribute,
  };
};

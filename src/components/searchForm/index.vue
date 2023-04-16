<template>
  <el-form
    :model="formModel"
    v-bind="$attrs"
    :rules="rules"
    ref="form"
    :validateOnRuleChange="false"
  >
    <el-form-item
      v-for="item in props.schemas"
      :key="item.field"
      :label="item.label"
      :prop="item.field"
    >
      <el-select
        v-if="item.component === componentName.SELECT"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
      >
        <el-option
          v-for="item1 in item.selectOptions"
          :key="item1.value"
          :label="item1.label"
          :value="item1.value"
        >
        </el-option>
      </el-select>
      <el-radio-group
        v-else-if="item.component === componentName.RADIO"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
      >
        <el-radio v-for="item1 in item.radioOptions" :key="item1.value" :label="item1.label">
          {{ item1.text }}
        </el-radio>
      </el-radio-group>
      <el-cascader
        v-else-if="item.component === componentName.CASCADER"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
        :options="item.options"
      >
      </el-cascader>
      <component
        v-else
        :is="item.component"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
      ></component>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="sumbitForm">查询</el-button>
  <el-button @click="reset">重置</el-button>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from "vue";
import useFormData from "./useFormValues";
import { componentName } from "@/enum/component";
const formModel: any = reactive({});
const rules: any = reactive({});
const form = ref(null);
const props = defineProps({
  schemas: {
    type: Array,
    default: () => [],
  },
});
// const { handleFormValues, initDefault  } = useFormValues({});
const emit = defineEmits(['getData'])
const initDefault = () => {
  props.schemas.forEach((item) => {
    formModel[item.field] = item.defaultValue;
  });
};
const reset =()=> {
    Object.keys(formModel).forEach(item => {
        formModel[item] = ""
    })
    emit('getData')
}
const sumbitForm = () => {
    emit('getData',toRaw(formModel))
//   return new Promise<void>((resolve, reject) => {
//     form.value.validate((valid, fields) => {
//       if (valid) {
//         resolve(toRaw(formModel));
//       } else {
//         reject();
//       }
//     });
//   });
};
defineExpose({
  sumbitForm,
});
onMounted(() => {
  initDefault();
});
</script>
<style lang="scss" scoped></style>

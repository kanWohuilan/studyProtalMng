<template>
  <el-form
    :model="formModel"
    v-bind="$attrs"
    :rules="rules"
    label-width="100px"
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
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="item1 in item.selectOptions"
          :key="item1.value"
          :label="item1.label"
          :value="item1.value"
        >
        </el-option>
      </el-select>
      <el-cascader
        :placeholder="item.placeholder"
        v-else-if="item.component === componentName.CASCADER"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
        :options="item.options"
      >
      </el-cascader>
      <el-radio-group
        v-else-if="item.component === componentName.RADIO"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
      >
        <el-radio v-for="item1 in item.radioOptions" :key="item1.value" :label="item1.label">
          {{ item1.text }}
        </el-radio>
      </el-radio-group>
      <el-input
        v-else
        :is="item.component"
        :placeholder="item.placeholder"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
      >
      <template v-for="s in item.slotList" :key="s" #[s]>
        <slot :name="item.field+'-'+s"></slot>
      </template>
      </el-input>
    </el-form-item>
  </el-form>
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
const slotName = (name)=>{
  return name.split('-')[1]
}
// const { handleFormValues, initDefault  } = useFormValues({});
const initDefault = () => {
  console.log(props.schemas)
  props.schemas.forEach((item) => {
    formModel[item.field] = item.defaultValue;
    if (item.ruleOptions) {
      rules[item.field] = item.ruleOptions;
    }
  });
};
const sumbitForm = () => {
  return new Promise<void>((resolve, reject) => {
    form.value.validate((valid, fields) => {
      if (valid) {
        resolve(toRaw(formModel));
      } else {
        reject();
      }
    });
  });
};
defineExpose({
  sumbitForm,
});
onMounted(() => {
  initDefault();
});
</script>
<style lang="scss" scoped></style>

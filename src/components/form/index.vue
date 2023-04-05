<template>
  <el-form :model="formModel" v-bind="$attrs" :rules="rules" ref="form" :validateOnRuleChange="false">
    <el-form-item
      v-for="item in props.schemas"
      :key="item.field"
      :label="item.label"
      :prop="item.field"
    >
    <el-select
       v-if="item.component==='select'"
       v-model="formModel[item.field]" v-bind="item.attributes">
        <el-option
          v-for="item1 in item.selectOptions"
          :key="item1.value"
          :label="item1.label"
          :value="item1.value"
        >
        </el-option>
      </el-select>
      <el-radio-group 
       v-else-if="item.component==='radio'"
       v-model="formModel[item.field]" v-bind="item.attributes">
        <el-radio
          v-for="item1 in item.radioOptions"
          :key="item1.value"
          :label="item1.label"
        >
        {{item1.text}}
        </el-radio>
      </el-radio-group >
      <component
      v-else
        :is="item.component"
        v-model="formModel[item.field]"
        v-bind="item.attributes"
      ></component>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from "vue";
import useFormData from "./useFormValues"
const formModel:any = reactive({})
const rules:any = reactive({})
const form = ref(null)
const props = defineProps({
    schemas:{
        type:Array,
        default:()=>[]
    }
})
// const { handleFormValues, initDefault  } = useFormValues({});
const initDefault = ()=>{
  props.schemas.forEach(item=>{
    debugger
      formModel[item.field] = item.defaultValue
      if( item.ruleOptions ) {
       rules[item.field] = item.ruleOptions
      }
  })
}
const sumbitForm = ()=>{
   return new Promise<void>((resolve, reject) => {
    form.value.validate((valid, fields)=>{
      if(valid) {
        resolve(toRaw(formModel))
      }else {
        reject()
      }
    })
   })
}
defineExpose({
  sumbitForm
})
onMounted(()=>{
    initDefault()
})
</script>
<style lang="scss" scoped></style>

<template>
  <Layer :layer="layer" @confirm="submit">
    <Form ref="form" :schemas="roleForm"></Form>
    <!-- <el-form
      :model="ruleForm"
      :rules="rules"
      ref="form"
      label-width="120px"
      style="margin-right: 30px"
    >
      <el-form-item label="账号：" prop="userName">
        <el-input
          v-model="ruleForm.userName"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName">
        <el-input
          v-model="ruleForm.nickName"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色：" prop="select">
			  <el-select v-model="ruleForm.roleIds" placeholder="请选择" multiple clearable>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="是否开启：" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="0">开启</el-radio>
          <el-radio label="1">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form> -->
  </Layer>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, toRaw } from "vue";
import Layer from "@/components/layer/index.vue";
import Form from "@/components/form/index.vue";
import { add, update } from "@/api/system/user";
import { ElMessage } from "element-plus";
import { roleFormModel } from "./roleForm";
import { nextTick } from "process";
const roleForm = ref(roleFormModel);
const props = defineProps({
  layer: {
    type: Object,
    default: () => {
      return {
        show: false,
        title: "",
        showButton: true,
        row: {},
      };
    },
  },
});
// let ruleForm = reactive({
//   userId:"",
//   userName: "",
//   nickName: "",
//   email: "",
//   password: "",
//   status:'0',
//   roleIds:[]
// });
roleForm.value.forEach((item) => {
  debugger
  if (props.layer.row[item.field]) {
    item.defaultValue = props.layer.row[item.field];
  }
});
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  }
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    )
  ) {
    callback(new Error("请输入正确格式的邮箱"));
  } else {
    callback();
  }
};
const form = ref(null);
const rules = {
  userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
  nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
};
const options = [
  { value: 1, label: "超级管理员" },
  { value: 2, label: "管理员" },
];

function submit() {
  form.value.sumbitForm().then((valid: boolean) => {
    if (valid) {
      let params = ruleForm;
      if (props.layer.row) {
        updateForm(params);
      } else {
        addForm(params);
      }
    } else {
      return false;
    }
  });
}
// 新增提交事件
function addForm(params: object) {
  add(params).then((res) => {
    ElMessage({
      type: "success",
      message: "新增成功",
    });
    props.layer.show = false;
    ElMessage("getTableData", true);
  });
}
// 编辑提交事件
function updateForm(params: object) {
  update(params).then((res) => {
    ElMessage({
      type: "success",
      message: "编辑成功",
    });
    ElMessage("getTableData", false);
  });
}
</script>

<style lang="scss" scoped></style>

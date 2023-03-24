<template>
  <Layer :layer="layer" @confirm="submit">
    <el-form
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
      {{ruleForm.roleIds}}
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
    </el-form>
  </Layer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRaw } from "vue";
import Layer from "@/components/layer/index.vue";
import { add, update } from "@/api/system/user";
export default defineComponent({
  components: {
    Layer,
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: "",
          showButton: true,
          row:{}
        };
      },
    },
  },
  setup(props, ctx) {
    let ruleForm = reactive({
      userId:"",
      userName: "",
      nickName: "",
      email: "",
      password: "",
      status:'0',
      roleIds:[]
    });
    console.log(props.layer.row)
    Object.keys(toRaw(ruleForm)).forEach(item => {
      if(props.layer.row[item]) {
        ruleForm[item] = props.layer.row[item]
      }
    })
    const validateEmail = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      }
      if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
        callback(new Error("请输入正确格式的邮箱"));
      }
       else {
        callback();
      }
    };
    const rules = {
      userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      email: [{ validator:validateEmail, trigger: "blur" }],
    };
    const options = [
      { value: 1, label: "超级管理员" },
      { value: 2, label: "管理员" },
    ];
    return {
      ruleForm,
      rules,
      options,
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid: boolean) => {
        if (valid) {
          let params = this.ruleForm;
          if (this.layer.row) {
            this.updateForm(params);
          } else {
            this.addForm(params);
          }
        } else {
          return false;
        }
      });
    },
    // 新增提交事件
    addForm(params: object) {
      add(params).then((res) => {
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.layer.show = false;
        this.$emit("getTableData", true);
      });
    },
    // 编辑提交事件
    updateForm(params: object) {
      update(params).then((res) => {
        this.$message({
          type: "success",
          message: "编辑成功",
        });
        this.$emit("getTableData", false);
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>

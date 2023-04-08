/*
 * @Author: fgq
 * @Date: 2023-04-05 23:08:09
 * @LastEditors: fgq
 * @LastEditTime: 2023-04-08 17:17:12
 * @Description: 
 */
export const roleFormModel = [
  {
    component: "el-input",
    // Field name
    field: "roleName",
    valueField: "roleName",
    // Label name
    label: "账号:",
    defaultValue: "",
    ruleOptions:{ required: true, message: "请输入账号", trigger: "blur" },
    placeholder:"1"
  },
  {
    component: "el-input",
    // Field name
    field: "nickName",
    valueField: "nickName",
    // Label name
    label: "昵称:",
    defaultValue: "",
    ruleOptions:{ required: true, message: "请输入账号", trigger: "blur" },
    placeholder:"1"
  },
  {
    component: "el-input",
    // Field name
    field: "email",
    valueField: "email",
    // Label name
    label: "邮箱:",
    defaultValue: "",
    ruleOptions:{ required: true, message: "请输入账号", trigger: "blur" },
    placeholder:"1"
  },
  {
    component: "select",
    // Field name
    field: "roleIds",
    valueField: "roleIds",
    // Label name
    label: "角色：",
    defaultValue: "",
    ruleOptions:{ required: true, message: "请输入账号", trigger: "blur" },
    placeholder:"1",
    attributes:{
      multiple:true,clearable:true
    },
    selectOptions:
      [
        { value: 1, label: "超级管理员" },
        { value: 2, label: "管理员" },
      ]
  },
  {
    component: "radio",
    // Field name
    field: "status",
    valueField: "status",
    // Label name
    label: "状态：",
    defaultValue: "",
    ruleOptions:{ required: true, message: "请输入账号", trigger: "blur" },
    placeholder:"1",
    attributes:{
      multiple:true,clearable:true
    },
    radioOptions:
      [
        { text: "开启", label: "0" },
        { text: "关闭", label: "1" },
      ]
  },
];

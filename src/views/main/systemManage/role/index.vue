<template>
  <div class="layout-container">
    <div class="layout-container-table">
      <Table
        ref="table"
        :columns="roleTable"
        v-model:page="page"
        v-model:searchValue="query.userName"
        :loading="loading"
        :showSelection="true"
        :data="tableData"
        @getTableData="getTableData"
        @selection-change="handleSelectionChange"
      >
          <template #dataScope="scope"> 
            {{dataScope[scope.row.dataScope-1]}}
          </template>
          <template #status="scope">
            <span class="statusName">{{
              scope.row.status === "0" ? "启用" : "禁用"
            }}</span>
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              :loading="scope.row.loading"
              @change="handleUpdateStatus(scope.row)"
            ></el-switch>
          </template>
          <template #action="scope">
            <el-button @click="handleEdit(scope.row)">{{
              $t("message.common.update")
            }}</el-button>
            <el-popconfirm
              :title="$t('message.common.delTip')"
              @confirm="handleDel([scope.row])"
            >
              <template #reference>
                <el-button type="danger">{{
                  $t("message.common.del")
                }}</el-button>
              </template>
            </el-popconfirm>
          </template>
      </Table>
      <Layer :layer="layer" @getTableData="getTableData" v-if="layer.show" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, computed } from "vue";
import { Page } from "@/components/table/type";
import { getRoleList,changeStatus} from "@/api/system/role";
import { LayerInterface } from "@/components/layer/index.vue";
import { ElMessage } from "element-plus";
import Table from "@/components/table/index.vue";
import Layer from "./layer.vue";
import { Plus, Delete, Search } from "@element-plus/icons";
import {roleTable} from "./roleTable"
    // 存储搜索用的数据
    const query = reactive({
      userName: "",
    });
    // 弹窗控制器
    const layer: LayerInterface = reactive({
      show: false,
      title: "新增",
      showButton: true,
    });
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 20,
      total: 0,
    });
    const dataScope = [
      "全部数据权限",
      "自定数据权限",
      "部门数据权限",
      "部门及以下数据权限",
      "仅本人数据权限"
    ]
    const loading = ref(true);
    const tableData = ref([]);
    const chooseData = ref([]);
    const handleSelectionChange = (val: []) => {
      chooseData.value = val;
    };
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: Boolean) => {
      loading.value = true;
      if (init) {
        page.index = 1;
      }
      let params = {
        page: page.index,
        pageSize: page.size,
        ...query,
      };
      getRoleList(params)
        .then((res) => {
          let data = res.rows;
          data.forEach((d: any) => {
            d.loading = false;
          });
          tableData.value = data;
          page.total = Number(res.total);
        })
        .catch((error) => {
          tableData.value = [];
          page.index = 1;
          page.total = 0;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    // 删除功能
    const handleDel = (data: object[]) => {
      let params = {
        ids: data
          .map((e: any) => {
            return e.id;
          })
          .join(","),
      };
      // del(params).then((res) => {
      //   ElMessage({
      //     type: "success",
      //     message: "删除成功",
      //   });
      //   getTableData(tableData.value.length === 1 ? true : false);
      // });
    };
    // 新增弹窗功能
    const handleAdd = () => {
      layer.title = "新增数据";
      layer.show = true;
      delete layer.row;
    };
    // 编辑弹窗功能
    const handleEdit = (row: any) => {
      layer.title = "编辑数据";
      layer.row = row;
      layer.show = true;
    };
    // 状态编辑功能
    const handleUpdateStatus = (row: any) => {
      if (!row.roleId) {
        return;
      }
      row.loading = true;
      let params = {
        roleId: row.roleId,
        status: row.status,
      };
      changeStatus(params)
        .then((res) => {
          ElMessage({
            type: "success",
            message: "状态变更成功",
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "状态变更失败",
          });
        })
        .finally(() => {
          row.loading = false;
        });
    };
    getTableData(true);
</script>

<style lang="scss" scoped>
.statusName {
  margin-right: 10px;
}
</style>

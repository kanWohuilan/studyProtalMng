<template>
  <div class="layout-container-form flex space-between">
    <div class="layout-container-form-handle">
      <el-button type="primary" :icon="Plus" @click="handleAdd">{{
        $t("message.common.add")
      }}</el-button>
      <el-popconfirm :title="$t('message.common.delTip')" @confirm="handleDel(chooseData)">
        <template #reference>
          <el-button type="danger" :icon="Delete" :disabled="chooseData.length === 0">{{
            $t("message.common.delBat")
          }}</el-button>
        </template>
      </el-popconfirm>
    </div>
    <div class="layout-container-form-search">
      <el-input
        :model-value="searchValue"
        @input="emit('update:searchValue',$event)"
        :placeholder="$t('message.common.searchTip')"
        clearable
      ></el-input>
      <el-button type="primary" :icon="Search" class="search-btn" @click="emit('getTableData',true)">{{
        $t("message.common.search")
      }}</el-button>
    </div>
  </div>
  <div class="system-table-box">
    <el-table
      v-loading="loading"
      v-bind="$attrs"
      ref="table"
      class="system-table"
      border
      height="100%"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="50" v-if="showSelection" />
      <el-table-column label="序号" width="60" align="center" v-if="showIndex">
        <template #default="scope">
          {{ (page.index - 1) * page.size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column v-bind="column" v-for="column in columns" :key="column.key">
        <template v-if="column.slotName" #default="scope">
          <slot :name="column.slotName" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPage"
      v-model:current-page="page.index"
      class="system-page"
      background
      :layout="pageLayout"
      :total="page.total"
      :page-size="page.size"
      :page-sizes="pageSizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, onActivated, onMounted } from "vue";
import { Plus, Delete, Search } from "@element-plus/icons";
import { Page } from "@/components/table/type";
const props = defineProps({
  data: { type: Array, default: () => [] }, // 数据源
  select: { type: Array, default: () => [] }, // 已选择的数据，与selection结合使用
  showIndex: { type: Boolean, default: false }, // 是否展示index选择，默认否
  showSelection: { type: Boolean, default: false }, // 是否展示选择框，默认否
  showPage: { type: Boolean, default: true }, // 是否展示页级组件，默认是
  searchValue:{ type: String, default: "" },
  loading: { type: Boolean, default: true }, // 是否展示页级组件，默认是
  page: {
    // 分页参数
    type: Object,
    default: () => {
      return { index: 1, size: 20, total: 0 };
    },
  },
  columns: {
    type: Array,
    default: () => {
      return [];
    },
  },
  pageLayout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  }, // 分页需要显示的东西，默认全部
  pageSizes: { type: Array, default: [10, 20, 50, 100] },
});
const chooseData = ref([]);
const emit = defineEmits([
  "getTableData",
  "update:searchValue",
  "selection-change",
  "handleAdd",
  "handleDel",
]);
const table: any = ref(null);
let timer: any = null;
// 分页相关：监听页码切换事件
const handleCurrentChange = (val: Number) => {
  if (timer) {
    props.page.index = 1;
  } else {
    props.page.index = val;
    emit("getTableData");
  }
};
// 分页相关：监听单页显示数量切换事件
const handleSizeChange = (val: Number) => {
  timer = "work";
  setTimeout(() => {
    timer = null;
  }, 100);
  props.page.size = val;
  emit("getTableData", true);
};
const handleAdd = () => {
  emit("handleAdd");
};
const handleDel = (data: object[]) => {
  emit("handleDel", data);
};
// 选择监听器
const handleSelectionChange = (val: []) => {
  emit("selection-change", val);
};
// 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题
onActivated(() => {
  table.value.doLayout();
});
</script>

<style lang="scss" scoped>
.system-table-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  .system-table {
    flex: 1;
    height: 100%;
  }

  .system-page {
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="app-container">
    <!-- <el-button
      type="primary"
      style="margin-bottom: 10px"
      @click="showAdd = true"
      >新增App标识</el-button
    > -->
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column prop="appNumber" label="APP标识"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="danger" style="margin-bottom: 10px" @click="del(row)"
            >删除</el-button
          >
          <el-button type="primary" style="margin-bottom: 10px" @click="toCodePage(row)"
            >激活码详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增APP标识" :visible.sync="showAdd" width="60%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        v-loading="loading"
      >
        <el-form-item label="APP标识" prop="appNumber">
          <el-input v-model="form.appNumber" placeholder="请输入app标识" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getList,del} from '@/api/appIdentifier/sub.js'
export default {
  created() {
    this.getList()
  },
  data() {
    return {
      dataList: [{ appNumber: "app001" }],
      roles: [
        { key: "admin", val: "管理员" },
        { key: "subAdmin", val: "子管理员" },
      ],
      form: {
        appNumber:""
      },
      showAdd: false,
      rules: {
        appNumber: [
          { required: true, trigger: "blur", message: "请输入app标识" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    toCodePage(row){
      localStorage.setItem('oneAppBiaoshi',JSON.stringify(row))
      this.$router.push({
        path:'/activationCode/activationCodeMan',
      })
    },
    async getList() {
      try {
        this.loading = true;
        let res = await getList()
        this.dataList = res
        this.loading = false;
        this.form = {};
      } catch (error) {
        this.loading = false;
      }
    },
    cancel() {
      this.showAdd = false;
    },
    async submitForm() {
      try {
        await this.$refs.form.validate();
        this.loading = true;
        // let res = await add()
        this.$message.sucess('添加成功')
        this.loading = false;
        this.form = {};
      } catch (error) {
        this.loading = false;
      }
    },
    beforeUpdPwa(row){
      this.row = row
      this.showPwa = true
    },
    async del(row) {
      try {
        await this.$confirm(`确定删除这个APP标识吗${row.appNumber}`);
        await del({id:row.id})
        this.$message.success('删除成功')
        this.getList()
      } catch (error) {}
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped></style>

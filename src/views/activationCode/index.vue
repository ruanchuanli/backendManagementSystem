<template>
  <div class="app-container">
    <!-- <el-form>
      <el-form-item label="app标识">

      </el-form-item>
    </el-form> -->
    <div style="margin: 0 0 10px 0">激活码管理-{{ oneAppBiaoshi.appId }}</div>
    <el-button
      type="primary"
      style="margin-bottom: 10px"
      @click="
        showAdd = true;
        form = {};
      "
      >新增激活码</el-button
    >
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column prop="activeCode" label="激活码"> </el-table-column>
      <el-table-column prop="bindNum" label="绑定数量"> </el-table-column>
      <el-table-column prop="block" label="拉黑状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.block == '0' ? 'success' : 'danger'">
            {{ scope.row.block == 0 ? "未拉黑" : "已拉黑" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="480">
        <template slot-scope="{ row }">
          <el-button
            type="danger"
            style="margin-bottom: 10px"
            @click="delOp(row)"
            >删除</el-button
          >
          <el-button type="warning" @click="blackOp(row)">
            {{ row.block == "0" ? "拉黑" : "恢复" }}
          </el-button>
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="bindOp(row)"
            >设置绑定数量</el-button
          >
          <el-button type="primary" @click="appAccountDetail(row)"
            >客户端账号详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增激活码" :visible.sync="showAdd" width="60%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        v-loading="loading"
      >
        <el-form-item label="激活码" prop="activeCode">
          <el-input v-model="form.activeCode" placeholder="请输入激活码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置绑定数量" :visible.sync="showBindNum" width="60%">
      <el-form label-width="100px" v-loading="loading">
        <el-form-item label="激活码" prop="activeCode">
          <el-input readonly v-model="form.activeCode" />
        </el-form-item>
        <el-form-item label="绑定数量" prop="bindNum">
          <el-input-number
            v-model="form.bindNum"
            placeholder="请输入绑定数量"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitBindNum">确 定</el-button>
        <el-button @click="showBindNum = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="'客户端账号详情-' + currentCode.activeCode"
      :visible.sync="showAccount"
      width="60%"
    >
      <el-table :data="detailData" border>
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.imageInfo"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="createTime" label="最近登录时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteClientAccount(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAccount = false">确 定</el-button>
        <el-button @click="showAccount = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  add,
  black,
  del,
  bindNum,
  getAppAccountDetail,
} from "@/api/activationCode/index.js";
export default {
  created() {
    this.oneAppBiaoshi = JSON.parse(localStorage.getItem("oneAppBiaoshi"));
    this.getDataList();
  },
  data() {
    return {
      currentCode: {},
      oneAppBiaoshi: {},
      dataList: [],
      form: {
        bindNum: "",
        activeCode: "",
      },
      showAdd: false,
      rules: {
        activeCode: [
          { required: true, trigger: "blur", message: "请输入激活码" },
        ],
      },
      loading: false,
      showBindNum: false,
      detailData: [],
      showAccount: false,
    };
  },
  methods: {
    async deleteClientAccount(row) {
      // 实现删除客户端账号逻辑
      await this.$confirm("确认删除该客户端账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      await delAppAccount({ id: row.id });
      this.appAccountDetail(this.currentCode);
      this.$message.success("客户端账号删除成功");
    },
    async appAccountDetail(row) {
      this.currentCode = row;
      this.showAccount = true;
      try {
        this.loading = true;
        let res = await getAppAccountDetail({ id: row.id });
        this.detailData = res;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async getDataList() {
      try {
        this.loading = true;
        let res = await getList({id:this.oneAppBiaoshi.id});
        this.dataList = res;
        this.loading = false;
        this.form = {};
      } catch (error) {
        this.loading = false;
      }
    },
    cancel() {
      this.showAdd = false;
    },
    async submitBindNum() {
      try {
        if (!this.form.bindNum) return;
        this.loading = true;
        await bindNum({
          id: this.form.id,
          bindNum: this.form.bindNum,
        });
        this.$message.success("设置成功");
        this.getDataList();
        this.loading = false;
        this.showBindNum = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async submitForm() {
      try {
        await this.$refs.form.validate();
        this.loading = true;
        let res = await add({
          activeCode: this.form.activeCode,
          id: this.oneAppBiaoshi.id,
        });
        this.$message.sucess("添加成功");
        this.getDataList();
        this.loading = false;
        this.form = {};
      } catch (error) {
        this.loading = false;
      }
    },
    bindOp(row) {
      this.row = row;
      this.form = row;
      this.showBindNum = true;
    },
    async delOp(row) {
      try {
        await this.$confirm(`确定删除${row.activeCode}吗`);
        await del({ id: row.id });
        this.$message.success("删除成功");
        this.getDataList();
      } catch (error) {}
    },
    async blackOp(row) {
      try {
        const action = row.block == "0" ? "拉黑" : "恢复";
        await this.$confirm(`确认${action}该${row.activeCode}激活码?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await black({ id: row.id,status:row.block == "0"?1:0 });
        this.$message.success("操作成功");
        this.getDataList();
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

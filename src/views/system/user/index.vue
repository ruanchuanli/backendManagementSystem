<template>
  <div class="app-container">
    <el-button
      type="primary"
      style="margin-bottom: 10px"
      @click="showAdd = true"
      >新增用户</el-button
    >
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column prop="uid" label="用户id"> </el-table-column>
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column prop="role" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role == "0" ? "管理员" : "子管理员" }}
        </template></el-table-column
      >
      <el-table-column prop="appNumber" label="App标识"> </el-table-column>
      <el-table-column label="操作" width="380">
        <template slot-scope="scope">
          <el-button type="primary" @click="beforeUpdPwa(scope.row)"
            >重置密码</el-button
          >
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="showAssignAppDialog(scope.row)"
            >分配APP标识</el-button
          >
          <el-button
            type="danger"
            style="margin-bottom: 10px"
            @click="delUser(scope.row)"
            v-if="scope.$index!=0"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增用户" :visible.sync="showAdd" width="60%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        v-loading="loading"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option
              v-for="item in roles"
              :key="item.key"
              :value="item.key"
              >{{ item.val }}</el-option
            >
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="showPwa" width="60%">
      <el-form label-width="100px" v-loading="loading">
        <el-form-item label="用户名">
          <span>{{ currentUser.userName }}</span>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwa">
          <el-input v-model="newPwa" placeholder="请输入新密码" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEditPwa">确 定</el-button>
        <el-button @click="showPwa = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配APP标识弹窗 -->
    <el-dialog
      title="分配APP标识"
      :visible.sync="assignAppDialogVisible"
      width="30%"
    >
      <el-form :model="assignAppForm" label-width="100px">
        <el-form-item label="用户名">
          <span>{{ currentUser.userName }}</span>
        </el-form-item>
        <el-form-item label="APP标识">
          <el-select v-model="assignAppForm.appNumber" placeholder="请选择APP标识">
            <el-option
              v-for="item in appOptions"
              :key="item.appNumber"
              :label="item.name"
              :value="item.appNumber"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignAppDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAssignApp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUser,
  addUser,
  resetUserPwd,
  delUser,
  assignApp,
} from "@/api/system/user.js";
import { getSelectList } from "@/api/appIdentifier/index.js";
export default {
  created() {
    this.getUserList();
  },
  data() {
    return {
      assignAppDialogVisible: false,
      dataList: [],
      roles: [
        { key: "0", val: "管理员" },
        { key: "1", val: "子管理员" },
      ],
      form: {
        username: "",
        role: "",
        password: "",
      },
      showAdd: false,
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        role: [{ required: true, trigger: "change", message: "请选择角色" }],
      },
      loading: false,
      newPwa: "",
      showPwa: false,
      assignAppForm: { appNumber: "" },
      currentUser: {},
      appOptions: [
        // { value: "app1", label: "应用一" },
        // { value: "app2", label: "应用二" },
        // { value: "app3", label: "应用三" },
        // { value: "app4", label: "应用四" },
      ],
    };
  },
  methods: {
    async getAppOptions() {
      try {
        let res = await getSelectList();
        this.appOptions = res;
      } catch (error) {}
    },
    async showAssignAppDialog(user) {
      try {
        this.currentUser = user;
        this.getAppOptions();
        this.assignAppForm.appNumber = user.appNumber || "";
        this.assignAppDialogVisible = true;
      } catch (error) {}
    },
    async submitAssignApp() {
      // 实现提交分配APP标识的逻辑
      try {
        if(!this.assignAppForm.appNumber) return
        await assignApp({
          uid: this.currentUser.uid,
          appNumber: this.assignAppForm.appNumber,
        });
        this.$message.success("APP标识分配成功");
        this.getUserList();
        this.assignAppDialogVisible = false;
      } catch (error) {}
    },
    async getUserList() {
      try {
        this.loading = true;
        let res = await listUser();
        this.dataList = res;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    cancel() {
      this.showAdd = false;
    },
    async submitEditPwa() {
      try {
        if (!this.newPwa) return;
        this.loading = true;
        await resetUserPwd({ uid:this.currentUser.uid,password: this.newPwa });
        this.$message.success("修改成功");
        this.loading = false;
        this.showPwa = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async submitForm() {
      try {
        await this.$refs.form.validate();
        this.loading = true;
        let res = await addUser(this.form);
        this.getUserList()
        this.showAdd = false
        this.$message.sucess("添加成功");
        this.loading = false;
        this.form = {};
      } catch (error) {
        this.loading = false;
      }
    },
    beforeUpdPwa(row) {
      this.currentUser = row;
      this.showPwa = true;
    },
    async delUser(row) {
      try {
        await this.$confirm(`确定删除这个用户吗${row.userName}`);
        await delUser({ uid: row.uid });
        this.$message.success("删除成功");
        this.getUserList();
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

<template>
  <el-dialog title="新增员工" :visible="showDialog" @click="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input style="width: 50%" placeholder="请输入姓名" v-model="formData.username" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input style="width: 50%" placeholder="请输入手机号" v-model="formData.mobile" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker style="width: 50%" placeholder="请选择入职时间" v-model="formData.timeOfEntry" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select style="width: 50%" placeholder="请选择" v-model="formData.formOfEmployment">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input style="width: 50%" placeholder="请输入工号" v-model="formData.workNumber" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input style="width: 50%" placeholder="请选择部门" v-model="formData.departmentName" @focus="getDepartments" />

        <el-tree v-if="showTree" v-loading="loading" :data="treeData" default-expand-all="" :props="{ label: 'name' }" @node-click="selectNode"></el-tree>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker style="width: 50%" placeholder="请选择转正时间" v-model="formData.correctionTime" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
// 引入获取部门详情的接口
import { getDepartments } from '@/api/departments'
// 引入递归函数，用于解决树形结构的问题
import { tranListToTreeData } from '@/utils/index'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      treeData: [],
      showTree: false, // 控制树形结构的显示和隐藏
      loading: false,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()

      this.treeData = tranListToTreeData(depts, '')
      console.log(this.treeData)
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOK() {
      try {
        this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        this.$parent.getEmployeeList()
        this.$parent.showDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 移除表单校验规则
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style></style>

<template>
  <div>
    <el-form :inline="true" :model="courseQuery" class="demo-form-inline form_margin_top">
      <el-form-item label="课程名称">
        <el-input v-model="courseQuery.title" size="small" style="width: 100px" maxlength="10" placeholder="课程名称" />
      </el-form-item>
      <el-form-item label="课程状态" class="input_size_form">
        <el-select v-model="courseQuery.status" placeholder="课程状态" size="small" style="width: 100px">
          <el-option label="已发布" value="Normal" />
          <el-option label="未发布" value="Draft" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" size="small">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="结束时间" size="small">
        <el-date-picker
          v-model="courseQuery.end"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          style="width: 150px"
        />
      </el-form-item>
      <el-button type="danger" size="small" @click="resetForm">重置</el-button>
      <el-button type="primary" size="small" @click="getCourseList">查询</el-button>
    </el-form>
    <el-table
      :data="courseList"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="课程名称"
        width="200"
        align="center"
      />
      <el-table-column
        prop="buyCount"
        label="销售数量"
        align="center"
        :show-overflow-tooltip="true"
      />

      <el-table-column
        prop="lessonNum"
        label="课时数"
        align="center"
        width="100"
      />
      <el-table-column
        label="课程状态"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.status === 'Normal'? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="cover"
        label="课程封面"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.cover" />
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="创建时间"
        align="center"
        width="200"
      />
      <el-table-column
        prop="viewCount"
        label="浏览数量"
        align="center"
        width="100"
      />
      <el-table-column
        prop=""
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑课程基本信息" placement="top">
            <router-link :to="'/teacher/update/' + scope.row.id">
              <el-button type="primary" icon="el-icon-edit" size="small" />
            </router-link>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑课程大纲" placement="top">
            <router-link :to="'/teacher/update/' + scope.row.id">
              <el-button type="primary" icon="el-icon-edit" size="small" />
            </router-link>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <!-- <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteTeacherById(scope.row.id)" slot="reference"></el-button> -->
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteTeacherById(scope.row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>

import course from '@/api/edu/course'

export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 30, 50],
      courseQuery: {},
      courseList: null
    }
  },

  // 页面渲染之前
  created() {
    this.getCourseList()
  },

  methods: {
    getCourseList() {
      course.getCourseListByPage(this.page, this.pageSize, this.courseQuery)
        .then(res => {
          console.log(res)
          this.courseList = res.data.courseList
          this.total = res.data.total
          console.log(this.teacherList)
          console.log(this.total)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 改变页面条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getCourseList()
    },
    // 改变当前页
    handleCurrentChange(page) {
      this.page = page
      this.getCourseList()
    },
    // 清除查询条件
    resetForm() {
      // 清除查询条件
      this.courseQuery = {}
      // 查询所有
      this.getCourseList()
    },
    // 删除讲师
    deleteTeacherById(id) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert(id)
        teacher.deleteTeacherById(id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTeacherList()
          })
      })
    }

  }

}
</script>
<style lang="css">
  .el-tooltip__popper{font-size: 14px; max-width:50% } /*设置显示隐藏部分内容，按50%显示*/
  .el-pagination {text-align: center} /*分页组件居中*/
  .form_margin_top {
    width: 100%;
    margin: 20px 2% -19px;
  };
  /* .input_size_form{width: 120px} */
</style>

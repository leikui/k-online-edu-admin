<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ coursePublish.subjectLevelOne }}  |  {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>
    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>
<script>
import courseApi from '@/api/edu/course'
import video from '@/api/edu/video'
export default {
  data() {
    return {
      coursePublish: {},
      courseId: '',
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },
  created() {
    if (this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCoursePublish()
    }
  },
  methods: {
    // 查询最终发布信息
    getCoursePublish() {
      courseApi.getPublishCourse(this.courseId)
        .then(res => {
          this.coursePublish = res.data.coursePublish
        })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/1' })
    },
    // 最终发布
    publish() {
      console.log('publish')
      this.$confirm('确认发布课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        courseApi.publishCourse(this.courseId)
          .then(res => {
            this.$message({
              type: 'success',
              message: '修改小节成功！'
            })
            // 跳转到课程列表
            this.$router.push({ path: '/course/list' })
          })
      })
    }
  }
}
</script>
<style scoped>
  .ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
  }
  .ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
  }
  .ccInfo .main {
    margin-left: 520px;
  }
  .ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
  }
  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }
  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
  }
  .ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
  }
</style>

<template>
  <div>
    <el-form ref="teacher" :model="teacher" :rules="rules" label-width="100px" style="margin-top:20px;" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="teacher.name" style="width: 400px" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="讲师级别">
        <el-select v-model="teacher.level" placeholder="请选择讲师级别" style="width: 400px">
          <el-option label="高级讲师" :value="0" />
          <el-option label="首席讲师" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师简介" prop="intro">
        <el-input v-model="teacher.intro" type="textarea" style="width: 400px" />
      </el-form-item>
      <el-form-item label="讲师资历" prop="career">
        <el-input v-model="teacher.career" type="textarea" style="width: 400px" />
      </el-form-item>
      <el-form-item label="讲师排序" prop="sort">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" :max="10" style="width: 400px" />
      </el-form-item>
      <el-form-item label="头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!-- v-show：是否显示上传组件
              :key：类似于id，如果一个页面多个图片上传控件，可以做区分
              :url：后台上传的url地址
              @close：关闭上传组件
              @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API+'/edu/oss/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="saveOrUpdate('teacher')">保存</el-button>
        <el-button @click="resetForm('teacher')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherJs from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  // 声明组件
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        sort: 0,
        level: 1
      },
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择讲师级别', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ],
        career: [
          { required: true, message: '请填写资历', trigger: 'blur' }
        ]
      },
      // 保存按钮是否禁用
      saveBtnDisabled: false,
      // 上传弹框
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.VUE_APP_BASE_API

    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getTeacherById(id)
    }
  },
  methods: {
    submitForm(teacher) {
      this.$refs[teacher].validate((valid) => {
        if (valid) {
          teacherJs.addTeacher(this.teacher)
            .then(res => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              // l路由跳转到列表界面
              this.$router.push({ path: '/teacher/list' })
            })
          console.log(this.teacher)
        } else {
          return false
        }
      })
    },
    // 重置
    resetForm(teacher) {
      this.$refs[teacher].resetFields()
    },

    // 根据讲师id查询信息 回显
    getTeacherById(id) {
      teacherJs.getTeacherById(id)
        .then(res => {
          this.teacher = res.data.teacher
        })
    },

    // 判断是添加还是修改
    saveOrUpdate(teacher) {
      if (this.teacher.id) {
        this.updateTeacher(teacher)
      } else {
        this.submitForm(teacher)
      }
    },
    // 修改讲师信息
    updateTeacher(teacher) {
      this.$refs[teacher].validate((valid) => {
        if (valid) {
          teacherJs.updateTeacher(this.teacher)
            .then(res => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              // l路由跳转到列表界面
              this.$router.push({ path: '/teacher/list' })
            })
          console.log(this.teacher)
        } else {
          return false
        }
      })
    },

    /**
       * 关闭上传弹框
       */
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },

    /**
       * 上传成功回调
       */
    cropSuccess(data) {
      this.teacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
      this.imagecropperShow = false
    }
  }
}
</script>

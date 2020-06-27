<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息" icon="el-icon-edit"></el-step>
        <el-step title="创建课程大纲" icon="el-icon-document"></el-step>
        <el-step title="提交审核" icon="el-icon-circle-check"></el-step>
    </el-steps>

<el-form label-width="120px" :rules="rules" :model="courseInfo"  ref="courseRef">
    <el-form-item label="课程标题" prop="title">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
    </el-form-item>
    <!-- 所属分类 TODO -->
    <!-- 一级分类 -->
    <!-- <el-form-item label="课程类别" prop="subjectParentId">
        <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择一级分类">
            <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
    </el-form-item> -->
    <el-form-item label="课程类别" prop="selectedOptions">
        <div class="block">
        <el-cascader
            placeholder="试试搜索：后端"
            :props="courseInfo.defaultParams"
            :options="courseInfo.options"
            v-model="courseInfo.selectedOptions"
            :clearable="true"
            ref="subjectNode"
            filterable></el-cascader>
        </div>
    </el-form-item>
    <!-- 课程讲师 TODO -->
    <el-form-item label="课程讲师" prop="teacherId">
        <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择讲师">
            <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
    </el-form-item>
    <el-form-item label="总课时" prop="lessonNum">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
    </el-form-item>
    <!-- 课程简介 TODO -->
    <el-form-item label="课程简介" prop="description">
    <el-input v-model="courseInfo.description" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
    </el-form-item>
    <!-- 课程封面 TODO -->
    <el-form-item label="课程封面">
        <el-upload
            class="avatar-uploader"
            :action = "BASE_API + '/edu/oss/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>

    <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
    </el-form-item>
    <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('courseRef')">保存并下一步</el-button>
    </el-form-item>
</el-form>
  </div>
</template>
<script>
import courseApi from '@/api/edu/course'
import subjectApi from '@/api/edu/subject'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        title: '',
        subjectId: '',//二级分类
        subjectParentId: '',//一级分类
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0,
        //课程分类
        options:[],//可选项数据源
        selectedOptions: [],
        //参数名称
        defaultParams: {
            label: 'title',
            value: 'id',
            children: 'children'
        }
      },
      //提交规则
      rules: {
          title: [
            { required: true, message: '请填写课程标题', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ],
          teacherId: [
            { required: true, message: '请选择课程讲师', trigger: 'change' }
            
          ],
          description: [
            { required: true, message: '请填写课程简介', trigger: 'blur' }
          ],
          lessonNum: [
            { required: true, message: '请输入总课时', trigger: 'blur' },
            { pattern: /^\+?[1-9]\d*$/, message: '总课时必须大于0课时', trigger: 'blur' }
          ],
          subjectParentId: [
            { required: true, message: '请选择课程分类', trigger: 'change' }
          ],
          selectedOptions: [{
          type: 'array',
          required: true,
          message: '请选择部门',
          trigger: 'change'
        }]
          
        },
      //讲师列表
      teacherList:[] ,
      BASE_API: process.env.VUE_APP_BASE_API,
      //上传弹框
        imagecropperShow: false,
        imagecropperKey: 0,
      
    }
  },
  created() {
    console.log('info created')
    //查询讲师列表
    this.getTeacherList()
    //查询课程分类
    this.getSubjectList()
  },
  methods: {
    saveOrUpdate(courseInfo) {
        const checkedNodes = this.$refs['subjectNode'].getCheckedNodes()
        console.log(checkedNodes) // 获取当前点击的节点
        console.log(checkedNodes[0].data.value) // 获取当前点击的节点的label
        console.log(checkedNodes[0].value) // 获取由 label 组成的数组
        console.log(checkedNodes[0].parent.value) // 获取由 label 组成的数组

        this.$refs[courseInfo].validate((valid) => {
          if (valid) {
              console.log('next')
            courseApi.addCourseInfo(this.courseInfo)
            .then(res => {
                this.$message({
                    type: 'success',
                    message: "添加课程信息成功！"
                })
                 this.$router.push({ path: '/course/chapter/' + res.data.courseId })
            })
            console.log(this.teacher)
          } else {
            return false;
          }
        });
     
    },

    //查询所有讲师
    getTeacherList(){
        courseApi.getTeacherAll()
            .then(res => {
                this.teacherList = res.data.teacherList
            })
    },
    //查询课程分类
    getSubjectList(){
        subjectApi.getSubjectTree()
            .then(res => {
                // 调用递归方法，去除级联数据后将数据赋值给级联选择器
                this.courseInfo.options = this.getTreeData(res.data.tree);
            })
    },
    //在最后的效果图中出现了 空级联 的bug，这是由于从后台传递到前台的json中，最底层的 子项中 children 为 空数组造成的
    getTreeData(data){
        // 循环遍历json数据
        for(var i=0;i<data.length;i++){
            
            if(data[i].children.length<1){
                // children若为空数组，则将children设为undefined
                data[i].children=undefined;
            }else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].children);
            }
        }
        return data;
    },
    handleAvatarSuccess(res, file) {
        this.courseInfo.cover = res.data.url;
      },
    beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isPNG = file.type === 'image/gif';
        //限制上传类型
        let types = ['image/jpeg', 'image/jpg', 'image/png' , 'image/gif'];
        let fileType = types.includes(file.type);
        console.log(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!fileType ) {
          this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return fileType && isLt2M;
    }
    
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

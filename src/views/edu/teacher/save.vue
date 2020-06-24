<template>
    <div>
        <el-form :model="teacher" :rules="rules" ref="teacher" label-width="100px" style="margin-top:20px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="teacher.name">
            <el-input v-model="teacher.name" style="width: 400px" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="讲师级别">
            <el-select v-model="teacher.level" placeholder="请选择讲师级别" style="width: 400px" >
            <el-option label="高级讲师" value="1"></el-option>
            <el-option label="首席讲师" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="讲师简介" prop="teacher.intro">
            <el-input type="textarea" v-model="teacher.intro" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="讲师资历" prop="teacher.career">
            <el-input type="textarea" v-model="teacher.career" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="讲师排序" prop="teacher.sort">
            <el-input-number v-model="teacher.sort" controls-position="right" :min="0" :max="10" style="width: 400px"></el-input-number>
        </el-form-item>
        <el-form-item label="头像" prop="teacher.avatar">
            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"style="width:400px">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="saveBtnDisabled" @click="submitForm('teacher')">立即添加</el-button>
            <el-button @click="resetForm('teacher')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import teacherJs from '@/api/edu/teacher'

  export default {
    data() {
      return {
        teacher: {
            sort: 0
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
        saveBtnDisabled: false
      };
    },
    created(){
        if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id;
            this.getTeacherById(id);
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
                    });
                    //l路由跳转到列表界面
                    this.$router.push({path:'/teacher/list'});

                })
            console.log(this.teacher)
          } else {
            return false;
          }
        });
      },
      resetForm(teacher) {
        this.$refs[formName].resetFields();
      },

      //根据讲师id查询信息 回显
      getTeacherById(id){
          teacherJs.getTeacherById(id)
            .then( res => {
                this.teacher = res.data.teacher;
            })
      }
    }
  }
</script>
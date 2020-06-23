<template>
    <div>
        <h1>讲师列表</h1>
    </div>
</template>

<script>

import teacher from '@/api/edu/teacher'

export default {
    data(){
        return {
            total: 0,
            page: 1,
            limit: 10,
            teacherQuery: {},
            teacherList: null
        }
    },

    //页面渲染之前
    created(){
        this.getTeacherList();
    },

    methods: {
        getTeacherList(){
            teacher.getTeacherListByPage(this.page,this.limit,this.teacherQuery)
                .then(res => {
                    console.log(res);
                    this.teacherList = res.data.teachers;
                    console.log(this.teacherList)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    
}
</script>
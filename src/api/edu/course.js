import request from '@/utils/request'

export default {

    /**
     * 添加课程信息
     */
    addCourseInfo(courseInfo){
        return request({
            url: '/eduService/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

     /**
     * 查询所有讲师列表
     */
    getTeacherAll(){
        return request({
            url: '/eduService/teacher/findAll',
            method: 'get'
        })
    }
    
}
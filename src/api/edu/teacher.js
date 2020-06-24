import request from '@/utils/request'

export default {

    /**
     * 分页查询讲师列表
     * @param {*} current 当前页
     * @param {*} limit  记录数
     * @param {*} teacherQuery 条件对象
     */
    getTeacherListByPage(current,pageSize,teacherQuery){
        return request({
            url: '/eduService/teacher/pageTeacherCondition/'+current+'/' + pageSize,
            method: 'post',
            data: teacherQuery
        })
    },

    /**
     * 删除讲师 根据 id
     * @param {teacher id} id 
     */
    deleteTeacherById(id){
        return request({
            url: '/eduService/teacher/' + id,
            method: 'delete'
        })
    },

    /**
     * 添加讲师
     * @param {讲师信息} teacher 
     */
    addTeacher(teacher){
        return request({
            url: '/eduService/teacher/addTeacher',
            method: 'post',
            data: teacher
        })
    },
    /**
     * 根据id查询讲师信息
     * @param {讲师信息} teacher 
     */
    getTeacherById(id){
        return request({
            url: '/eduService/teacher/queryTeacher/' + id,
            method: 'get'
        })
    },
    /**
     * 根据id修改讲师信息
     * @param {*} id 
     */
    updateTeacher(teacher){
        return request({
            url: '/eduService/teacher/updateTeacher',
            method: 'post',
            data: teacher
        })
    }
    
}
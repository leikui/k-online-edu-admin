import request from '@/utils/request'

export default {

    /**
     * 分页查询讲师列表
     * @param {*} current 当前页
     * @param {*} limit  记录数
     * @param {*} teacherQuery 条件对象
     */
    getTeacherListByPage(current,limit,teacherQuery){
        return request({
            url: '/eduService/teacher/pageTeacherCondition/'+current+'/' + limit,
            method: 'post',
            data: teacherQuery
        })
    }
}
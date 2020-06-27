import request from '@/utils/request'

export default {

    /**
     * 查询分类菜单
     */
    getSubjectTree(){
        return request({
            url: '/eduService/subject/getSubject',
            method: 'get'
        })
    }
    
}
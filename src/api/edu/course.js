import request from '@/utils/request'

export default {

  /**
     * 添加课程信息
     */
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduService/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },

  /**
     * 查询所有讲师列表
     */
  getTeacherAll() {
    return request({
      url: '/eduService/teacher/findAll',
      method: 'get'
    })
  },

  /**
   * 根据课程
   */
  getCourseInfoById(id) {
    return request({
      url: '/eduService/course/getCourseInfo/' + id,
      method: 'get'
    })
  },

  /**
   * 查询所有讲师列表
   */
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduService/course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },

  /**
   * 获取课程确认信息
   * @param courseId
   * @returns {AxiosPromise}
   */
  getPublishCourse(courseId){
    return request({
      url: '/eduService/course/getPublishCourseInfo/' + courseId,
      method: 'get'
    })
  },

  /**
   * 课程最终发布
   * @param courseId
   */
  publishCourse(courseId) {
    return request({
      url: '/eduService/course/publishCourse/' + courseId,
      method: 'post'
    })

  },
  /**
   * 查询所有课程列表
   */
  getCourseList(){
    return request({
      url: '/eduService/course',
      method: 'get'
    })
  }

}

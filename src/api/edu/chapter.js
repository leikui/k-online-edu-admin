import request from '@/utils/request'

export default {

  /**
   *g 根据 课程 id 查询 所有章节 及 小节信息
   */
  getAllChapterAndVideo(courseId) {
    return request({
      url: '/eduService/chapter/getChapterVideo/' + courseId,
      method: 'get'
    })
  }

}

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
  },
  /**
   * 添加章节
   */
  addChapterInfo(chapter) {
    return request({
      url: '/eduService/chapter/addChapter',
      method: 'post',
      data: chapter
    })
  },
  /**
   * 根据id查询章节
   */
  getChapterInfoById(chapterId) {
    return request({
      url: '/eduService/chapter/getChapterInfo/' + chapterId,
      method: 'get'
    })
  },
  /**
   * 修改章节
   */
  updateChapter(chapter) {
    return request({
      url: '/eduService/chapter/updateChapter',
      method: 'post',
      data: chapter
    })
  },
  /**
   * 根据id修改章节
   */
  deleteChapter(chapterId) {
    return request({
      url: '/eduService/chapter/' + chapterId,
      method: 'delete'
    })
  }

}

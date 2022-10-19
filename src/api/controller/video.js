const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  async getVideoListAction() {
    // 首页 / 关注 / 作品 / 喜欢
    const type = this.post('type')
    // let user_id = await this.getUserId()
    const user_id_token = await this.getUserId()
    const user_id_post = this.post('userId')
    let videoList

    if (type === 'index') {
      let historyVideoIdList
      if (user_id_token) {
        historyVideoIdList = await this.model('history').getHistoryVideoIdList(user_id_token)
      } else {
        historyVideoIdList = this.post('historyVideoIdList')
      }
      videoList = await this.model('video').getIndexVideoList(historyVideoIdList)
    } else if (type === 'zan') {
      videoList = await this.model('history').getZanList(user_id_post)
    } else if (type === 'work') {
      videoList = await this.model('video').getWorkList(user_id_post)
    }

    switch (type) {
      case 'topic':
        const topicId = this.post('topicId')
        videoList = await this.model('topic_video').getVideoListByTopic(topicId)
        break
    }

    for (let video of videoList.data) {
      const videoId = video.id

      video.collected = 0
      video.follow = user_id_token ? await this.model('follow').checkIsFollow(user_id_token, video.user_id) : 0
      const { baseUri } = this.config()
      video.filename = `${baseUri}videos/${video.filename}.mp4`
      video.cover = `${baseUri}covers/${video.cover}.png`
      video.avatar = `${baseUri}avatars/${video.avatar}.jpeg`
      video.poster = `${baseUri}posters/${video.poster}.jpg`
      video.commentCount = await this.model('comment').getCommentCount(videoId)

      // 点赞状态
      if (user_id_token) {
        video.zaned = await this.model('history').getZanStat(videoId, user_id_token)
      } else {
        video.zaned = 0
      }

      // 点赞数量
      video.zanCount = await this.model('history').getZanCount(videoId)

      // 标签
      video.topics = await this.model('topic_video').getTopicInfo(videoId)

      // at
      video.ats = await this.model('at_video').getAtInfo(videoId)
    }

    return this.success(videoList, '获取视频列表成功')
  }

  testAction() {
    console.log('test!')
  }
}

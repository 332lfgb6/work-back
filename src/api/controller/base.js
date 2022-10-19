module.exports = class extends think.Controller {
  async __before() {
    // 公开的接口可以直接调用
    const pubActionList = [
      'getIndexData2',
      'delHistory2',
      'getCommentList',
      'login',
      'register',
      'getFirst',
      'getUserList',
      'getMusicList',
      'uploadImg',
      'getUserinfo',
      'getVideoList',
      'open',
      'add',
      'del',
      'getTopicList',
      'getTopicInfo'
    ]
    if (pubActionList.includes(this.ctx.action)) {
      return
    } else {
      // 未公开的接口，没有提供token时，提示请登录
      const token = this.header('token')
      if (!token) {
        return this.fail(1, '请先登录')
      } else {
        // 检查提供的token是否有效，可能是前端乱传的。
        if (await this.model('login').checkTokenIsValid(token)) {
          return
        } else {
          return this.fail(2, 'token无效')
        }
      }
    }
  }
  async getUserId() {
    const login = await this.model('login')
      .where({ token: this.header('token') })
      .find()
    return login.user_id
  }
  getuploadFileBaseUri() {
    const { host, port } = this.config()
    return `http://${host}:${port}/upload/`
  }
  async formatVideoList(videoList) {
    const user_id = await this.getUserId()
    for (let video of videoList) {
      const videoId = video.id

      video.collected = 0
      video.follow = user_id ? await this.model('follow').checkIsFollow(user_id, video.user_id) : 0
      const { baseUri } = this.config()
      video.filename = `${baseUri}videos/${video.filename}.mp4`
      video.cover = `${baseUri}covers/${video.cover}.png`
      video.avatar = `${baseUri}avatars/${video.avatar}.jpeg`
      video.poster = `${baseUri}posters/${video.poster}.png`
      video.commentCount = await this.model('comment').getCommentCount(videoId)
    }
    return videoList
  }
}

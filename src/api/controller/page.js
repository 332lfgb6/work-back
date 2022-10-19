const Base = require('./base.js')

module.exports = class extends Base {
  async getIndexData2Action() {
    // console.log(',,,', this.get())
    const user_id = await this.getUserId()
    let historyVideoIdList
    if (user_id) {
      historyVideoIdList = await this.model('history').getHistoryVideoIdList(user_id)
    } else {
      historyVideoIdList = this.get('historyVideoIdList')
      // console.log('----', historyVideoIdList)
    }
    let videoList = await this.model('video').getIndexVideoList(historyVideoIdList)

    videoList = await this.formatVideoList(videoList)

    return this.success(videoList, '获取首页数据成功')
  }

  async getMyDataAction() {
    // 用户信息给前端
    let userinfo = await this.model('user').getUserinfo(await this.getUserId())

    // 公开的作品给前端
    let publicWorks = await this.model('video')
      .where({ user_id: await this.getUserId() })
      .select()
    publicWorks = publicWorks.map(v => {
      const { baseUri } = this.config()
      v.filename = `${baseUri}videos/${v.filename}.mp4`
      v.cover = `${baseUri}covers/${v.cover}.png`
      return v
    })

    return this.success(
      {
        userinfo,
        publicWorks
      },
      '获取我的页数据成功'
    )
  }
}

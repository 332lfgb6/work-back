const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  // 获取收藏过的视频列表
  async getCollectedVideoListAction() {
    let collectedVideoList = await this.model('history')
      .where({ 'a.user_id': await this.getUserId(), collected: 1 })
      .alias('a')
      .join({
        table: 'video',
        join: 'left',
        as: 'b',
        on: ['a.video_id', 'b.id']
      })
      .field('a.id,b.cover')
      .select()
    collectedVideoList = collectedVideoList.map(v => {
      v.cover = `http://${this.config('host')}:${this.config('port')}/upload/covers/${v.cover}.png`
      return v
    })
    return this.success(collectedVideoList, '获取收藏过的视频列表成功')
  }

  async collectVideoAction() {
    await this.model('history')
      .where({
        user_id: await this.getUserId(),
        video_id: this.post('videoId')
      })
      .update({ collected: this.post('collected') })
    return this.success('', '收藏 / 取消收藏成功')
  }

  // 获取赞过的视频列表
  async getZanedVideoListAction() {
    let zanedVideoList = await this.model('history')
      .where({ 'a.user_id': await this.getUserId(), zaned: 1 })
      .alias('a')
      .join({
        table: 'video',
        join: 'left',
        as: 'b',
        on: ['a.video_id', 'b.id']
      })
      .field('a.id,b.cover')
      .select()
    zanedVideoList = zanedVideoList.map(v => {
      v.cover = `http://${this.config('host')}:${this.config('port')}/upload/covers/${v.cover}.png`
      return v
    })
    return this.success(zanedVideoList, '获取赞过的视频列表成功')
  }

  async zanVideoAction() {
    const user_id = await this.getUserId()
    const video_id = this.post('videoId')
    const zaned = this.post('zaned')
    await this.model('history')
      .where({
        user_id,
        video_id
      })
      .update({ zaned })
    const historyId = await this.model('history').where({ user_id, video_id }).getField('id', true)
    await this.model('activity')[zaned ? 'addActivity' : 'delActivity']('history', historyId, user_id)
    return this.success('', '点赞 / 取消点赞成功')
  }

  async getHistoryListAction() {
    let historyList = await this.model('history')
      .where({ 'a.user_id': await this.getUserId() })
      .alias('a')
      .join({
        table: 'video',
        join: 'left',
        as: 'b',
        on: ['a.video_id', 'b.id']
      })
      .field('b.id,b.cover')
      .select()
    historyList = historyList.map(v => {
      v.cover = `http://${this.config('host')}:${this.config('port')}/upload/covers/${v.cover}.png`
      return v
    })
    return this.success({ historyList }, '获取观看历史列表成功')
  }

  async addHistoryAction() {
    const user_id = await this.getUserId()
    const videoIdList = this.post('videoIdList')
    const historyModel = this.model('history')

    // 查看观看历史表中是否已经存在，如果不存在，则新增一条记录。
    for (const video_id of videoIdList) {
      const history = await historyModel.where({ user_id, video_id }).find()
      think.isEmpty(history) && (await historyModel.add({ user_id, video_id }))
    }
    return this.success('', '添加观看历史成功')
  }

  async delHistory2Action() {
    const user_id = await this.getUserId()
    if (user_id) {
      await this.model('history').delHistory(user_id)
    }

    // let videoList = await this.model('video').getIndexVideoList('')
    //
    // videoList = await this.formatVideoList(videoList)

    return this.success('', '重置数据成功')
  }
}

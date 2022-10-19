module.exports = class extends think.Model {
  // 获取看过的视频ID列表
  async getHistoryVideoIdList(user_id) {
    const historyVideoIdList = await this.where({ user_id }).field('video_id').select()
    return historyVideoIdList.map(v => v.video_id)
  }
  // 清空观看历史
  async delHistory(user_id) {
    await this.where({ user_id }).delete()
  }

  // 获取点赞状态
  async getZanStat(video_id, user_id) {
    return (await this.where({ video_id, user_id }).getField('zaned', true)) || 0
  }

  // 获取点赞数量
  async getZanCount(video_id) {
    return await this.where({ video_id, zaned: 1 }).count()
  }

  // 获取你点赞过的视频列表
  async getZanList(user_id) {
    return await this.where({ 'a.user_id': user_id, zaned: 1 })
      .alias('a')
      .join({
        table: 'video',
        join: 'left',
        as: 'b',
        on: ['video_id', 'b.id']
      })
      .join({
        user: {
          join: 'left',
          as: 'c',
          on: ['b.user_id', 'c.id']
        },
        music: {
          join: 'left',
          as: 'd',
          on: ['b.music_id', 'd.id']
        }
      })
      .field('b.id,b.title,b.filename,b.cover,b.user_id,c.username,b.music_id,d.poster,c.avatar')
      .page(1, 15)
      .countSelect()
  }
}

const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  async getActivityAction() {
    const activityList = await this.model('activity').getActivity(await this.getUserId())
    for (let activity of activityList.data) {
      const id = activity.content_id
      const { baseUri } = this.config()
      let xxx

      switch (activity.table_name) {
        // 给视频点赞
        case 'history':
          const history = await this.model('history')
            .where({ 'a.id': id })
            .alias('a')
            .join({
              user: {
                join: 'left',
                as: 'b',
                on: ['user_id', 'b.id']
              },
              video: {
                join: 'left',
                as: 'c',
                on: ['video_id', 'c.id']
              }
            })
            .field('b.avatar,b.username,c.id as video_id,c.cover')
            .find()
          activity.username = xxx.username
          activity.cover = `${baseUri}covers/${xxx.cover}.png`
          activity.avatar = `${baseUri}avatars/${xxx.avatar}.jpeg`
          break
        case 'comment':
          xxx = await this.model('comment')
            .where({ 'a.id': id })
            .alias('a')
            .join({
              user: {
                join: 'left',
                as: 'b',
                on: ['user_id', 'b.id']
              },
              video: {
                join: 'left',
                as: 'c',
                on: ['video_id', 'c.id']
              }
            })
            .field('parent_id,b.avatar,b.username,c.id as video_id,c.cover')
            .find()
          activity.parent_id = xxx.parent_id
          activity.username = xxx.username
          activity.cover = `${baseUri}covers/${xxx.cover}.png`
          activity.avatar = `${baseUri}avatars/${xxx.avatar}.jpeg`
          break
        case 'zan_comment':
          xxx = await this.model('zan_comment')
            .where({ 'a.id': id })
            .alias('a')
            .join({
              table: 'user',
              join: 'left',
              as: 'b',
              on: ['user_id', 'b.id']
            })
            .field('user_id,b.avatar,b.username')
            .find()
          activity.user_id = xxx.user_id
          activity.username = xxx.username
          activity.avatar = `${baseUri}avatars/${xxx.avatar}.jpeg`
          break
        case 'follow':
          xxx = await this.model('follow')
            .where({ 'a.id': id })
            .alias('a')
            .join({ table: 'user', join: 'left', as: 'b', on: ['uuser_id', 'b.id'] })
            .field('uuser_id as user_id,b.username,b.avatar')
            .find()
          activity.user_id = xxx.user_id
          activity.username = xxx.username
          activity.avatar = `${baseUri}avatars/${xxx.avatar}.jpeg`
          break
      }
      delete activity.content_id
      delete activity.user_id
    }
    return this.success(activityList, '获取活动列表成功')
  }
}

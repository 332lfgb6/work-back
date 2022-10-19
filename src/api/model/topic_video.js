module.exports = class extends think.Model {
  async getVideoNum(topic_id) {
    return await this.where({ topic_id }).count()
  }

  async getTopicInfo(video_id) {
    return await this.where({ video_id })
      .alias('a')
      .join({ table: 'topic', join: 'left', as: 'b', on: ['topic_id', 'b.id'] })
      .field('b.id,b.name')
      .select()
  }

  async getVideoListByTopic(topic_id) {
    return await this.where({ topic_id })
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
      .page(1, 1000)
      .countSelect()
  }
}

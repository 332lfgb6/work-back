module.exports = class extends think.Model {
  async getIndexVideoList(historyVideoIdList) {
    return await this.where({ 'a.id': ['NOTIN', historyVideoIdList.length ? historyVideoIdList : ''], show_index: 1 })
      .alias('a')
      .join({
        user: {
          join: 'left',
          as: 'b',
          on: ['user_id', 'b.id']
        },
        music: {
          join: 'left',
          as: 'c',
          on: ['music_id', 'c.id']
        }
      })
      .order({ pub_time: 'asc' })
      .field('id,title,filename,cover,user_id,b.username,music_id,c.poster,b.avatar')
      .page(1, 15)
      .countSelect()
  }

  async getWorkList(user_id) {
    return await this.where({ user_id })
      .alias('a')
      .join({
        user: {
          join: 'left',
          as: 'b',
          on: ['user_id', 'b.id']
        },
        music: {
          join: 'left',
          as: 'c',
          on: ['music_id', 'c.id']
        }
      })
      .field('id,title,filename,cover,user_id,b.username,music_id,c.poster,b.avatar')
      .page(1, 15)
      .countSelect()
  }
}

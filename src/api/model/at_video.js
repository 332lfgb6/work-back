module.exports = class extends think.Model {
  async getAtInfo(video_id) {
    return await this.where({ video_id })
      .alias('a')
      .join({ table: 'user', join: 'left', as: 'b', on: ['user_id', 'b.id'] })
      .field('b.id,b.username')
      .select()
  }
}

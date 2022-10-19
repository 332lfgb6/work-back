module.exports = class extends think.Model {
  async getTopicInfo(id) {
    const topicInfo = await this.where({ id }).find()
    topicInfo.img = `${think.config('baseUri')}topic_imgs/${topicInfo.img}.png`
    return topicInfo
  }

  async getTopicList() {
    return await this.page(1, 1000).countSelect()
  }
}

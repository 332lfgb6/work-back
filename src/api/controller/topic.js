const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  async getTopicInfoAction() {
    const topic = await this.model('topic').getTopicInfo(this.post('topicId'))

    topic.videoNum = await this.model('topic_video').getVideoNum(topic.id)

    return this.success(topic, '获取标签信息成功')
  }
}

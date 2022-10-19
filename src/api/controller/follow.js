const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }
  async followSbAction() {
    const uuserId = await this.getUserId()
    const userId = this.post('userId')
    const contentId = await this.model('follow').followSb(uuserId, userId)
    await this.model('activity').addActivity('follow', contentId, userId)
    return this.success('', '关注成功')
  }

  async cancelFollowSbAction() {
    const uuserId = await this.getUserId()
    const userId = this.post('userId')
    const contentId = await this.model('follow').cancelFollowSb(uuserId, userId)
    await this.model('activity').delActivity('follow', contentId, userId)
    return this.success('', '取关成功')
  }
}

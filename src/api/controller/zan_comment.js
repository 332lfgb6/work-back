const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  // 点赞 / 取消点赞评论
  async zanCommentAction() {
    const { zaned, commentId } = this.post()
    const userId = await this.getUserId()
    const contentId = await this.model('zan_comment').zanComment(zaned, userId, commentId)

    await this.model('activity')[zaned ? 'delActivity' : 'addActivity']('zan_comment', contentId, userId)

    return this.success('', '点赞/取消点赞成功')
  }
}

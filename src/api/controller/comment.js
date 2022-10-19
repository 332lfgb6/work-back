const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  async getCommentListAction() {
    const page = this.get('page')
    const parentCommentId = this.get('parentCommentId')
    // const size = parentCommentId == 0 ? 10 : 3
    const size = parentCommentId == 0 ? 1000 : 1000
    let commentList = await this.model('comment').getCommentList(this.get('videoId'), parentCommentId, page, size)

    // xx 回复 yy

    // 获取点赞信息：是否赞过、点赞数量
    commentList.data = await this.model('zan_comment').getZanInfo(commentList.data, await this.getUserId())

    return this.success(commentList, '获取评论列表成功')
  }

  async pubCommentAction() {
    let { content, videoId, reply_user_id, parent_id } = this.post()
    reply_user_id = reply_user_id || 0
    parent_id = parent_id || 0
    const user_id = await this.getUserId()
    const comment = await this.model('comment').pubComment(content, videoId, user_id, reply_user_id, parent_id)

    comment.reply_user_id = reply_user_id
    comment.reply_user_username = await this.model('user').where({ id: reply_user_id }).getField('username', true)

    await this.model('activity').addActivity('comment', comment.id, user_id)

    return this.success(comment, '发布评论成功')
  }

  async delCommentAction() {
    const commentId = this.post('commentId')
    await this.model('comment').delComment(commentId)

    const user_id = await this.getUserId()
    await this.model('activity').delActivity('comment', commentId, user_id)

    return this.success('', '已删除')
  }
}

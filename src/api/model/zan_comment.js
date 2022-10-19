module.exports = class extends think.Model {
  async getZanInfo(commentList, user_id) {
    for (const comment of commentList) {
      const comment_id = comment.id
      if (!user_id) {
        comment.zaned = 0
      } else {
        comment.zaned = await this.where({ user_id, comment_id }).count()
      }
      comment.zanCount = await this.where({ comment_id }).count()
    }
    return commentList
  }

  async zanComment(zaned, user_id, comment_id) {
    let contentId
    if (zaned) {
      contentId = await this.where({ user_id, comment_id }).getField('id', true)
      await this.where({ user_id, comment_id }).delete()
    } else {
      contentId = await this.add({ user_id, comment_id })
    }
    return contentId
  }
}

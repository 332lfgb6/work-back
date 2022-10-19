module.exports = class extends think.Model {
  async getCommentList(video_id, parent_id, page, size) {
    const commentList = await this.where({ video_id, parent_id })
      .alias('a')
      .join({
        table: 'user',
        join: 'left',
        as: 'b',
        on: ['a.user_id', 'b.id']
      })
      .join({
        table: 'user',
        join: 'left',
        as: 'c',
        on: ['reply_user_id', 'c.id']
      })
      .field(
        'id,content,reply_user_id,pub_time,user_id,parent_id,b.username,b.avatar,c.username as reply_user_username'
      )
      .order({ pub_time: 'desc' })
      .page(page, size)
      .countSelect()

    for (const comment of commentList.data) {
      comment.avatar = `${think.config('baseUri')}avatars/${comment.avatar}.jpeg`

      // 查看x条回复
      if (parent_id == 0) {
        comment.children = await this.where({ parent_id: comment.id }).page(1, 3).countSelect()
        comment.children.data = []
      }
    }

    return commentList
  }

  async pubComment(content, video_id, user_id, reply_user_id, parent_id) {
    const id = await this.add({ content, video_id, user_id, reply_user_id, parent_id })
    const comment = await this.where({ 'a.id': id })
      .alias('a')
      .join({
        join: 'left',
        table: 'user',
        as: 'b',
        on: ['user_id', 'b.id']
      })
      .field('id,content,pub_time,user_id,parent_id,b.username,b.avatar')
      .find()
    comment.avatar = `${think.config('baseUri')}avatars/${comment.avatar}.jpeg`
    comment.zaned = 0
    comment.zanCount = 0

    // 发布评论时，如果是根评论，那就需要携带children信息。
    if (!comment.parent_id) {
      comment.children = {
        count: 0,
        currentPage: 0,
        totalPages: 0,
        pageSize: 3,
        data: []
      }
    }
    return comment
  }

  async delComment(id) {
    await this.where({ id }).delete()
  }

  async getCommentCount(video_id) {
    return await this.where({ video_id }).count()
  }
}

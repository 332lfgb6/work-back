module.exports = class extends think.Model {
  // 关注某人
  async followSb(uuser_id, user_id) {
    return await this.add({ uuser_id, user_id })
  }

  // 取关
  async cancelFollowSb(uuser_id, user_id) {
    const followId = await this.where({ uuser_id, user_id }).getField('id', true)
    await this.delete({ uuser_id, user_id })
    return followId
  }

  // 检查有没有关注对方。
  async checkIsFollow(uuser_id, user_id) {
    if (uuser_id == user_id) return 2

    // 如果未登录的情况下访问该接口，返回0，也就是未关注
    if (!uuser_id) return 0

    return !think.isEmpty(await this.where({ uuser_id, user_id }).find()) ? 1 : 0
  }
}

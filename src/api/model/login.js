module.exports = class extends think.Model {
  async addToken(user_id) {
    const token = think.uuid('v4')
    await this.add({ user_id, token })
    return token
  }

  async checkTokenIsValid(token) {
    return !think.isEmpty(await this.where({ token }).find())
  }

  async logout(token) {
    await this.where({ token }).delete()
  }
}

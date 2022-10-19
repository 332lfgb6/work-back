module.exports = class extends think.Model {
  async addActivity(table_name, content_id, user_id) {
    await this.add({ table_name, content_id, user_id })
  }

  async delActivity(table_name, content_id, user_id) {
    await this.delete({ table_name, content_id, user_id })
  }

  async getActivity(user_id) {
    return await this.where({ user_id }).page(1, 1000).countSelect()
  }
}

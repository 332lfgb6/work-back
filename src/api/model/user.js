module.exports = class extends think.Model {
  async getUserinfo(id) {
    let userinfo = await this.where({ id }).field('id,username,douyinNo,avatar,brief').find()
    userinfo.avatar = `${think.config('baseUri')}avatars/${userinfo.avatar}.jpeg`
    return userinfo
  }

  async getUserList() {
    const userList = await this.field('id,username,avatar,douyinNo,fans_num,auth').select()
    return userList.map(v => {
      v.avatar = `${think.config('baseUri')}avatars/${v.avatar}.jpeg`
      return v
    })
  }
}

const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  async loginAction() {
    const userModel = this.model('user')
    const phone = this.post('phone')
    const user = await userModel.where({ phone }).find()

    // 如果当前手机号未注册，则返回一个空token；如果已注册，则更新token并返回。
    let token, username
    if (think.isEmpty(user)) {
      token = null
    } else {
      username = user.username
      token = await this.model('login').addToken(user.id)
    }
    return this.success(token, '登录成功')
  }

  async registerAction() {
    const [phone, username, avatar] = [this.post('phone'), this.post('username'), this.post('avatar')]
    const douyinNo = Math.random().toString().slice(2, 11)
    const userId = await this.model('user').add({ phone, username, avatar, douyinNo })
    const token = await this.model('login').addToken(userId)
    return this.success(token, '注册成功')
  }

  async getUserinfoAction() {
    let userId = this.post('userId') || (await this.getUserId())
    // 头像、抖音号、简介
    const userinfo = await this.model('user').getUserinfo(userId)
    // 关注者数量
    userinfo.followerNum = await this.model('follow').where({ uuser_id: userId }).count()
    // 粉丝数量
    userinfo.fansNum = await this.model('follow').where({ user_id: userId }).count()
    // 点赞数量
    userinfo.zanNum = 0
    userinfo.follow = await this.model('follow').checkIsFollow(await this.getUserId(), userId)
    return this.success(userinfo, '获取用户信息成功')
  }

  async logoutAction() {
    await this.model('login').logout(this.header('token'))
    return this.success('', '退出登录成功')
  }

  async getUserListAction() {
    const userList = await this.model('user').getUserList()
    return this.success(userList, '获取用户列表成功')
  }

  // 检查token是否有效
  async checkTokenAction() {
    return this.success(
      !think.isEmpty(
        await this.model('login')
          .where({ token: this.header('token') })
          .find()
      ),
      '检查token完毕'
    )
  }
}

const Base = require('./base.js')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  async getMusicListAction() {
    const musicList = await this.model('music').getMusicList()
    return this.success(musicList, '获取音乐列表成功')
  }
}

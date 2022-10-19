const Base = require('./base.js')
const fs = require('fs')
const path = require('path')
const rename = think.promisify(fs.rename, fs)
const { execSync } = require('child_process')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  // 获取标签列表
  async getTopicListAction() {
    const topicList = await this.model('topic').getTopicList()
    for (const topic of topicList.data) {
      topic.videoNum = await this.model('topic_video').getVideoNum(topic.id)
    }
    return this.success(topicList, '获取标签列表成功')
  }

  // 发布作品
  async pubWorkAction() {
    // 存储上传过来的视频
    const file = this.file('file')
    const filename = think.uuid('v4')
    const filePath = `upload/videos/${filename}.mp4`
    let filepath = path.join(think.ROOT_PATH, 'www', filePath)
    think.mkdir(path.dirname(filepath))
    await rename(file.path, filepath)

    // 获取视频的第一帧
    const imgPath = path.join(think.ROOT_PATH, `www/upload/covers/${filename}.png`)
    execSync('ffmpeg -ss 00:00:01.000 -i ' + filepath + ' -vframes 1 ' + imgPath)

    await this.model('video').add({
      filename,
      title: this.post('title'),
      user_id: await this.getUserId(),
      cover: filename
    })
    return this.success('', '发布作品成功')
  }
}

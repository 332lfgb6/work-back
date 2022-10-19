const Base = require('./base.js')

const fs = require('fs')
const path = require('path')
const rename = think.promisify(fs.rename, fs)

const { execSync } = require('child_process')

module.exports = class extends Base {
  indexAction() {
    return this.display()
  }

  // 注册时需要上传头像
  async uploadImgAction() {
    // 只能上传png、gif、jpg、jpeg这4种后缀的图片。
    const file = this.file('file')
    const available = ['png', 'gif', 'jpg', 'jpeg']
    const suffix = file.name.split('.').pop()
    if (!available.includes(suffix)) return this.fail(1, '只能上传png、gif、jpg、jpeg这4种后缀的图片。')

    // 图片大小不能超过5M。
    if (file.size > 5 * 1024 * 1024) return this.fail(2, '图片大小不能超过5M。')

    // 将上传的图片存储起来
    const filePath = `upload/avatars/${think.uuid('v4')}.jpeg`
    let filepath = path.join(think.ROOT_PATH, 'www', filePath)
    think.mkdir(path.dirname(filepath))
    await rename(file.path, filepath)

    // 生成URI。
    const fileUri = `http://${this.config('host')}:${this.config('port')}/${filePath}`
    return this.success({ fileUri }, '上传文件成功')
  }

  async uploadVideoAction() {
    // 只支持mp4格式的视频
    const file = this.file('file')
    const available = ['mp4']
    const suffix = file.name.split('.').pop()
    if (!available.includes(suffix)) return this.fail(1, '只支持mp4格式的视频')

    // 文件大小限制为20M
    if (file.size > 20 * 1024 * 1024) return this.fail(2, '文件大小限制为20M')

    // 将上传的视频存储起来
    const filePath = `upload/videos/${think.uuid('v4')}.mp4`
    let filepath = path.join(think.ROOT_PATH, 'www', filePath)
    think.mkdir(path.dirname(filepath))
    await rename(file.path, filepath)

    // 生成URI。
    const fileUri = `${think.config('baseUri')}/${filePath}`
    return this.success({ fileUri }, '上传视频成功')
  }

  async getFirstAction() {
    this.post()
      .fileNameList.split(',')
      .forEach(v => {
        const videoPath = path.join(think.ROOT_PATH, `www/upload/videos/${v}.mp4`)
        const extname = path.extname(videoPath)
        const basename = path.basename(videoPath, extname)
        const imgPath = path.join(think.ROOT_PATH, `www/upload/covers/${v}.png`)
        execSync('ffmpeg -ss 00:00:01.000 -i ' + videoPath + ' -vframes 1 ' + imgPath)
      })
    return this.success('', '获取第一帧成功')
  }
}

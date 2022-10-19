const Base = require('./base.js')

module.exports = class extends Base {
  openAction() {
    console.log('ddd')
    this.emit('opend', new Date() + '此客户端已成功打开！')
    this.broadcast('joined', new Date() + '有一个新客户成功加入！')
  }

  closeAction() {
    think.logger.info('已退出')
  }

  sendMsgAction() {
    think.logger.info('获取客户端 add 事件发送的数据', this.wsData)
    // console.log('获取当前 WebSocket 对象', this.websocket);
    think.logger.info('判断当前请求是否是 WebSocket 请求', this.isWebsocket)
    this.broadcast('add', this.wsData)
  }

  addAction() {
    think.logger.info(this.wsData)
    this.broadcast('add', this.wsData)
  }

  delAction() {
    think.logger.info(this.wsData)
    this.broadcast('del', this.wsData)
  }
}

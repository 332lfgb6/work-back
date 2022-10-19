// development
const host = '192.168.1.94'
const port = 9393
const baseUri = `http://${host}:${port}/upload/`
// default config
module.exports = {
  workers: 1,
  host,
  port,
  baseUri,
  stickyCluster: true
}

// // production
// const port = 9393
// const baseUri = `http://39.108.86.151/upload/`
// // default config
// module.exports = {
//   workers: 1,
//   // host,
//   port: 9393,
//   baseUri,
//   stickyCluster: true
// }

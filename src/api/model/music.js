module.exports = class extends think.Model {
  async getMusicList() {
    const musicList = await this.select()
    return musicList.map(v => {
      v.poster = `${think.config('baseUri')}posters/${v.poster}.jpg`
      v.music_filename = `${think.config('baseUri')}musics/${v.music_filename}.mp3`
      return v
    })
  }
}

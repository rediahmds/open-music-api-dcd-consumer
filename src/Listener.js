class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._playlistsService.getPlaylistByOwnerId(
        userId
      );
      const emailStatus = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlists)
      );
      console.log(emailStatus);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Listener;

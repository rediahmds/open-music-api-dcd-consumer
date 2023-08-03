class Listener {
  constructor(playlistsService, tracksService, mailSender) {
    this._playlistsService = playlistsService;
    this._tracksService = tracksService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlistDetail = await this._playlistsService.getPlaylistDetailById(
        playlistId,
        userId
      );
      const songs = await this._tracksService.getTracksInPlaylist(playlistId);

      const playlistAttachment = {
        playlist: {
          ...playlistDetail,
          songs,
        },
      };

      const emailStatus = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistAttachment)
      );
      console.log(emailStatus);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Listener;

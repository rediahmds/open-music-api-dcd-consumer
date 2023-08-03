const { Pool } = require('pg');

class TracksService {
  constructor() {
    this._pool = new Pool();
  }

  async getTracksInPlaylist(playlistId) {
    const getTracksInPlaylistQuery = {
      text: `SELECT songs.id, songs.title, songs.performer
        FROM songs
        INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id
        WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(getTracksInPlaylistQuery);

    return result.rows;
  }
}

module.exports = TracksService;

const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistDetailById(playlistId, userId) {
    const getPlaylistDetailQuery = {
      text: 'SELECT id, name FROM playlists WHERE id = $1 AND owner = $2;',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(getPlaylistDetailQuery);

    return result.rows[0];
  }
}

module.exports = PlaylistsService;

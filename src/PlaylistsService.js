const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistByOwnerId(ownerId) {
    const getPlaylistQuery = {
      text: `SELECT 
				p.id AS playlist_id,
				p.name AS playlist_name,
				s.id AS song_id,
				s.title AS song_title,
				s.performer AS song_performer
				FROM playlists p
				INNER JOIN playlist_songs ps ON p.id = ps.playlist_id
				INNER JOIN songs s ON ps.song_id = s.id
				WHERE p.owner = $1
        GROUP BY p.id;`,
      values: [ownerId],
    };

    const result = await this._pool.query(getPlaylistQuery);

    return result.rows;
  }
}

module.exports = PlaylistsService;

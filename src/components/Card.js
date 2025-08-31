import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setlikedMusic = musicContext.setLikedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setpinnedMusic = musicContext.setPinnedMusic;
  const [playlists, setPlaylists] = useState(
    JSON.parse(localStorage.getItem("playlists")) || []
  );
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // Add new playlist handler
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        songs: [],
      };
      const updatedPlaylists = [...playlists, newPlaylist];
      setPlaylists(updatedPlaylists);
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
      setNewPlaylistName("");
    }
  };

  // Add song to playlist handler
  const handleAddToPlaylist = (playlistId) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        if (!playlist.songs.some((song) => song.id === element.id)) {
          return {
            ...playlist,
            songs: [...playlist.songs, element],
          };
        }
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const handlePin = () => {
    let pinnedMusic = localStorage.getItem("pinnedMusic");
    pinnedMusic = JSON.parse(pinnedMusic);
    let updatedPinnedMusic = [];
    if (pinnedMusic.some((item) => item.id === element.id)) {
      updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
      setpinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    } else {
      if (pinnedMusic.length >= 4) {
      }
      updatedPinnedMusic = pinnedMusic;
      updatedPinnedMusic.push(element);
      setpinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    }
  };

  const handleLike = () => {
    let likedMusic = localStorage.getItem("likedMusic");
    likedMusic = JSON.parse(likedMusic);
    let updatedLikedMusic = [];
    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    } else {
      updatedLikedMusic = likedMusic;
      updatedLikedMusic.push(element);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    }
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    setlikedMusic(localLikedMusic);
  }, [setlikedMusic]);

  return (
    <div key={element.id} className="col-lg-3 col-md-6 py-2">
      <div className="card">
        <div className="ratio ratio-1x1 bg-secondary bg-opacity-25">
          <img
            src={element.album.images[0].url}
            className="card-img-top"
            alt="..."
          />
        </div>

        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            {element.name}
            <div className="add-options d-flex align-items-start">
              {pinnedMusic.some((item) => item.id === element.id) ? (
                <button
                  onClick={handlePin}
                  className="btn btn-outline-dark mx-1"
                >
                  <i className="bi bi-pin-angle-fill"></i>
                </button>
              ) : (
                <button
                  onClick={handlePin}
                  className="btn btn-outline-dark mx-1"
                >
                  <i className="bi bi-pin-angle"></i>
                </button>
              )}
              {likedMusic.some((item) => item.id === element.id) ? (
                <button onClick={handleLike} className="btn btn-outline-dark">
                  <i className="bi bi-heart-fill text-danger"></i>
                </button>
              ) : (
                <button onClick={handleLike} className="btn btn-outline-dark">
                  <i className="bi bi-heart"></i>
                </button>
              )}
              
              <div className="dropdown mx-1">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-list"></i>
                </button>

                <ul className="dropdown-menu">
                  {/* Pin/Unpin option */}
                  <li>
                    {pinnedMusic.some((item) => item.id === element.id) ? (
                      <button
                        onClick={handlePin}
                        className="dropdown-item text-secondary"
                      >
                        Unpin
                      </button>
                    ) : (
                      <button
                        onClick={handlePin}
                        className="dropdown-item text-secondary"
                      >
                        Pin
                      </button>
                    )}
                  </li>

                  {/* Like/Unlike option */}
                  <li>
                    {likedMusic.some((item) => item.id === element.id) ? (
                      <button
                        onClick={handleLike}
                        className="dropdown-item text-secondary"
                      >
                        Unlike
                      </button>
                    ) : (
                      <button
                        onClick={handleLike}
                        className="dropdown-item text-secondary"
                      >
                        Like
                      </button>
                    )}
                  </li>

                  {/* Playlist section */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <div className="px-3 py-2">
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        placeholder="New playlist name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={handleCreatePlaylist}
                      >
                        Create Playlist
                      </button>
                    </div>
                  </li>
                  
                  {/* Existing playlists */}
                  {playlists.length > 0 && <li><hr className="dropdown-divider" /></li>}
                  {playlists.map((playlist) => (
                    <li key={playlist.id}>
                      <button
                        className="dropdown-item text-secondary"
                        onClick={() => handleAddToPlaylist(playlist.id)}
                      >
                        Add to: {playlist.name}
                        {playlist.songs.some((song) => song.id === element.id) && 
                          <i className="bi bi-check-lg text-success ms-2"></i>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </h5>
          <p className="card-text">Artist: {element.album.artists[0].name}</p>
          <p className="card-text">
            Release date: {element.album.release_date}
          </p>
          <audio src={element.preview_url} controls className="w-100"></audio>
        </div>
      </div>
    </div>
  );
}

export default Card;

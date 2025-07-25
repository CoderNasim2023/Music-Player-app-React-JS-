import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setResultOffset = musicContext.setResultOffset;
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-music-note-list mx-3"></i> Resso-music
          </Link>
          <div>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-secondary btn-sm mx-1"
            >
              <i className="bi bi-pin-angle-fill" title="Your Pinned songs"></i> {pinnedMusic.length}
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#likedMusicModal"
              className="btn btn-secondary btn-sm mx-1"
            >
              <i className="bi bi-heart-fill" title="Your Liked Songs"></i> {likedMusic.length}
            </button>
          </div>

          ---
<div
  className="collapse navbar-collapse d-flex justify-content-center"
  id="navbarSupportedContent"
>
  {/* START of the updated search input section */}
  <div className="position-relative w-75 me-2"> {/* Added position-relative and w-75 me-2 */}
    <input
      value={keyword}
      onChange={(event) => setKeyword(event.target.value)}
      onKeyDown={handleKeyPress}
      className="form-control" // Removed me-2 w-75 as parent div now handles width
      type="search"
      placeholder="Search Songs"
      aria-label="Search"
    />
    {keyword && ( // Only show if keyword is not empty
      <button
        className="btn-close position-absolute top-50 end-0 translate-middle-y me-2" // Adjusted styling for better placement
        onClick={() => setKeyword("")}
        aria-label="Clear search"
        type="button" // Added type="button" for better semantic HTML
      />
    )}
  </div>
  {/* END of the updated search input section */}

  <button
    onClick={() => {
      setResultOffset(0);
      fetchMusicData(keyword);
    }}
    className="btn btn-outline-success"
    title="Search Songs"
  >
    Search Songs
  </button>
</div>
---
        </div>
      </nav>

      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

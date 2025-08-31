import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

const PinnedMusic = ({ onUnpin }) => {
  const musicContext = useContext(MusicContext);
  const pinnedMusic = musicContext.pinnedMusic;
  const setpinnedMusic = musicContext.setPinnedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic")) || [];
    setpinnedMusic(localPinnedMusic);
  }, [setpinnedMusic]);

  return (
    <div>
      <div className="container">
        {pinnedMusic.length === 0 ? (
          <div className="row">
            <div className="col">
              <h3 className="py-5 text-center">
                You don't have any pinned music yet!
              </h3>
              <div className="text-center">
                <i className="bi bi-emoji-frown fs-1"></i>{" "}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-danger text-center py-3">
              Your Pinned Songs
            </h1>
          </div>
        )
        }
        <div className="row">
          {pinnedMusic.map((element) => {
            return (
              <Card key={element.id} element={element}>
                <button
                  onClick={() => onUnpin(element.id)}
                  className="btn btn-danger btn-sm"
                  title="Unpin song"
                >
                  {/* <i className="bi bi-pin-angle"></i> Unlike */}
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PinnedMusic;
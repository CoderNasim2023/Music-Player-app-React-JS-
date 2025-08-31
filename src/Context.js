import { createContext, useState } from "react";

export const MusicContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  likedMusic: [],
  setLikedMusic: () => {},
  resultOffset: 0,
  setResultOffset: () => {},
  pinnedMusic: [],
  setPinnedMusic: () => {},
  playlists: [],
  setPlaylists: () => {},
});

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState([]);
  const [pinnedMusic, setPinnedMusic] = useState([]);
  const [resultOffset, setResultOffset] = useState(0);
  const [playlists, setPlaylists] = useState([]);

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        resultOffset,
        setResultOffset,
        pinnedMusic,
        setPinnedMusic,
        playlists,
        setPlaylists,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

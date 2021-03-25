import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  //if track selection changes, then autoplay
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      // if the player is not playing, then update local state to match
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      // if the trackURI exists, then put it into an array as this is what the Player expects. if trackURI does not exist then return empty array
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;

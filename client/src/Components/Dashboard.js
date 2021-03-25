import { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
//initialize Spotify API with client ID
const spotifyApi = new SpotifyWebApi({
  clientId: "b2a4c85d08204823ad65906e7a6a3207",
});

const Dashboard = ({ code }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  //Set the current track to user selection and reset search field
  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };
  //pull access token from useAuth custom hook
  const accessToken = useAuth(code);
  //set the access token in the spotify api. if access token changes, set again
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    //only hit spotify api if user stops typing
    let cancel = false;
    //search API for tracks based on search input
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      //set search result in state. map through search results and pull the smallest album image
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs or Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => {
          return <TrackSearchResult track={track} key={track.uri} />;
        })}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
};

export default Dashboard;

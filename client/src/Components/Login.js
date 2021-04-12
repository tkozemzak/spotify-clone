import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Context } from "../Contexts/Store";
import axios from "axios";

export default function Login({ clientId }) {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    //hit keystoreproxyserver for spotify Client ID
    axios
      .get("http://tkozemzak.ddns.net:8000/api/v1/spotify-clone")
      .then((res) => {
        const clientIdRes = res.data;
        console.log("res in useeffect", clientIdRes);
        localStorage.setItem(
          "spotify_client_id",
          process.env.REACT_APP_CLIENT_ID
        );
        dispatch({ type: "SAVE_ID", payload: clientIdRes });
      });
  }, []);

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${state.clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
  console.log("Auth URL", AUTH_URL);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {state.clientId && (
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login With Spotify
        </a>
      )}
    </Container>
  );
}

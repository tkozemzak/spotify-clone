import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Context } from "../Contexts/Store";

export default function Login({ clientId }) {
  const [state] = useContext(Context);

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=b2a4c85d08204823ad65906e7a6a3207&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

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

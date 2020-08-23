import React from "react";
import { Link } from "react-router-dom"; 

const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "CLIENT_SECRET";
const redirectUri = "REDIRECT_URL";

const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-modify-private", 
    "playlist-modify-public"
];

const LoginPage = () => {
    return (
      <div className="App">
        <header className="App-header">
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              LET'S GET SPICY  
            </a>
        </header>
      </div>
    );
  };
  
  export default LoginPage;
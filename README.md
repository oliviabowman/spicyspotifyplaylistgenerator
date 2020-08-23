# Spicy Spotify Playlist Generator

A react app that creates customized Spotify playlists based on user's input for optimal jamming. 

Check out a live demo [here](https://spicyspotifyplaylistgenerator.herokuapp.com/) and get listening! 
Compatible with Chrome. 

### How it works
1. Authenticates users through OAuth and gets a [Spotify access token](https://developer.spotify.com/documentation/general/guides/authorization-guide/). 
2. Gets artist id based on artist user input through the `/search` endpoint. 
3. Gets recommended songs through the `/recommendations` endpoint and passes the user inputs in as parameters. 
4. Creates an empty playlist in the user's library through the `/users/{user_id}/playlists` endpoint. 
5. Fills the empty playlist with the recommended songs through the `/playlists/{playlist_id}/tracks` endpoint and loads the embedded link in an iframe.



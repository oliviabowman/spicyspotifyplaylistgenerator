import React from "react";
import $ from 'jquery'; 

function PlaylistPage() {

    //Gets the authorization params 
    const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});


    const search = () => {
        
        $('form').on('submit', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            
            let artist = $('input[type=artists]').val();
            let genre = $('input[type=genre]').val();
            let popularity = $('input[type=popularity]').val();
            let danceability = $('input[type=danceability]').val();

            $($("#theFreakingPlaylist").parent()).empty();
            
            var artistJson = searchArtist(artist); 
        
            $.when(artistJson).then(a => {
                var artistId = a.artists.items[0].id; 
                var artistName = a.artists.items[0].name; 
                
                $.when(getUserId(hash.access_token)).then(u => {
                    u = u.id; 
                    getRecommendedSongs(artistId, genre, u, artistName, popularity, danceability);      
                    
                }); 
            });
            
            
        });     
    }

    //Gets artist object 
    const searchArtist = (inputArtist) => $.ajax({
        url: 'https://api.spotify.com/v1/search',
        headers: {
            'Content-Type' : 'application/json', 
            'Authorization':'Bearer ' + hash.access_token
        },
        method: 'GET',
        dataType: 'json',
        data: {
            type: 'artist',
            q: inputArtist
        }
    });

    //Gets username from token 
    const getUserId = (token) => $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Content-Type' : 'application/json', 
            'Authorization':'Bearer ' + token
        },
        method: 'GET',
        dataType: 'json'
    });

    //Gets recommend songs 
    const getRecommendedSongs = (artist, genre, username, artistName, popularity, danceability) => $.ajax({
        url: 'https://api.spotify.com/v1/recommendations?limit=10&seed_artists=' + artist + '&seed_genres=' + genre + '&target_danceability=' + danceability + '&target_popularity=' + popularity,
        headers: {
            'Content-Type' : 'application/json', 
            'Authorization':'Bearer ' + hash.access_token
        },
        method: 'GET',
        dataType: 'json',
    }).then(response => {
        createPlaylist(hash.access_token, username, response.tracks, artistName); 
    });

    const addSongsToPlaylist = (accessToken, id, tracks) => {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/'+ id + '/tracks?uris=' + tracks,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
        });  
    }

    //Create playlise and fill with tracks 
    const createPlaylist = async (accessToken, userID, tracks, artistName) => {
        const emptyPlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            body: JSON.stringify({
                'name': 'spicy ' + artistName + ' playlist',
                'public': false,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(async response => {
            tracks = tracks.map(song => 'spotify%3Atrack%3A' + song.id).join(',');
            response = response.json().then(function(res) {
                
                addSongsToPlaylist(accessToken, res.id, tracks); 
                $('.playlist').append('<iframe id ="theFreakingPlaylist" src="https://open.spotify.com/embed/playlist/' + res.id + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>');
                
            }); 
            
        });
    }

    
    return (
        <div className="thing">
            <main>
                <div className="stuffOnRight">
                    <div className="title">
                        <h3>Create a Spicy Playlist</h3>
                    </div>

                    <div className="form">
                        <form action="">
                            <input type="artists" placeholder="artist..." />
                        </form>
                    </div>

                    <div className="form">
                        <form action="">
                            <input type="genre" placeholder="genre..." />
                        </form>
                    </div>

                    <div className="form">
                        <form action="">
                            <input type="popularity" placeholder="popularity from 0 to 100... " />
                        </form>
                    </div>

                    <div className="form">
                        <form action="">
                            <input type="danceability" placeholder="danceability as a decimal from 0 to 1..." />
                        </form>
                    </div>

                    <div className="create">
                        <form action="">
                            <input type="submit" value="  CREATE  " id="submitButton" onClick={search} />
                        </form>
                    </div>
                </div>
                <div className="playlist"></div>
            </main>
        </div>
    );
}
  
export default PlaylistPage;
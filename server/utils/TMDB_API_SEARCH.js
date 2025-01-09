
/*
This file contains a function that searches the TMDB API for a list of movies and TV shows based on the media_name parameter.
Fetches data from the TMDB API and restructures the data to include only the necessary information.
Also filters the data to only include media with the original_language key set to 'en' if the english_only parameter is set to true.
Sorts the data based on the Levenshtein distance between the media title and the media_name parameter.
Returns a JSON object with a status key and a result key.
The status key is set to 200 if the data was fetched successfully, 404 if the media was not found, and 500 if there was an error when fetching the data.
The result key contains the list of media objects if the status key is set to 200, and an error message if the status key is set to 404 or 500.
The function itself is a promise that returns the JSON object. Usage requires the use of .then() and .catch() to handle the promise.
*/


import Levenshtein from 'levenshtein';

export default function TMDB_API_SEARCH(media_name, auth, english_only=false){
    let url = {
      movie: `https://api.themoviedb.org/3/search/movie?query=${media_name}`,
      tv: `https://api.themoviedb.org/3/search/tv?query=${media_name}`
    }
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: auth
      }
    };
    // Searches the TMDB API for a list of movies and TV shows based on the media_name parameter
    function media_restructure(list){
        // Restructures the list of media objects to include only the necessary information
        // Also adds a media_type key to differentiate between movies and TV shows
        // Also sets both TV Show and Movie titles to the key 'title' instead of 'name' and 'title'
        for(let i=0; i<list.length; i++){
          let structured_obj = {}
          if(list[i].title === undefined){
            structured_obj.title = list[i].name;
            structured_obj.media_type = 'tv';
            structured_obj.release_date = list[i].first_air_date;
          } else {
            structured_obj.title = list[i].title;
            structured_obj.media_type = 'movie';
            structured_obj.release_date = list[i].release_date;
          }
          structured_obj.poster_path = 'https://image.tmdb.org/t/p/original/'+list[i].poster_path;
          structured_obj.id = list[i].id;
          structured_obj.overview = list[i].overview;
          if(list[i].vote_average == undefined){
            structured_obj.rating = 0;
          } else {
            structured_obj.rating = parseFloat(list[i].vote_average.toFixed(1));
          }
          structured_obj.vote_count = list[i].vote_count;
          structured_obj.original_language = list[i].original_language;
          list[i] = structured_obj;
        }
        return list;
      }
      function filter_english_only(list){
        // Filters the list of media objects to only include media with the original_language key set to 'en'
        let new_list = [];
        for(let i=0; i<list.length; i++){
          if(list[i].original_language === 'en'){
            new_list.push(list[i]);
          }
        }
        return new_list;
      }
      function media_sort(a, b) {
        // Sorts the list of media objects based on the Levenshtein distance between the media title and the media_name parameter
        var leva = new Levenshtein(a.title, media_name).distance;
        var levb = new Levenshtein(b.title, media_name).distance;
        return leva-levb;
      }
      if(media_name === undefined){
        media_name = "Deadpool";
      } else {
        media_name = media_name.replace(/ /g, "%20");
      }
    
      let media_list = [];
      return fetch(url.movie, options)
      .then(result => result.json())
      .then(data => {
        media_list.push(...data.results);
        return fetch(url.tv, options);
      })
      .then(result => result.json())
      .then(data => {
        media_list.push(...data.results);
        if(media_list.length === 0){
          return {status: 404, err: "Media not found"};
        } else {
          media_list = media_restructure(media_list);
          if(english_only){
            media_list = filter_english_only(media_list);
          }
          media_list = media_list.sort(media_sort);
          return {status: 200, result: media_list};
        }
      })
      .catch(err => {console.log("Error when fetching data from API. Error: ", err);return {status: 500, err: err}});
}
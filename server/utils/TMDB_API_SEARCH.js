import Levenshtein from 'levenshtein';


//! Need to add a function to escape single quotes after JSON.stringify for the media_name parameter

/*


4.1.2.4. Dollar-Quoted String Constants 
While the standard syntax for specifying string constants is usually convenient, it can be difficult to 
understand when the desired string contains many single quotes, since each of those must be doubled. To allow more 
readable queries in such situations, PostgreSQL provides another way, called “dollar quoting”, to write string constants.
 A dollar-quoted string constant consists of a dollar sign ($), an optional “tag” of zero or more characters, another dollar
  sign, an arbitrary sequence of characters that makes up the string content, a dollar sign, the same tag that began this 
  dollar quote, and a dollar sign. For example, here are two different ways to specify the string “Dianne's horse” using 
  dollar quoting:


*/

export default function TMDB_API_SEARCH(media_name, url, options, english_only=true){
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
          } else {
            structured_obj.title = list[i].title;
            structured_obj.media_type = 'movie';
          }
          structured_obj.poster_path = 'https://image.tmdb.org/t/p/original/'+list[i].poster_path;
          structured_obj.id = list[i].id;
          structured_obj.overview = list[i].overview;
          structured_obj.release_date = list[i].release_date;
          structured_obj.rating = parseFloat(list[i].vote_average.toFixed(1));
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
      .catch(err => {return {status: 500, err: err}});
}
/*
Utility file that contains functions for any generalized formatting functions

Functions:
    - usernameFormatter: Formats a username to be capitalized correctly, taking username and firstOnly
        - username: The username to format
        - firstOnly: A boolean that determines if only the first word should be formatted (default: true)
            - If true, only the first word is formatted and returned
            - If false, all words are formatted and returned
        - Returns the formatted username
*/



function usernameFormatter(username, firstOnly=true) {
  if(firstOnly){
    username=username.split(" ")[0];
    username = username.toLowerCase();
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
  username = username.toLowerCase();
  username = username.split(" ");
  username = username.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return username.join(" ");
}

export { usernameFormatter }
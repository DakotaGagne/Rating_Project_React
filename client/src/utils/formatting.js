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
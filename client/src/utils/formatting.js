

function usernameFormatter(username, firstOnly=true) {
  if(firstOnly) username=username.split(" ")[0];
  username = username.toLowerCase();
  return username.charAt(0).toUpperCase() + username.slice(1);
}


export { usernameFormatter}
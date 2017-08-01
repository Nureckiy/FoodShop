import decode from 'jwt-decode';

export function getItemFromToken(token, itemName) {
  const decoded = decode(token);
  return decoded[itemName];
}

export function getTokenExpirationDate(token){
  const exp = getItemFromToken(token, 'exp');
  if(!exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(exp);
  return date;
}

export function isTokenExpired(token){
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
}
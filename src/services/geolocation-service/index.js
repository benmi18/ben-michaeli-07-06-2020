export const getGeoLocation = (successCB, errorCB) => {
  if(!navigator.geolocation) {
    return;
  } else {
    navigator.geolocation.getCurrentPosition(successCB, errorCB);
  }
}

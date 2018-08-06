export const getLocation = () => {
  if (navigator.geolocation) {
    return new Promise(
      (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 6000
      })
    )
  } else {
    return new Promise(
      reject => reject(new Error('Geolocation data not available'))
    )
  }
}

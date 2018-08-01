export const getLocation = () => {
  console.log("getting location")
  if (navigator.geolocation) {
    return new Promise(
      (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000
      })
    )
  } else {
    return new Promise(
      resolve => resolve({})
    )
  }
}

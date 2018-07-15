export const getLocation = () => {
  if (navigator.geolocation) {
    return new Promise(
      (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 100
      })
    )
  } else {
    return new Promise(
      resolve => resolve({})
    )
  }
}

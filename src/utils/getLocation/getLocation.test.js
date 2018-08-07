import { getLocation } from './getLocation';

const mockGeolocation = {
  clearWatch: jest.fn(),
  getCurrentPosition: jest.fn((success, failure, options) => {
    success({
      coords: {
        longitude: 60,
        latitude: 60,
      },
    });
  }),
  stopObserving: jest.fn(),
  watchPosition: jest.fn(),
};



describe('testing getLocaion function', () => {

  test('getLocation Promise resolves with coordinates', () => {
    global.navigator.geolocation = mockGeolocation
    getLocation().then(res => {
      return expect(Promise.resolve(res)).resolves.toMatchObject({ "coords": { "latitude": 60, "longitude": 60 } });
    })
  })

  test('getLocation Promise rejects with Error without geolocation object', () => {
    global.navigator.geolocation = undefined
    getLocation().then(res => {
      return expect(Promise.reject(res)).rejects.toThrow('Geolocation data not available');
    })
  })

})
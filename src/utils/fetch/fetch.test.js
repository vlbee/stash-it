import { fetchRequest } from './fetch';
import dummyData from './dummydata.json'

describe('testing api & fetch', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test('fetch calls correct default endpoint', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: dummyData }))
    fetchRequest().then(res => {
    })
    expect(fetch.mock.calls[0][0]).toEqual('https://api-staging.stasher.com/v1/stashpoints')
  })

  test('fetch calls CityStasher default and returns Array of Objects', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: dummyData }))
    fetchRequest(null).then(res => {
      expect.arrayContaining(Object)
    })
  })

  test('fetch calls CityStasher default and returns correct data', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: dummyData }))
    fetchRequest(null).then(res => {
      expect(res.data[1].id).toBe(('5600ffa73de4'))
    })
  })

})


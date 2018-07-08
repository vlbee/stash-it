import { fetchRequest } from './fetch';
import dummyAll from './dummyAll.json'
import dummyFilter from './dummyFilter.json'


describe('testing fetch function calls api by default', () => {
  afterAll(() => {
    fetch.resetMocks()
  })

  fetch.mockResponse(JSON.stringify({ data: dummyAll }), { status: 200, headers: { 'content-type': 'application/json' } })

  test('fetch calls correct default endpoint', () => {
    fetchRequest().then(res => { })
    expect(fetch.mock.calls[0][0]).toEqual('https://api-staging.stasher.com/v1/stashpoints')
  })

  test('fetch calls CityStasher default and returns Array of Objects', () => {
    fetchRequest().then(res => {
      expect.arrayContaining(Object)
    })
  })
})


describe('testing fetch function generates search query from parameters object', () => {
  afterAll(() => {
    fetch.resetMocks()
  })

  const params = {
    twentyfour_seven: true,
    city: 'London'
  }

  test('fetch calls correct default endpoint', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: dummyFilter }), { status: 200, headers: { 'content-type': 'application/json' } })

    fetchRequest(params).then(res => { })
    expect(fetch.mock.calls[0][0]).toEqual('https://api-staging.stasher.com/v1/stashpoints?twentyfour_seven=true&city=London')
  })
})


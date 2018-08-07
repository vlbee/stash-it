const checkFetchResponse = res => {
  if (res.status === 200) {
    let result = res.json();
    return result;
  } else {
    console.error(
      `Error with fetch request. Response: ${res.status}`
    );
  }
};

export const fetchRequest = (params = {}) => {
  const url = new URL(`https://api-staging.stasher.com/v1/stashpoints`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  return fetch(url.toString(), {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(checkFetchResponse)
    .catch(error => {
      console.error(error)
    });
};


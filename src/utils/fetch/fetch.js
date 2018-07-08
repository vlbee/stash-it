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

export const fetchRequest = (query = 'stashpoints') => {
  const url = `https://api-staging.stasher.com/v1/${query}`;
  return fetch(url)
    .then(checkFetchResponse)
    .catch(err => {
      throw new Error(`Fetch request failed: ${err}`);
    });
};

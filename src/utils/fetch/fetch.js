const checkFetchResponse = res => {
  if (res.status === 200) {
    let result = res[0].json();
    console.log(result[1])
    return result;
  } else {
    console.error(
      `Error with fetch request. Response: ${res.status}`
    );
  }
};

export const fetchRequest = query => {
  const url = `https://api-staging.stasher.com/v1/${query}`;
  return fetch(url)
    .then(checkFetchResponse)
    .catch(err => {
      throw new Error(`Fetch request failed: ${err}`);
    });
};

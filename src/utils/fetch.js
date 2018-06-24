const checkFetchResponse = res => {
  if (res.status === 200) {
    return res.json();
  } else {
    console.error(
      `Error with fetch request. Response: ${res.status}`
    );
  }
};

export const fetchRequest = variable => {
  const url = `https://api.github.com/users/${variable}`;
  return fetch(url)
    .then(checkFetchResponse)
    .catch(err => {
      throw new Error(`Fetch request failed: ${err}`);
    });
};

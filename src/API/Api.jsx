async function FetchQuery(query, page) {
  const goFetch = await fetch(
    `https://pixabay.com/api/?key=34283172-0b08d30ba6284ca73fa07bc1d&q=${query}&image_type=photo&page=${page}&per_page=100`
  );
  const parseQuery = goFetch.json();
  return parseQuery;
}

export default FetchQuery;

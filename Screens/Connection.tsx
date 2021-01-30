//let port = 3000;
export function getData(path: String, setData: any, setLoading: any) {
  fetch('http://93.79.41.156:3200/' + path)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch(() => getData(path, setData, setLoading))
    .finally(() => {
      setLoading(false);
    });
}

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3125";

function setCommonHeader(headerName, value) {
  axios.defaults.headers[headerName] = value;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setCommonHeader,
};

export default httpService;

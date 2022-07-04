import axios from "axios";

const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (reqObj) => {
  const request = axios.post(baseUrl, reqObj);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const operations = { getAll, create, remove };

export default operations;

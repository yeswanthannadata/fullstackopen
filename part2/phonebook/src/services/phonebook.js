import axios from "axios";

const baseUrl = `https://secret-coast-15373.herokuapp.com/api/persons`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (reqObj) => {
  const request = axios.post(baseUrl, reqObj);
  return request.then((response) => response.data);
};

const update = (id, reqObj) => {
  const request = axios.put(`${baseUrl}/${id}`, reqObj);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const operations = { getAll, create, update, remove };

export default operations;

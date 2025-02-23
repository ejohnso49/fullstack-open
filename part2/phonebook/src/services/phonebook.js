import axios from 'axios';

const serviceUrl = 'http://localhost:3001/persons';

const getPersons = () => {
  return axios.get(serviceUrl).then((response) => {
    return response.data;
  });
};

const newPerson = (newPerson) => {
  return axios.post(serviceUrl, newPerson).then((response) => {
    return response.data;
  });
}

const updatePerson = (update) => {
  return axios.put(`${serviceUrl}/${update.id}`, update);
};

const deletePerson = (id) => {
  return axios.delete(`${serviceUrl}/${id}`);
}

export default {
  getPersons,
  newPerson,
  deletePerson,
  updatePerson,
};

import { notification } from "antd";
import axios from "axios";

const SERVICE_URL = "https://5f1iot5725.execute-api.ap-south-1.amazonaws.com";
const TEST_MODE = import.meta.env.VITE_APP_TEST_MODE === "true" ? true : false;
if (TEST_MODE) {
  notification.info({
    message: "Test mode Active !!",
    description: "Test mode Active !!",
    placement: "bottomRight",
    duration: 5,
    style: {
      backgroundColor: "#f6ffed",
      border: "1px solid #b7eb8f",
    },
  });
}

export const servicePost = async (path, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${
          !TEST_MODE
            ? `${SERVICE_URL}/${path}`
            : path.split("/").shift() === "admin"
            ? `http://localhost:8084${path.slice(7)}`
            : `http://localhost:8080${path.slice(4)}`
        }`,
        payload,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const serviceGet = async (path, headers) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${
          !TEST_MODE
            ? `${SERVICE_URL}/${path}`
            : path.split("/").shift() === "admin"
            ? `http://localhost:8084${path.slice(7)}`
            : `http://localhost:8080${path.slice(4)}`
        }`,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        // if(response.data.statusCode===403){
        //    store.dispatch(logout());
        // }
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const servicePut = async (path, payload, headers = null) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${
          !TEST_MODE
            ? `${SERVICE_URL}/${path}`
            : path.split("/").shift() === "admin"
            ? `http://localhost:8084${path.slice(7)}`
            : `http://localhost:8080${path.slice(4)}`
        }`,
        payload,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const serviceDelete = async (path, headers) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${
          !TEST_MODE
            ? `${SERVICE_URL}/${path}`
            : path.split("/").shift() === "admin"
            ? `http://localhost:8084${path.slice(7)}`
            : `http://localhost:8080${path.slice(4)}`
        }`,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
export const serviceGetWithCustomResponse = async (
  path,
  headers,
  responseType
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${
          !TEST_MODE
            ? `${SERVICE_URL}/${path}`
            : path.split("/").shift() === "admin"
            ? `http://localhost:8084${path.slice(7)}`
            : `http://localhost:8080${path.slice(4)}`
        }`,
        {
          headers: headers,
          ...responseType,
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

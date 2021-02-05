import axios from "axios";

const service1 = axios.create({
  baseURL:
    "http://www.neowsapp.com/rest/v1/neo/browse?page=0&size=20&api_key=DEMO_KEY",
});

const service2 = axios.create({
  baseURL:
    "http://www.neowsapp.com/rest/v1/neo/browse?page=1&size=20&api_key=DEMO_KEY",
});

export default {
  service1,
  getNEOsOnPage0() {
    return service1.get("/");
  },
  service2,
  getNEOsOnPage1() {
    return service2.get("/");
  },
};

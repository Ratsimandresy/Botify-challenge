import axios from "axios"; // requiring axios from axios

//instaciating a service from axios.creat()
const service1 = axios.create({
  baseURL:
    "http://www.neowsapp.com/rest/v1/neo/browse?page=0&size=20&api_key=DEMO_KEY", // we neede to put 2 baseURL sending request simultaniously
});

const service2 = axios.create({
  baseURL:
    "http://www.neowsapp.com/rest/v1/neo/browse?page=1&size=20&api_key=DEMO_KEY",
});

//methdoes handling the requests to NASA's API
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

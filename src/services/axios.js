import axios from "axios";
import Cookies from "js-cookie";
import { goToLogin } from "../navigation";
import { IDENTITY as IDENTITY_ROUTES } from "../navigation/constants";

const axiosInstance = axios.create();

const urlExceptions = Object.values(IDENTITY_ROUTES);

const configAccessToken = (config, resolve, accessToken) => {
  config.headers.Authorization = "Bearer " + accessToken;
  return resolve(config);
};

const handleError = (config, resolve) => {
  goToLogin();
  if (resolve && config) {
    return resolve(config);
  }
  return;
};

const getCachedLocation = () => {
  const cachedLocation = sessionStorage.getItem("location");
  return cachedLocation ? JSON.parse(cachedLocation) : null;
};

axiosInstance.interceptors.request.use(async function (config) {
  return new Promise(async (resolve) => {
    // if request doesn't need auth
    if (urlExceptions.some((url) => window?.location?.href?.includes(url))) {
      return resolve(config);
    }

    const accessToken = Cookies.get("at");
    if (!accessToken) {
      return handleError(resolve);
    }

    const cachedLocation = getCachedLocation();
    if (cachedLocation) {
      // Use cached location
      config.headers["X-User-Longitude"] = cachedLocation.longitude;
      config.headers["X-User-Latitude"] = cachedLocation.latitude;
    } else {
      // Fetch location
      const position = await getLocation();
      const { longitude, latitude } = position.coords;
      // Store location in sessionStorage
      sessionStorage.setItem("location", JSON.stringify({ longitude, latitude }));
      // Use fetched location
      config.headers["X-User-Longitude"] = longitude;
      config.headers["X-User-Latitude"] = latitude;
    }

    return configAccessToken(config, resolve, accessToken);
  });
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000,
    });
  });
};

export default axiosInstance;

import axios from "axios";

export const useApi = () => {
  const api = axios.create({
    baseURL: '/api/', // Replace with your API base URL
    headers: {
      "Content-Type": "application/json", // Set the default Content-Type for all requests
      // Authorization: authHeader() ?? "", // Use the authorization token obtained from useAuthHeader()
    },
  });

  return api;
};


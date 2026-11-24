import { API_URL } from "../config";

const createRequest = async ({ method = "GET", params = {}, data } = {}) => {
  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );

  const options = { method };
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export default createRequest;

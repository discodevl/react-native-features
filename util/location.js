import axios from "axios";

const GEOPIFY_KEY = "42cab665041743c2b102907aa1a5c4bd";

export async function getAddress(lat, lng) {
  const response = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GEOPIFY_KEY}`
  );

  return response.data;

}

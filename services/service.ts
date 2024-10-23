import axios from "axios";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countryNames = response?.data?.map((c: any) => c.name.common);
    return countryNames;
  } catch (error) {
    console.error(error);
    return [];
  }
};
import { Country } from "../../types/country";

const BASE_URL = "https://restcountries.com/v3.1";

export const countriesAPI = {
  getAllCountries: async (): Promise<Country[]> => {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    return await response.json();
  },

  getCountryByCode: async (code: string): Promise<Country> => {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) {
      throw new Error("Failed to fetch country");
    }
    const data = await response.json();
    return data[0];
  },
};

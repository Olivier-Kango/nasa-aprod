import axios, { AxiosResponse } from 'axios';
import { Apod } from '../types/apodTypes';  // Import the Apod type

// Create an Axios instance with the base URL for the NASA API
const apiClient = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod',  // The base URL for the API requests
});

// Fetch all APODs from the API
export const fetchAllApods = async (): Promise<Apod> => {
  try {
    // Make a GET request to the APOD endpoint with the API key
    const response: AxiosResponse<Apod> = await apiClient.get('?api_key=DEMO_KEY');
    return response.data;
  } catch (e) {
    // Handle any errors that occur during the API request
    throw new Error(e instanceof Error ? e.message : String(e));
  }
};


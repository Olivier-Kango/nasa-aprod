import axios, { AxiosResponse } from 'axios';
import { Apod } from '../types/apodTypes';  // Import the Apod type

// Create an Axios instance with the base URL for the NASA API
const API_KEY = 'DEMO_KEY';
const apiClient = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod',  // The base URL for the API requests
});

// Fetch APODs from the API with flexible query parameters
export const fetchAllApods = async (startDate?: string, endDate?: string, count?: number, date?: string): Promise<Apod | Apod[]> => {
  try {
    
    let url = `?api_key=${API_KEY}`;
    if (date) {
      url += `&date=${date}`;
    } else {
      if (startDate) url += `&start_date=${startDate}`;
      if (endDate) url += `&end_date=${endDate}`;
      if (count) url += `&count=${count}`;
    }

    const response: AxiosResponse<Apod | Apod[]> = await apiClient.get(url);

    if (response.status === 429) {
      throw new Error('OVER_RATE_LIMIT');
    }

    return response.data;
  } catch (e) {
    // Handle any errors that occur during the API request
    throw new Error(e instanceof Error ? e.message : String(e));
  }
};


/**
 * Define the type for the APOD (Astronomy Picture of the Day) data
 */

export interface Apod {
  date: string;                // The date of the APOD
  explanation: string;       // A description of the APOD
  hdurl?: string;            // Optional field for the HD URL of the APOD image
  media_type: string;        // The type of media (image or video)
  service_version: string;   // The version of the API service
  title: string;             // The title of the APOD
  url: string;               // The URL for the APOD image or video
  copyright?: string;       // Optional field for the copyright of the APOD
}

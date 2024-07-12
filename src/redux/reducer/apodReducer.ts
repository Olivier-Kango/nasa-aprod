import { Actions } from '../constants/constants';
import { Apod } from '../../types/apodTypes';
import Image from '../../assets/images/background-img.jpg'

// Define the shape of the state
interface ApodState {
  apods: Apod | Apod[] | null;
  error: string | null;
}

// Define the initial state
const initialState: ApodState = {
  apods: null,
  error: null,
};

// Define the shape of the action
interface Action {
  type: string;
  payload?: Apod | Apod[] | string; // Payload can be Apod, Apod[], or string for error
}

// Define the reducer function with type annotations
const apodReducer = (state = initialState, action: Action): ApodState => {
  switch (action.type) {
    case Actions.GET_APODS:
      return {
        ...state,
        apods: action.payload as Apod | Apod[], // Cast payload to Apod or Apod[]
        error: null, // Clear any previous errors
      };

      case Actions.API_ERROR:
      return {
        ...state,
        error: action.payload as string, // Cast payload to string
        apods: null, // Clear APODs on error
      };
    default:
      return state;
  }
};

export default apodReducer;

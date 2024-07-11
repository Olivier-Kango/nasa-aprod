import { Actions } from '../constants/constants';
import { Apod } from '../../types/apodTypes';

// Define the shape of the state
interface ApodState {
  apods: Apod | null;
}

// Define the initial state
const initialState: ApodState = {
  apods: null,
};

// Define the shape of the action
interface Action {
  type: string;
  payload?: Apod; // Optional payload of type Apod
}

// Define the reducer function with type annotations
const apodReducer = (state = initialState, action: Action): ApodState => {
  switch (action.type) {
    case Actions.ALL_APODS:
      return {
        ...state,
        apods: action.payload || null, // Assignez directement payload à apods
      };
    default:
      return state;
  }
};

export default apodReducer;

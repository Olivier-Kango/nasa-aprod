import { Actions } from '../constants/constants';
import { fetchAllApods } from '../../api/api';
import { Apod } from '../../types/apodTypes';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store'; 

type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

// Action creator for fetching APODs with flexible query parameters
export const getApods = (startDate?: string, endDate?: string, count?: number, date?: string): AppThunk => async (dispatch) => {
  try {
    const apods: Apod | Apod[] = await fetchAllApods(startDate, endDate, count, date);
    dispatch({ type: Actions.GET_APODS, payload: apods });
  } catch (error) {
    console.error('Failed to fetch APOD:', error);
    
    // Check if error is an instance of Error
    if (error instanceof Error) {
      dispatch({
        type: Actions.API_ERROR,
        payload: (error.message).includes('429') ? 
          '🚨 You have exceeded the rate limit. Please try again later. 🙏' :
          (error.message).includes('400') ? 
          '🔄 Your request seems to be malformed. Please verify the parameters and try again.' :
          (error.message).includes('401') ? 
          '🔒 Unauthorized request. Please check your credentials and try again.' :
          (error.message).includes('404') ? 
          '🔍 The requested resource could not be found. Please check the URL and try again.' :
          (error.message).includes('500') ? 
          '😣 Something went wrong on our end. Please try again later. 😣' :
          (error.message).includes('403') ? 
          '🚫 Access denied. You do not have permission to view this resource. 🚫' :
          error.message
      });
    } else {
      dispatch({ type: Actions.API_ERROR, payload: 'An unknown error occurred' });
    }
  }
};

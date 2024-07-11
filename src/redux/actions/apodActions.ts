import { Actions } from '../constants/constants';
import { fetchAllApods } from '../../api/api';
import { Apod } from '../../types/apodTypes';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store'; 

type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

// Action creator for fetching all APODs
export const allApods = (): AppThunk => async (dispatch) => {
  try {
    const apods: Apod = await fetchAllApods();
    dispatch({ type: Actions.ALL_APODS, payload: apods });
  } catch (error) {
    console.error('Failed to fetch APOD:', error);
  }
};

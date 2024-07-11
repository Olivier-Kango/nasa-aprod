import secureLocalStorage from 'react-secure-storage';
import { RootState } from '../redux/store';

const KEY = 'resp';

// Function to load the state from secure local storage
export const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = secureLocalStorage.getItem(KEY) as string | null;
    if (!serializedState) return undefined;
    const state = JSON.parse(serializedState) as Partial<RootState>;

    return {
      apods: state.apods,
    };
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

// Function to save the state to secure local storage
export const saveState = async (state: Partial<RootState>): Promise<void> => {
  try {
    const serializedState = JSON.stringify(state);
    secureLocalStorage.setItem(KEY, serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Event listener to remove the state from secure local storage on specific routes
window.addEventListener('beforeunload', () => {
  if (
    window.location.href.includes('/signup')
    || window.location.href.includes('/login')
  ) {
    secureLocalStorage.removeItem(KEY);
  }
});

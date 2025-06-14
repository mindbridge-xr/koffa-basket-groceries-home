
import { Chef } from '@/types/chef';

export const useChefStorage = () => {
  const getStoredChefData = () => {
    const storedIsChef = localStorage.getItem('isChef');
    const storedChefProfile = localStorage.getItem('chefProfile');
    
    return {
      isChef: storedIsChef === 'true',
      chefProfile: storedChefProfile ? JSON.parse(storedChefProfile) : null
    };
  };

  const saveChefData = (isChef: boolean, chefProfile: Chef | null) => {
    localStorage.setItem('isChef', isChef.toString());
    if (chefProfile) {
      localStorage.setItem('chefProfile', JSON.stringify(chefProfile));
    } else {
      localStorage.removeItem('chefProfile');
    }
  };

  return {
    getStoredChefData,
    saveChefData
  };
};

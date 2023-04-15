import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { authUser } = useSelector((state) => state);

  return useMemo(() => (Boolean(authUser)), [authUser]);
};

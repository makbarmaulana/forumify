import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { authUser } = useSelector((state) => state);

  return useMemo(() => (Boolean(authUser)), [authUser]);
};

export default useAuth;

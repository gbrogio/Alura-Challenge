import { useContext } from 'react';
import { UserConfigProps } from 'types';
import AuthContext from '../context/AuthContext';

const useAuth = () => useContext(AuthContext) as UserConfigProps;

export default useAuth;

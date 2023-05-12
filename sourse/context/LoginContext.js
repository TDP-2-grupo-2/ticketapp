
import {createContext} from 'react';

export const LoginContext = createContext(
{authenticated: {},
setAuthenticated: (auth) => {auth}}
);
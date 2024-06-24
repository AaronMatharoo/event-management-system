import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

//create auth context
const AuthContext = createContext(null);

//create auth provider component
const AuthProvider = ({ children }) => {
  //init token with value from localStorage
  const [token, setToken_] = useState(localStorage.getItem("token"));
  //init user state
  const [user, setUser] = useState(null);

  //set token and decode user from token
  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      // decode token to get user data
      const decodedToken = jwtDecode(newToken);
      //set user
      setUser(decodedToken);
    } else {
      //clear state if token is null
      setUser(null);
    }
  };

  ///update localStorage if token changes, similar to above
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  //memoize context value, avoid rerenders
  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
    }),
    [token, user]
  );

  //provide context value to children components (app)
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//custom auth hook to use authContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

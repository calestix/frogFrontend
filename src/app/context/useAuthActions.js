// hooks/useAuthActions.js
import { UserAuth } from "./auth.context";

export const useAuthActions = () => {
  const { login } = UserAuth();

  const LoginSave = async (response, type) => {
    const userData = { ...response.data };
    const token = response.accessToken;

    login(userData); // Updates context state

    if (type === "1") {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } else if (type === "2") {
      sessionStorage.setItem("userData", JSON.stringify(userData));
      sessionStorage.setItem("token", token);
    }
  };

  const LogOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    login(null);
    window.location.href="/"    
  };

  return { LoginSave, LogOut };
};

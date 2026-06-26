import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const [persist] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      }
      catch (err) {
        console.error(err);
      }
      finally {
        if (isMounted) setIsLoading(false);
      }
    }
    
    if (!auth?.accessToken || !auth.roles) {
      verifyRefreshToken();
    } 
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading])

  return (
    <>
      {!persist 
        ? <Outlet />
        : isLoading
          ? <p> </p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin;
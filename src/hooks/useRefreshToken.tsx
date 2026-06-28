import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = () => {
    return fetch('https://moegirlwiki-backend.onrender.com/api/refresh', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to refresh token');
      return res.json();
    })
    .then(data => {
      setAuth(prev => {
        console.log("Previous Auth State:", prev);
        return {
          ...prev,
          user: data.user,
          roles: data.roles,
          accessToken: data.accessToken,
        }
      });
      console.log(auth);
      return data.accessToken;
    })
    .catch(err => {
      console.error(err.messsage);
    })
  };

  return refresh;

}

export default useRefreshToken;
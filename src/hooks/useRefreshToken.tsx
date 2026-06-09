import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = () => {
    fetch('/api/refresh', {
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
        console.log(JSON.stringify(prev));
        console.log(data.accessToken);
        return { 
          ...prev,
          user: data.user,
          roles: data.roles,
          accessToken: data.accessToken,
        };
      });
      return data.accessToken;
    })
    .catch(err => {
      console.error(err.messsage);
    })
  };

  return refresh;

}

export default useRefreshToken;
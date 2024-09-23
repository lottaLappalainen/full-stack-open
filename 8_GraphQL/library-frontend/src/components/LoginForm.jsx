import { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN, GET_USER } from '../queries'; 

const LoginForm = ({ show, setToken, setUserInfo }) => {  
  if (!show) {
    return null;
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [getUser] = useLazyQuery(GET_USER);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
      getUser().then((response) => {
        if (response.data) {
          setUserInfo(response.data.me); 
        }
      }); 

    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;

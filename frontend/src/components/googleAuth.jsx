import { useState } from 'react'
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { client } from '../client';

const Auth = () => {
  const [user, setUser] = useState({
    name: "",
    avatarUrl: "",
    type: "user",
    _id: ""
  })
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleSuccess({ tokenResponse }),
    onError: () => console.log("Error")
  });
  async function handleSuccess(data) {
    try {
      console.log(data)
      let res = await axios(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${data.tokenResponse.access_token}`)
      console.log(res)
      setUser({
        name: res.data.given_name,
        avatarUrl: res.data.picture,
        _id: res.data.sub
      })
    } catch (err) {
      console.log(err.message)
    }
  }
  client.createIfNotExists(user).then(() => {
    navigate('/', { replace: true });
  })
  return (
    <div className="App">
      <button
        type="button"
        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
        onClick={() => login()}>
        Sign in with Google {' '}
      </button>
    </div>
  )
};

export default Auth;

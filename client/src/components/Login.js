import React,{useState} from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onUsernameChange = (e) =>{
    setUsername(e.target.value);
  }
  const onPasswordChange = (e) =>{
    setPassword(e.target.value);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    const credentials = {
      username: username,
      password: password
    }

    axios.post('http://localhost:5000/api/login', credentials)
      .then((response)=>{
        console.log(response);
        localStorage.setItem("token", response.data.payload);
        props.history.push('/bubbles')
      })
      .catch((error)=>{
        console.log(error);
      })

  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input name="username" placeholder="Username" value={username} onChange={onUsernameChange}/>
        <input name="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
        <button onClick={onSubmit}>Login</button>
      </form>
    </>
  );
};

export default Login;

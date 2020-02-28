import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {

  const [login, setLogin] = useState({ username: '', password: ''});

  const handleChanges = event => {
    setLogin({...login, [event.target.name]: event.target.value});
    console.log('handleChanges', event.target.name, event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:5000/api/login`, { username: 'Lambda School', password: 'i<3Lambd4'})
    .then(response => {
      localStorage.setItem('token', response.data.payload)
      props.history.push('/bubblepage')
      console.log('win login', response.data)
    })
    .catch(error => console.log('lose login', error))
    setLogin({ username: '', password: ''})
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='formContainer'>
      <h1>yo, it's bublz</h1>
       <form onSubmit={handleSubmit} className='loginForm'>
          <label className='loginLabel' >Username:</label>
          <input
            type='text'
            name='username'
            placeholder='username'
            className='loginInput'
            value={login.username}
            onChange={handleChanges}
          />
          <label className='loginLabel' >Password:</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            className='loginInput'
            width={6}
            value={login.password}
            onChange={handleChanges} />
        <button type='submit' className='loginButton'>log in</button>
      </form>
    </div>
  );
};

export default Login;

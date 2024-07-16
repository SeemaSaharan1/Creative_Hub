import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgvideo from '../img/Welcome (1).mp4'

const Register = () => {
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let imgUrl = ''; 
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/userImage', formData);
        imgUrl = res.data; // Get uploaded image URL
        
      }

      // Add imgUrl to inputs object
      const updatedInputs = { ...inputs, img: imgUrl };

      // Make registration request with updatedInputs
      await axios.post('auth/register', updatedInputs);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="background">
      <video src={bgvideo} autoPlay loop muted className="video-bg" />
      
      <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default Register;

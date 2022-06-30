import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoaddingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // Redirect
    count === 0 && navigate('/login');
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div  style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <div>
        <h1>Please login before use : redirect in <span style={{ fontWeight: 'bold', color: 'red' }}>{count}</span></h1>
      </div>
    </div>
  );
};

export default LoaddingToRedirect;

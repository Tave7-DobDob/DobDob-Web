import AppRouter from './Router';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedin, setIsLoggedin]=useState(true);
  useEffect(()=>{
    //로그인 확인
  })
  return (
    <AppRouter isLoggedin={isLoggedin}/>
  );
}

export default App;

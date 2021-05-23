import AppRouter from './Router';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedin, setIsLoggedin]=useState(false);
  const [isSetting, setIsSetting]=useState(false);
  useEffect(()=>{
    //로그인 확인
    //초기설정 확인
  })
  return (<>
    <AppRouter isLoggedin={isLoggedin} isSetting={isSetting}/>
    <footer><span>dobdob 2021 footer</span></footer></>
  );
}

export default App;

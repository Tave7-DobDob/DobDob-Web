import LoginMain from '../component/Login/LoginMain';
import LoginSub from '../component/Login/LoginSub';
import RandingView from '../component/Login/RandingView';
import '../styleSheets/login.css';
const Login = () => {
    return (<>
        <div className="Container login">
            <header><img src="logo3.png" width="80px" /></header>
            <LoginMain />
            <RandingView />
            <LoginSub />
        </div>
    </>)
}

export default Login;
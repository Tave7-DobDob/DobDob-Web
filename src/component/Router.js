import REACT from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../routes/Login';
import Main from '../routes/Main';
import Post from '../routes/Post';
import Posting from '../routes/Posting';
import Setting from '../routes/Setting.js';
import Profile from '../routes/Profile';

const AppRouter = ({ isLoggedin, isSetting, userObj, setIsSetting }) => {
    return (<Router>
        <Switch>
            {!isLoggedin ? <Route exact path="/">
                <Login/>
            </Route> : <>
                {!isSetting ?
                    <Route exact path="/">
                        <Setting setIsSetting={setIsSetting}/>
                    </Route>: 
                    <>
                        <Route exact path="/" >
                            <Main userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj}/>
                        </Route>
                        <Route exact path="/posting">
                            <Posting userObj={userObj}/>
                        </Route>
                        <Route exact path="/post">
                            <Post userObj={userObj}/>
                        </Route>
                    </>}
            </>}
        </Switch>
    </Router>)
}
export default AppRouter;
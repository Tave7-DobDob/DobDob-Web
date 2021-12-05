import REACT from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../routes/Login';
import Main from '../routes/Main';
import Post from '../routes/Post';
import Posting from '../routes/Posting';
import Setting from '../routes/Setting.js';
import Profile from '../routes/Profile';

const AppRouter = ({ isLoggedin, isSetting }) => {
    return (<Router>
        <Switch>
            {!isLoggedin ? <Route exact path="/">
                <Login/>
            </Route> : <>
                {!isSetting ?
                    <Route exact path="/">
                        <Setting/>
                    </Route>: 
                    <>
                        <Route exact path="/" >
                            <Main />
                        </Route>
                        <Route exact path="/profile">
                            <Profile/>
                        </Route>
                        <Route exact path="/posting">
                            <Posting />
                        </Route>
                        <Route exact path="/post">
                            <Post />
                        </Route>
                    </>}
            </>}
        </Switch>
    </Router>)
}
export default AppRouter;
import REACT from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../routes/Login';
import Main from '../routes/Main';
import Mypage from '../routes/Mypage';
import Post from '../routes/Post';
import Posting from '../routes/Posting';
import Setting from '../routes/Setting.js';

const AppRouter=({isLoggedin, isSetting})=>{
    return(<Router>
        <Switch>
            
            
                <Route exact path="/main" >
                    <Main />
                    </Route>
                <Route exact path="/mypage" component={Mypage}/> 
                <Route exact path="/posting" component={Posting}/>
                
                <Route exact path="/post" component={Post}/>
                <Route exact path="/" component={Login}/>
                <Route exact path="/setting" component={Setting}/>
            
        </Switch>
    </Router>)
}
export default AppRouter;
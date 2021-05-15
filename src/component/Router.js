import REACT from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../routes/Login';
import Main from '../routes/Main';
import Mypage from '../routes/Mypage';
import Posting from '../routes/Posting';

const AppRouter=({isLoggedin})=>{
    return(<Router>
        <Switch>
            {isLoggedin?<>
                <Route exact path="/" component={Main}/>
                <Route exact path="/mypage" component={Mypage}/> 
                <Route exact path="/posting" component={Posting}/>
                
            </>:<>
                <Route exact path="/" component={Login}/>
            </>}
        </Switch>
    </Router>)
}
export default AppRouter;
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Login from "../routes/Login.jsx";
import Main from "../routes/Main.jsx";
import Post from "../routes/Post.jsx";
import Posting from "../routes/Posting.jsx";
import Profile from "../routes/Profile.jsx";
import Setting from "../routes/Setting.jsx";

const AppRouter = ({ isLoggedin, isSetting, userObj }) => {
  return (
    <Router>
      <Switch>
        {!isLoggedin ? (
          <Route exact path="/">
            <Login />
          </Route>
        ) : (
          <>
            {!isSetting ? (
              <Route exact path="/">
                <Setting userObj={userObj} />
              </Route>
            ) : (
              <>
                <Route exact path="/">
                  <Main />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route exact path="/posting">
                  <Posting />
                </Route>
                <Route exact path="/post">
                  <Post />
                </Route>
              </>
            )}
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;

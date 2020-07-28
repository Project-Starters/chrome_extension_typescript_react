import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Switch } from "react-router";
import { Home } from "app/containers/Home";
import { Login } from "app/containers/Auth/Login";
import { AuthedRoute, UnauthedRoute } from 'app/components/RouterGuards';


console.log("APP")

export const App = hot(({ history }: any) => {
  console.log("HISTORY", history)
  return <Router history={history}>
    <Switch>
      <UnauthedRoute path="/login" exact component={Login} />
      <AuthedRoute path="/" exact component={Home}/>
    </Switch>
  </Router>
});
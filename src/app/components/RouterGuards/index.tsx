import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { inject, observer } from "mobx-react";
import { AUTH_STORE } from "app/constants";
import { AuthStore } from "app/stores";

export interface AuthedRouteProps extends RouteProps {
}

export interface AuthedRouteState {
}

@inject(AUTH_STORE)
@observer
export class AuthedRoute extends React.Component<AuthedRouteProps, AuthedRouteState> {
  constructor(props: AuthedRouteProps, context: any) {
    super(props, context);
    this.state = {};
  }
  render() {
    const store = this.props[AUTH_STORE] as AuthStore
    if(store.loading){
      return <div>Loading</div>
    }else{
      if (store.isLoggedIn) {
        return (<Route {...this.props} />)
      } else {
        console.log("TEST?")
        return (
          <Route
            render={rProps =>
              { console.log(rProps)
                return <Redirect
                to={`/login?redirect=${rProps.location.pathname}${
                  rProps.location.search
                  }`}
              />
            }

            }
          />
        )
      }
    }

  }
}

export interface UnauthedRouteProps extends RouteProps {
}

export interface UnauthedRouteState {

}
@inject(AUTH_STORE)
@observer
export class UnauthedRoute extends React.Component<UnauthedRouteProps, UnauthedRouteState> {
    private store: AuthStore
    constructor(props: UnauthedRouteProps, context: any) {
        super(props, context);
        this.state = {};
        this.store = props[AUTH_STORE]
    }

    render() {
        if (this.store.isLoggedIn) {
            return <Redirect to="/app"/>
        } else {
            return (
                <Route {...this.props} />
            );

        }
    }
}
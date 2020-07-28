import * as React from 'react';
import * as style from './style.scss';
import { AUTH_STORE, GLOBAL_STATE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { AuthStore, GlobalStateStore } from 'app/stores';

export interface LoginProps {
}

export interface LoginState {
    error: string
}

@inject(AUTH_STORE)
@observer
export class Login extends React.Component<LoginProps, LoginState> {
    store: AuthStore
    constructor(props: LoginProps, context: any) {
        super(props, context);
        this.state = {
            error: ""
        };
        this.store = props[AUTH_STORE]
    }

    render() {
        const { handleUserSignIn, email, password, onChange } = this.store
        return (
            <div>
                <h1>Log In</h1>
                <label>
                    Email
                <input name="email" type="email" placeholder="Email" value={email} onChange={onChange("email")} />
                </label>
                <label>
                    Password
                <input name="password" type="password" placeholder="Password" value={password} onChange={onChange("password")} />
                </label>
                <button onClick={handleUserSignIn}>Log In</button>
                <p>
                    {this.store.error}
                </p>
            </div>
        );
    }
}

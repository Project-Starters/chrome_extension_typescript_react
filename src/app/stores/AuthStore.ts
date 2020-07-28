import { observable, action } from 'mobx';
import app from 'app/firebase/base';
import firebase from 'firebase/app';
import { RouterStore } from 'app/stores';

export class AuthStore {
    @observable public isLoggedIn: boolean;
    @observable public loading: boolean;
    @observable public user?: any;

    @observable email: string
    @observable password: string

    @observable error: string

    constructor(private routerStore: RouterStore) {
        this.isLoggedIn = false;
        this.loading = true;
        this.isLoggedIn = false;

        this.email = ""
        this.password = ""
        this.error = ""
        
        app.auth().onAuthStateChanged(user => {
            console.log("USER", user)
            if (user) {
                // User is signed in.
                this.isLoggedIn = true;
                this.user = user;
                this.routerStore.push('/')
            } else {
                // User is signed out.
                this.isLoggedIn = false;
                this.routerStore.push('/login')
            }
            this.loading = false;
        });
    }


    onChange = (name: string) => {
        return (e) => {
            this[name] = e.target.value
        }
    }

    handleUserSignIn = async () => {
        await this.handleSignIn(this.email, this.password)
    }

    @action
    handleSignIn(email: string, password: string) {
        return new Promise((res, rej) => {
            app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                    app.auth().signInWithEmailAndPassword(email, password).then((event) => {
                        console.log("login", event);
                        this.user = event.user
                        this.isLoggedIn = true;
                        res()
                    }).catch((error) => {
                        console.error(error)
                        this.error=error.message
                        rej(error.message)
                    });
                }).catch((error) => {
                    console.log(error);
                    this.error=error.message
                    rej(error)
                })
        })
    }
}


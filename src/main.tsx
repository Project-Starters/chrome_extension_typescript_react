import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createStores } from 'app/stores';
import { App } from 'app';
import { createMemoryHistory } from 'history'

// prepare MobX stores
const history = createMemoryHistory()
const rootStore = createStores(history);



console.log("MAIN")

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);




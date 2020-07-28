import { GlobalStateStore } from './GlobalStateStore';
import { GLOBAL_STATE, AUTH_STORE, ROUTER_STORE } from 'app/constants';
import { History } from 'history';

import { RouterStore, AuthStore } from 'app/stores';

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  const globalStateStore = new GlobalStateStore();
  const authStore = new AuthStore(routerStore);
  
  return {
    [GLOBAL_STATE]: globalStateStore,
    [AUTH_STORE]: authStore,
    [ROUTER_STORE] : routerStore
  };
}

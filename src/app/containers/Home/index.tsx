import * as React from 'react';
import * as style from './style.scss';
import { GLOBAL_STATE } from 'app/constants';
import { GlobalStateStore } from 'app/stores';
import { observer, inject } from 'mobx-react';

export interface HomeProps {
}

export interface HomeState {
}

@inject(GLOBAL_STATE)
@observer
export class Home extends React.Component<HomeProps, HomeState> {
  store: GlobalStateStore
  constructor(props: HomeProps, context: any) {
    super(props, context);
    this.state = {
    };
    this.store = props[GLOBAL_STATE]
  }
  render() {
    return (
      <div className={style.test}>
        Home
      </div>
    );
  }
}

import { Action } from '@ngrx/store';


export type State = {
};

const initialState: State = {
};

export default function (state = initialState, action: Action): State {
  switch (action.type) {
    default: return state;
  }
}

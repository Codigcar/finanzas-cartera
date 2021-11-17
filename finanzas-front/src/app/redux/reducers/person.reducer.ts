import { Action, createReducer, on } from '@ngrx/store';
import {
  setPersonAction,
  setPersonProviderAction,
} from '../actions/person.actions';
import { setPersonProductTypeAction, setPersonProductAction } from '../actions/person.actions';
import { IUser } from '../interface/user.interface';

export interface State {
  user: IUser | null;
  selectedProvider: any | null;
  selectedProductType: number | null;
  selectedProduct: any | null;
}

export const initialState: State = {
  user: null,
  selectedProvider: null,
  selectedProductType: 1,
  selectedProduct: null
};

const _personReducer = createReducer(
  initialState,

  on(setPersonAction, (state, { person }) => ({
    ...state,
    user: { ...person },
  })),

  on(setPersonProviderAction, (state, { selectedProvider }) => ({
    ...state,
    selectedProvider: { ...selectedProvider },
  })),

  on(setPersonProductTypeAction, (state, { selectedProductType }) => ({
    ...state,
    selectedProductType: selectedProductType,
  })),

  on(setPersonProductAction, (state, { selectedProduct }) => ({
    ...state,
    selectedProduct: { ...selectedProduct },
  })),
);

export function personReducer(state: State | undefined, action: Action) {
  return _personReducer(state, action);
}

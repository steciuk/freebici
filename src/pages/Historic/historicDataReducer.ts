import {
  HistoricValenbiciData,
  StaticValenbiciData,
} from 'src/pages/Historic/types';

export enum HistoricDataActionType {
  FETCHING = 'FETCHING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface HistoricDataState {
  readonly loading: boolean;
  readonly data: HistoricData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly errors?: any;
}

export interface HistoricData {
  historic: HistoricValenbiciData;
  static: StaticValenbiciData;
}

export interface HistoricDataActionSuccess {
  type: HistoricDataActionType.SUCCESS;
  payload: HistoricData;
}

export interface HistoricDataActionError {
  type: HistoricDataActionType.ERROR;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface HistoricDataActionFetch {
  type: HistoricDataActionType.FETCHING;
}

export type HistoricDataAction =
  | HistoricDataActionSuccess
  | HistoricDataActionError
  | HistoricDataActionFetch;

export const historicDataReducer = (
  state: HistoricDataState,
  action: HistoricDataAction
): HistoricDataState => {
  switch (action.type) {
    case HistoricDataActionType.FETCHING:
      return {
        ...state,
        loading: true,
      };
    case HistoricDataActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case HistoricDataActionType.ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

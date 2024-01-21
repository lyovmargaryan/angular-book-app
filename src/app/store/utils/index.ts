import {
  FeatureKeyScope,
  ActionScope,
  createFeatureKeyCurried,
  createActionTypeCurried
} from './internal';

export enum CallState {
  Init = 'INIT',
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Processing = 'PROCESSING',
  Processed = 'PROCESSED',
  Error = 'ERROR'
}

export const createDomainFeatureKey = createFeatureKeyCurried(
  FeatureKeyScope.Domain
);
export const createFeatureFeatureKey = createFeatureKeyCurried(
  FeatureKeyScope.Feature
);
export const createSectionFeatureKey = createFeatureKeyCurried(
  FeatureKeyScope.Feature
);

export const createDomainActionType = createActionTypeCurried(
  ActionScope.Domain
);
export const createFeatureActionType = createActionTypeCurried(
  ActionScope.Feature
);
export const createSectionActionType = createActionTypeCurried(
  ActionScope.Section
);

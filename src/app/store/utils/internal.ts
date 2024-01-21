export enum FeatureKeyScope {
  Domain = 'domain',
  Feature = 'feature',
  Section = 'section'
}

export enum ActionScope {
  Domain = 'Domain',
  Feature = 'Feature',
  Section = 'Section'
}

export function createFeatureKeyCurried<S extends FeatureKeyScope>(scope: S) {
  return function createFeatureKey<F extends string>(
    featureName: F
  ): `[${S}][${F}]` {
    return `[${scope}][${featureName}]`;
  };
}

export function createActionTypeCurried<S extends ActionScope>(scope: S) {
  return function createActionType<F extends string>(
    featureName: F
  ): `[${S}][${F}]:` {
    return `[${scope}][${featureName}]:`;
  };
}

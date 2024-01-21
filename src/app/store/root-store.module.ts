import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ROOT_REDUCERS } from './reducers';
import { rootMetaReducers } from './meta-reducers';
import { rootEffects } from './effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '@env/environment.dev';

const StoreDevtools = environment.production
  ? []
  : [
    StoreDevtoolsModule.instrument({
      name: 'book-store',
      maxAge: 25
    })
  ];

@NgModule({
  imports: [
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers: environment.production ? undefined : rootMetaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
        strictStateSerializability: false
      }
    }),
    StoreRouterConnectingModule.forRoot({}),
    EffectsModule.forRoot(rootEffects),
    MatSnackBarModule,
    ...StoreDevtools
  ]
})
export class RootStoreModule {}

import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import {BookContainerComponent} from "../features/book-container/book-container.component";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {bookPageEffects, bookFeature, authorFeature, authorEffects} from "@app/libs/books/features/state";
import {BookListComponent} from "@app/libs/books/features/book-list/book-list.component";

export const BookFeatureRoutes: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(bookFeature),
        StoreModule.forFeature(authorFeature),
        EffectsModule.forFeature(bookPageEffects),
        EffectsModule.forFeature(authorEffects)
      )
    ],
    component: BookContainerComponent,
  },
  {
    path: ':id',
    component: BookListComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

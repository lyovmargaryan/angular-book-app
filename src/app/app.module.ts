import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RootStoreModule} from "@app/store/root-store.module";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Toasty} from "@app/libs/shared/toasty/toasty.enum";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RootStoreModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        panelClass: Toasty.Info,
        duration: 3000
      } as MatSnackBarConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

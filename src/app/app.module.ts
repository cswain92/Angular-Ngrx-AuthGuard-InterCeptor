import { AuthGuardService } from './services/auth-guard.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonComponent } from './json/json.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { UserComponent } from './user/user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { FormsModule } from '@angular/forms';

import { reducer} from './user.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { reducer1 } from './store/reducers/auth.reducers';
import { ErrorInterceptor, TokenInterceptor } from './services/token.interceptor';
import { StatusComponent } from './components/status/status.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    JsonComponent,
    UserComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    // StoreModule.forRoot(reducers, { metaReducers }),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({user: reducer, auth: reducer1}),
    EffectsModule.forRoot([UserEffects, AuthEffects])
  ],
  providers: [DataService,
    AuthGuard,
     {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

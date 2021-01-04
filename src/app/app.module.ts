import { APIStaticService } from './services/api.static.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';
import { RegistrationCheckpointComponent } from './features/registration-checkpoint/registration-checkpoint.component';
import { RegistrationStepComponent } from './features/registration-step/registration-step.component';
import { RegistrationCompanyComponent } from './features/registration-company/registration-company.component';
import { RegistrationUserComponent } from './features/registration-user/registration-user.component';
import { RegistrationUserAccountComponent } from './features/registration-user-account/registration-user-account.component';
import { RegistrationConfirmationComponent } from './features/registration-confirmation/registration-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APIBackendService } from './services/api-backend.service';
import { NotificationService } from './services/notification.service';
import { ConfigurationService } from './services/configuration.service';
import { AppConfiguration } from './services/app.configuration';
import { CanProceedRegistration } from './services/registration.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrivacyPolicyComponent,
    RegistrationCheckpointComponent,
    RegistrationStepComponent,
    RegistrationCompanyComponent,
    RegistrationUserComponent,
    RegistrationUserAccountComponent,
    RegistrationConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ 
    CanProceedRegistration,
    NotificationService,
    APIBackendService,
    ConfigurationService,
    AppConfiguration,
    {
      provide:APP_INITIALIZER,
      useFactory:(config:AppConfiguration)=>()=>config.initialiaze(),
      deps:[AppConfiguration],
      multi:true
    },{
      provide:APIBackendService, useClass:APIStaticService,
      deps:[HttpClient,NotificationService]
    }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

import { APP_ID, APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app/services/appConfig.service';
import { AppConfig } from './app/models/AppConfig';

if (environment.production) {
  enableProdMode();
}

const appInitializerFn = (appConfigService: AppConfigService) => {
  return () => {
    return Promise.all([appConfigService.loadAppConfig()]);
  };
};

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      deps: [AppConfigService],
      multi: true
    },
    importProvidersFrom(IonicModule.forRoot({}), HttpClientModule),

    provideRouter(routes),
  ]
});

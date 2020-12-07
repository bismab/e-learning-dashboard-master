import { SharedModule } from 'app/shared/shared.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppErrorHandler } from 'core/handlers/app-error-handler';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BlankComponent } from './layouts/blank/blank.component';
import { HttpRequestLoaderInterceptor } from 'core/interceptors/http-request-loader.interceptor';
import { EmailVerifyRedirectPageComponent } from './shared/email-verify-redirect-page/email-verify-redirect-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BlankComponent,
    EmailVerifyRedirectPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      // useHash: true
    }),
    SidebarModule,
    NavbarModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: "toast-bottom-right",
        // preventDuplicates: true,
        progressAnimation: "decreasing",
        progressBar: true,
        closeButton: true,
      }
    ),
    FooterModule,
    FixedPluginModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestLoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

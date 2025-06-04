import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { MockAuthService } from './services/mock-services/mock-auth.service';
import { VMService } from './services/vm.service';
import { MockVMService } from './services/mock-services/mock-vm.service';
import { ClusterService } from './services/cluster.service';
import { MockClusterService } from './services/mock-services/mock-cluster.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: AuthService,
      useClass: environment.useMocks ? MockAuthService : AuthService,
    },
    {
      provide: VMService,
      useClass: environment.useMocks ? MockVMService : VMService,
    },
    {
      provide: ClusterService,
      useClass: environment.useMocks ? MockClusterService : ClusterService,
    },
  ],
};

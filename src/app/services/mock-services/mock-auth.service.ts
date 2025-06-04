// src/app/mocks/mock-auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class MockAuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly CLUSTER_URL_KEY = 'clusterUrl';

  login(
    username: string,
    password: string,
    clusterUrl: string
  ): Observable<object> {
    if (username === 'user' && password === 'password') {
      const encoded = btoa(`${username}:${password}`);
      localStorage.setItem(this.TOKEN_KEY, encoded);
      localStorage.setItem(this.CLUSTER_URL_KEY, clusterUrl);
      return of({ message: 'Login successful', mock: true });
    } else {
      return throwError(() => new Error('Mock login failed'));
    }
  }

  getAuthHeaders(): any {
    const encoded = localStorage.getItem(this.TOKEN_KEY);
    return {
      Authorization: `Basic ${encoded}`,
    };
  }

  getClusterUrl(): string {
    return localStorage.getItem(this.CLUSTER_URL_KEY) || '';
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CLUSTER_URL_KEY);
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem(this.TOKEN_KEY) &&
      !!localStorage.getItem(this.CLUSTER_URL_KEY)
    );
  }
}

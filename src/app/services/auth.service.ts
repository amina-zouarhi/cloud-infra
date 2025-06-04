import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly CLUSTER_URL_KEY = 'clusterUrl';

  constructor(private readonly http: HttpClient) {}

  login(
    username: string,
    password: string,
    clusterUrl: string
  ): Observable<object> {
    const encoded = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${encoded}`,
    });

    return this.http.get(`${clusterUrl}/api/v3/vms`, { headers }).pipe(
      tap(() => {
        localStorage.setItem(this.TOKEN_KEY, encoded);
        localStorage.setItem(this.CLUSTER_URL_KEY, clusterUrl);
      })
    );
  }

  getAuthHeaders(): HttpHeaders {
    const encoded = localStorage.getItem(this.TOKEN_KEY);
    return new HttpHeaders({
      Authorization: `Basic ${encoded}`,
    });
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, ObservableInput} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CreateUserRequest } from '../models/create-user-request.model';
import { UserResponse } from '../models/user-response.model'


import { UserSearchRequest } from '../models/user-search.model';
import { UserSearchResponse } from '../models/user-search-response.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private createUrl = `${environment.apiUrl}/create`
  private searchUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  createUser(user: CreateUserRequest): Observable<UserResponse> {
    console.log('Creating user before sending:', user);

    return this.http.post<UserResponse>(this.createUrl, user).pipe(
      tap((createdUser) => {
        console.log('User created:', createdUser);
      }),
      catchError((error: any, caught: Observable<UserResponse>): ObservableInput<any> => {
        console.error('Error creating user:', error);
        throw error;
      })
    );
  }

  searchUsers(searchRequest: UserSearchRequest): Observable<UserSearchResponse> {
    console.log('Searching users:', searchRequest);

    return this.http.post<UserSearchResponse>(this.searchUrl, searchRequest).pipe(
      tap((response) => {
        console.log('Search result:', response);
      }),
      catchError((error: any): Observable<UserSearchResponse> => {
        console.error('Error searching users:', error);
        throw error;
      })
    );
  }
}

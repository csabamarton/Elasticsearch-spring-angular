import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, ObservableInput} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CreateUserRequest } from '../models/create-user-request.model';
import { UserResponse } from '../models/user-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private createUrl = `${environment.apiUrl}/create`;

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
}

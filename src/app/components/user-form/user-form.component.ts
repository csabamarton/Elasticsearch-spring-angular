import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CreateUserRequest } from '../../models/create-user-request.model';
import {UserResponse} from "../../models/user-response.model";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  user: CreateUserRequest = {
    firstName: '',
    lastName: '',
    email: ''
  };

  userCreated: UserResponse;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }

    this.user = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email
    };


    this.userService.createUser(this.user).subscribe(
      (createdUser) => {
        this.userCreated = createdUser;
        console.log('User created:', createdUser);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}

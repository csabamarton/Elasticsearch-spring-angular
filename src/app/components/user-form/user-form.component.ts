import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CreateUserRequest } from '../../models/create-user-request.model';
import { UserResponse } from '../../models/user-response.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userCreated: UserResponse;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  saveUser(): void {
    this.submitted = true;
    console.log("SaveUser Method was called");

    if (this.userForm.invalid) {
      return;
    }

    const user: CreateUserRequest = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email
    };

    this.userService.createUser(user).subscribe(
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

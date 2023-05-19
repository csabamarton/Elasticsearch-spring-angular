import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserSearchRequest } from '../../models/user-search.model';
import { UserSearchResponse } from '../../models/user-search-response.model';
import { trigger, state } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchForm: FormGroup;
  searchResult: UserSearchResponse;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  search(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const searchRequest: UserSearchRequest = {
      firstName: this.searchForm.value.firstName,
      lastName: this.searchForm.value.lastName
    };

    this.userService.searchUsers(searchRequest).subscribe(
      (response) => {
        this.searchResult = response;
      },
      (error) => {
        console.error('Error searching users:', error);
      }
    );
  }
}

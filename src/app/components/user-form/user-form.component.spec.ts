import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.userForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: ''
    });
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.userForm.patchValue({
      firstName: '',
      lastName: '',
      email: ''
    });
    expect(component.userForm.invalid).toBeTrue();
  });

  it('should mark the form as valid when all required fields are filled', () => {
    component.userForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
    expect(component.userForm.valid).toBeTrue();
  });

// Test the saveUser method
  it('should call userService.createUser when form is valid', () => {
    spyOn(userService, 'createUser').and.stub();
    component.userForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
    component.saveUser();
    expect(userService.createUser).toHaveBeenCalled();
  });

});

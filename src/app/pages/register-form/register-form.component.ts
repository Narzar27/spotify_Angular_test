import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
//imports for angular forms and validation

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  private fb = inject(FormBuilder); //fb is used to create reactive forms instead of new FormGroup()

  registerForm!: FormGroup; //holds your main form

  //here we are building the form using FormBuilder
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required, this.minAgeValidator(25)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+961|0)?(3|7|81|70|76|71)\d{6}$/),
        ],
      ],
      profilePicture: ['', Validators.required],
      stageName: [''],
      backstory: [''],
      startingDate: [''],
      albums: this.fb.array([]),
    });
  }

  // Custom age validator
  minAgeValidator(minAge: number) {
    return (control: AbstractControl) => {
      const dob = new Date(control.value);
      const age = new Date().getFullYear() - dob.getFullYear();
      return age >= minAge ? null : { minAge: true };
    };
  }
  //getter for albums
  get albums(): FormArray {
    return this.registerForm.get('albums') as FormArray;
  }
  //to add albums
  addAlbum(): void {
    const album = this.fb.group({
      picture: [''],
      date: [''],
      songs: this.fb.array([this.fb.group({ name: [''], duration: [''] })]),
    });
    this.albums.push(album);
  }

  //to remove albums
  removeAlbum(index: number): void {
    this.albums.removeAt(index);
  }

  getSongs(albumIndex: number): FormArray {
    return this.albums.at(albumIndex).get('songs') as FormArray;
  }

  addSong(albumIndex: number): void {
    this.getSongs(albumIndex).push(
      this.fb.group({ name: [''], duration: [''] })
    );
  }

  removeSong(albumIndex: number, songIndex: number): void {
    this.getSongs(albumIndex).removeAt(songIndex);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Model:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

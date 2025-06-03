import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface FormComponent {
  form: FormGroup;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<FormComponent> {
  canDeactivate(component: FormComponent): boolean {
    console.log('UnsavedChangesGuard running...');
    const isPristine = component.form.pristine;

    // Only ask for confirmation if there are unsaved changes
    if (!isPristine) {
      return confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
    }

    // Allow navigation if form is pristine
    return true;
  }
}

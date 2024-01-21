import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {
  transform(control: AbstractControl, controlName: string): string {
    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return `${controlName} is required`;
    }
    return 'Invalid field';
  }
}

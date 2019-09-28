import { FormControl } from '@angular/forms';

export function passEqualEmailValidator(control: FormControl) {
    const pass = control.value;
    if (pass === localStorage.getItem('emailUser')) {
        return {
          PassEqualEmail: {
            status: true
          }
        };
    }
    return null;
  }

import { FormGroup } from "@angular/forms";

export namespace helpers{
    export function isInvalid(form: FormGroup,inputName: string, validatorName: string){
        const formControl: any = form.get(inputName);
        if(formControl.errors !== null){
          return formControl.errors[validatorName] && formControl.touched;
        }
      }
}
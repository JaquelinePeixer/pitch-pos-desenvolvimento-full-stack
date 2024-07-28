import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function onlySpaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) null;

        let value = control.value;

        //se for um conteudo html
        if (/<\/?[a-z][\s\S]*>/i.test(value)) {
            value = value.replace(/<[^>]*>/g, '')
        }

        const isSpace = /^\s+$/.test(value);
        if (value && isSpace) {
            return { NOTONLYWHITESPACE: true }
        }

        return null
    }
}
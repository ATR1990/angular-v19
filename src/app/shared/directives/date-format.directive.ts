import {Directive} from '@angular/core'
import {MAT_DATE_FORMATS} from "@angular/material/core"

const MY_FORMAT = {
  parse: { dateInput: 'dd.MM.YYYY' },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Directive({
  selector: '[appDateFormat]',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMAT}
  ]
})

export class DateFormatDirective {}

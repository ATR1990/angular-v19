import {NgModule} from "@angular/core"
import {DatePipe} from "@angular/common"

import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core"
import {MatCardModule} from "@angular/material/card"
import {MatButtonModule} from "@angular/material/button"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatIconModule} from "@angular/material/icon"
import {MatTooltipModule} from "@angular/material/tooltip"
import {MatDialogModule} from "@angular/material/dialog"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatDatepickerModule} from "@angular/material/datepicker"
import {MatExpansionModule} from "@angular/material/expansion"

const sharedModules = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule
]

@NgModule({
  imports: [
    ...sharedModules
  ],
  exports: [
    ...sharedModules
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-Ru'},
    DatePipe
  ]
})

export class MaterialModule {}

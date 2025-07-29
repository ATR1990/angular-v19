import {NgModule} from "@angular/core"
import {ReactiveFormsModule} from "@angular/forms"

import {
  MaterialModule
} from "."

@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ]
})

export class SharedModule {}

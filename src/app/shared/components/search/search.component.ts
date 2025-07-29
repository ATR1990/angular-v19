import {Component, OnInit} from '@angular/core'
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms"

import {CarsService} from "@shared/services/cars.service"
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton
  ]
})

export class SearchComponent implements OnInit {
  filterForm!: UntypedFormGroup

  constructor(
    private carsService: CarsService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this._createForm()
  }

  private _createForm(): void {
    this.filterForm = this.fb.group({
      search: ''
    })
  }

  filterData(): void {
    const data: any = this.filterForm.getRawValue()
    this.carsService.search$.next(data.search)
  }

  resetFilter(): void {
    this.filterForm.reset()
    this.carsService.search$.next('')
  }

}

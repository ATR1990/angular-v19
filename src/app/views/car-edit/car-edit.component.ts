import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core"
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Router} from "@angular/router"
import {DatePipe} from "@angular/common"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {DateFormatDirective} from '@shared/directives/date-format.directive';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatCardActions,
    MatButton,
    DateFormatDirective
  ],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarEditComponent implements OnInit, OnDestroy {
  list: string[] = ['Acceleration', 'Currency', 'Cylinders', 'Displacement', 'Horsepower', 'Miles_per_Gallon', 'Name', 'Origin', 'Price', 'Weight_in_lbs', 'Year']
  id: any
  format: string = 'yyyy-MM-dd'
  form!: UntypedFormGroup
  minDate!: Date
  private _unsubscribe$ = new Subject()

  constructor(
    private carsService: CarsService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this._createForm()
    this._getCar()
  }

  private _controlsConfig(keyList: string[], value: any[]): object {
    const map = new Map(keyList.map(key => ([key, value])))
    return Object.fromEntries(map)
  }

  private _createForm(): void {
    this.form = this.fb.group(this._controlsConfig(this.list, [null, [Validators.required]]))
  }

  private _setValues(car: CarInterface): void {
    this.list.forEach(key => this.form.controls[key].setValue(car[key]))
  }

  private _getCar(): void {
    this.id = this.route.snapshot.params?.['id']

    if (this.id) {
      this.carsService.getCar(this.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((car: CarInterface) => this._setValues(car))
    }
  }

  private _editCar(dto: CarInterface): void {
    this.carsService.editCar(dto)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this.goToMainPage())
  }

  save(): void {
    const dto: any = this.form.getRawValue()
    dto.id = +this.id

    if (dto.Year) {
      dto.Year = this.datePipe.transform(dto.Year, this.format)
    }

    this._editCar(dto)
  }

  goToMainPage(): void {
    this.router?.navigate(['/'])
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}

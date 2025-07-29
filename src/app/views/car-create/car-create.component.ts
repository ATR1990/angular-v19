import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core"
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms"
import {DatePipe} from "@angular/common"
import {Router} from "@angular/router"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {DateFormatDirective} from '@shared/directives/date-format.directive';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatCardActions,
    MatButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    DateFormatDirective,
    MatDatepickerModule
  ],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarCreateComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup
  minDate!: Date
  format: string = 'yyyy-MM-dd'
  private _unsubscribe$ = new Subject()

  constructor(
    private carsService: CarsService,
    private datePipe: DatePipe,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this._createForm()
  }

  private _createForm(): void {
    this.form = this.fb.group({
      Acceleration: [null, [Validators.required]],
      Currency: ['', [Validators.required]],
      Cylinders: [null, [Validators.required]],
      Displacement: [null, [Validators.required]],
      Horsepower: [null, [
        Validators.required,
        Validators.min(1)
      ]],
      Miles_per_Gallon: [null, [Validators.required]],
      Name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      Origin: ['', [Validators.required]],
      Price: [null, [Validators.required]],
      Weight_in_lbs: [null, [Validators.required]],
      Year: [null, [Validators.required]]
    })
  }

  private _createCar(dto: CarInterface): void {
    this.carsService.createCar(dto)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this.goToMainPage())
  }

  save(): void {
    const dto: any = this.form.getRawValue()
    if (dto.Year) {
      dto.Year = this.datePipe.transform(dto.Year, this.format)
    }

    this._createCar(dto)
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.controls[controlName];

    if (control.hasError('required')) {
      return 'Поле обязательно для заполнения';
    }

    if (control.hasError('min')) {
      return 'Значение не может быть меньше 1';
    }

    if (control.hasError('minlength') || control.hasError('maxlength')) {
      return 'Длина должна быть от 3 до 50 символов';
    }

    return '';
  }

  resetFilter(): void {
    this.form.reset()
  }

  goToMainPage(): void {
    this.router?.navigate(['/'])
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }
}

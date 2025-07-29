import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from "@angular/router"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"
import { ChangeDetectorRef } from '@angular/core';

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';
import {DatePipe, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-car-detailed',
  templateUrl: './car-detailed.component.html',
  styleUrls: ['./car-detailed.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    TitleCasePipe,
    MatCardActions,
    MatButton,
    DatePipe,
    MatCardImage,
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarDetailedComponent implements OnInit, OnDestroy {
  car!: CarInterface;
  id: any
  private _unsubscribe$ = new Subject()

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._getCar()
  }

  private _getCar() {
    this.id = this.route.snapshot.params?.['id'];

    if (this.id) {
      this.carsService.getCar(this.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((car: CarInterface) => {
          this.car = car
          this.cdr.detectChanges();
        })
    }
  }

  goToMainPage() {
    this.router?.navigate(['/'])
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from "@angular/router"
import {takeUntil} from "rxjs/operators"
import {Subject} from "rxjs"

import {CarInterface} from "@shared/models/car.interface"
import {CarsService} from "@shared/services/cars.service"
import {CommonModule} from '@angular/common';
import {CarComponent} from '@views/car/car.component';
import {MatIcon} from '@angular/material/icon';
import {SearchComponent} from '@shared/components/search/search.component';
import {MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';


@Component({
  selector: 'app-cars',
  imports: [CommonModule, SearchComponent, CarComponent, MatIcon, MatMiniFabButton, MatTooltip],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarsComponent implements OnInit, OnDestroy {
  cars: CarInterface[] = [];
  private _unsubscribe$ = new Subject()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private carsService: CarsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._getAllCars()
    this._autoRefresh()
    this._search()
  }

  private _getAllCars(q?: string): void {
    this.carsService.getAllCars(q)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((cars: CarInterface[]) => {
        this.cars = cars.reverse()
        this.changeDetectorRef.markForCheck()
      })
  }

  private _autoRefresh(): void {
    this.carsService.refresh$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => this._getAllCars())
  }

  private _search(): void {
    this.carsService.search$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(data => {
        console.log('_search: ', data)
        this._getAllCars(data)
      })
  }

  trackByFn(index: number, car: CarInterface): number {
    return car.id
  }

  createCar(): void {
    this.router?.navigate(['/create'])
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}

import {Injectable} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Observable, Subject} from "rxjs"

import {CarInterface} from "@shared/models/car.interface"
import {GET_CARS_LIST} from "@shared/constants/url"

@Injectable({
  providedIn: 'root'
})

export class CarsService {
  refresh$ = new Subject<void>()
  search$ = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  getAllCars(q?: any): Observable<CarInterface[]> {
    const url = q ? `${GET_CARS_LIST}?q=${q}` : GET_CARS_LIST
    return this.http.get<CarInterface[]>(url)
  }

  getCar(id: number): Observable<CarInterface> {
    return this.http.get<CarInterface>(`${GET_CARS_LIST}/${id}`)
  }

  createCar(dto: CarInterface): Observable<CarInterface> {
    return this.http.post<CarInterface>(GET_CARS_LIST, dto)
  }

  editCar(dto: CarInterface): Observable<CarInterface> {
    return this.http.put<CarInterface>(`${GET_CARS_LIST}/${dto.id}`, dto)
  }

  deleteCar(id: number): Observable<CarInterface> {
    return this.http.delete<CarInterface>(`${GET_CARS_LIST}/${id}`)
  }

}

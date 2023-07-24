import { type DataCarsController } from '../types/interfaces';
import { getRandomName, getRandomColor } from './car-utilities';
import TableController from '../table_manager/table-controller';
import CarQueries from './car-queries';
import CarTracks from './car-tracks';

export default class CarsController extends CarTracks implements DataCarsController {
  static currentPage: number = 1;

  static message: string = 'MESSAGE';

  static textUpdater: string = '';

  static colorUpdater: string = '#AAFFFF';

  static totalCars: string | null;

  static cars = CarsController.getCars();

  static drawNextPage(): void {
    if (Number(CarsController.totalCars) / 7 > CarsController.currentPage) {
      CarsController.currentPage += 1;
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
      CarsController.setPageCarInfo();
    }
  }

  static drawPrevPage(): void {
    if (CarsController.currentPage > 1) {
      CarsController.currentPage -= 1;
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
      CarsController.setPageCarInfo();
    }
  }

  static writeMessage(string: string): void {
    const message = document.querySelector('.message') as Element;
    CarsController.message = string;
    message.innerHTML = CarsController.message;
  }

  static setPageCarInfo(): void {
    const buttonCars = document.querySelector('[button = cars]') as Element;
    const buttonPage = document.querySelector('[button = page]') as Element;
    const name = document.querySelector('.text-car-updater') as HTMLInputElement;
    const color = document.querySelector('.color-car-updater') as HTMLInputElement;
    const message = document.querySelector('.message') as Element;
    buttonPage.innerHTML = `PAGE ${CarsController.currentPage}`;
    buttonCars.innerHTML = `CARS ${CarsController.totalCars}`;
    name.value = CarsController.textUpdater;
    color.value = CarsController.colorUpdater;
    message.innerHTML = CarsController.message;
  }

  static async getCars(): Promise<CarTracks[]> {
    const arrCarTracks: Array<CarTracks> = [];
    const response = await CarQueries.getCarsOnPage(this.currentPage);
    const data = await response.json();

    CarsController.totalCars = response.headers.get('x-total-count');
    CarsController.setPageCarInfo();

    data.forEach((value: { name: string; color: string; id: number }) => {
      arrCarTracks.push(new CarTracks(value.name, value.color, value.id));
    });

    return arrCarTracks;
  }

  static async drawCars(): Promise<void> {
    const racePlace = document.querySelector('.race-place') as Element;
    racePlace.replaceChildren();

    CarsController.setPageCarInfo();

    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => {
      racePlace.append(car.carTrack);
    });
  }

  static async generateCars(): Promise<void> {
    const randomCarArr: Array<Promise<Response>> = [];
    for (let i = 1; i <= 100; i += 1) {
      randomCarArr.push(CarQueries.createCar(getRandomName(), getRandomColor()));
    }
    await Promise.all(randomCarArr);
    CarsController.writeMessage('100 RANDOM CARS ARE CREATED');
    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
  }

  static async createCar(): Promise<void> {
    const name = document.querySelector('.text-car-creator') as HTMLInputElement;
    const color = document.querySelector('.color-car-creator') as HTMLInputElement;
    const carName = name.value ? name.value : getRandomName();
    await CarQueries.createCar(carName, color.value);
    CarsController.writeMessage('CAR HAS BEEN CREATED');
    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
  }

  static async updateCar(): Promise<void> {
    const name = document.querySelector('.text-car-updater') as HTMLInputElement;
    const color = document.querySelector('.color-car-updater') as HTMLInputElement;
    if (CarTracks.currentTrack === undefined) {
      CarsController.writeMessage('CHOOSE CAR FOR UPDATING');
      return;
    }

    await CarQueries.updateCar(CarTracks.currentTrack, name.value, color.value);

    CarsController.textUpdater = name.value;
    CarsController.colorUpdater = color.value;

    CarsController.writeMessage('CAR HAS BEEN UPDATED');
    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
  }

  static async removeCar(event: Event): Promise<void> {
    const target = event.target as Element;
    if (target.matches('[button = delete]')) {
      const id = target.parentElement?.parentElement?.getAttribute('id') as string;

      await CarQueries.removeCar(id);
      await TableController.deleteWinner(id);

      CarsController.writeMessage('CAR HAS BEEN REMOVED');
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
    }
  }

  static async startRace(): Promise<void> {
    CarsController.writeMessage('RACE TIME!');
    const body = document.querySelector('.body') as HTMLElement;
    const resetButton = document.querySelector('[button = reset]') as HTMLElement;
    body.style.pointerEvents = 'none';
    resetButton.style.pointerEvents = 'none';
    const carsReady = await CarsController.cars;
    const arr: Array<Promise<CarTracks>> = [];
    carsReady.forEach((car) => arr.push(car.startCarEngine(false)));
    try {
      const promise = await Promise.any(arr);
      console.log(arr);
      const currentWinTime = Number((promise.driveTime / 1000).toFixed(2));
      const winnerData = await TableController.getWinner(promise.carId);
      if (winnerData.time === undefined) {
        TableController.createWinner(promise.carId, currentWinTime);
      } else if (winnerData.time < currentWinTime) {
        TableController.updateWinner(winnerData.id, winnerData.wins, winnerData.time);
      } else {
        TableController.updateWinner(winnerData.id, winnerData.wins, currentWinTime);
      }
      CarsController.writeMessage(`${promise.carName} HAS WON! TIME: ${currentWinTime}`);
      await Promise.allSettled(arr);
      resetButton.style.pointerEvents = 'auto';
    } catch {
      CarsController.writeMessage('All ENGINES ARE BROKEN DOWN!!!');
    }
  }

  static async resetRace(): Promise<void> {
    const body = document.querySelector('.body') as HTMLElement;
    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => car.stopCarEngine());
    CarsController.writeMessage('READY FOR NEW RACE!');
    body.style.pointerEvents = 'auto';
  }
}

CarsController.drawCars();

import { type DataCarsController } from './types/interfaces';
import CarTracks from './car-tracks';
import TableController from './table-controller';

export default class CarsController extends CarTracks implements DataCarsController {
  static baseUrl = 'http://localhost:3000';

  static currentPage: number = 1;

  static message: string = 'MESSAGE';

  static textUpdater: string = '';

  static colorUpdater: string = '#AAFFFF';

  static totalCars: string | null;

  static cars = CarsController.getCars();

  static async drawNextPage(): Promise<void> {
    if (Number(CarsController.totalCars) / 7 > CarsController.currentPage) {
      CarsController.currentPage += 1;
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
      CarsController.setPageCarInfo();
    }
  }

  static async drawPrevPage(): Promise<void> {
    if (CarsController.currentPage > 1) {
      CarsController.currentPage -= 1;
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
      CarsController.setPageCarInfo();
    }
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
    const carsOnPage = 7;
    const arrCarTracks: Array<CarTracks> = [];
    const queryString = `?_page=${this.currentPage}&_limit=${carsOnPage}`;
    const response = await fetch(`${this.baseUrl}/garage${queryString}`);
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

  static getRandomName(): string {
    const brand = ['Audi', 'Bently', 'BMW', 'Cherry', 'Shevrolet', 'Nissan', 'Lamborgini', 'Mazda', 'Opel', 'Volvo'];
    const models = ['A4', 'Azure', 'X5', 'Tiggo', 'Aveo', 'X-Trail', 'Aventador', 'CX-3', 'Astra', 'XC60'];
    return `${brand[Math.floor(Math.random() * 10)]} ${models[Math.floor(Math.random() * 10)]}`;
  }

  static async generateCars(): Promise<void> {
    function getRandomColor(): string {
      const color: string[] = [];
      for (let i = 1; i <= 3; i += 1) {
        color.push(`0${Math.floor(Math.random() * 256).toString(16)}`.slice(-2));
      }
      return `#${color.join('')}`;
    }
    const randomCarArr: Array<Promise<Response>> = [];

    for (let i = 1; i <= 100; i += 1) {
      randomCarArr.push(CarsController.createRandomCar(CarsController.getRandomName(), getRandomColor()));
    }

    await Promise.all(randomCarArr);

    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();

    CarsController.message = '100 RANDOM CARS ARE CREATED';
    CarsController.setPageCarInfo();
  }

  static async createRandomCar(name: string, color: string): Promise<Response> {
    const addRandomCar = await fetch(`${CarsController.baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });
    return addRandomCar;
  }

  static async createCar(): Promise<void> {
    const name = document.querySelector('.text-car-creator') as HTMLInputElement;
    const color = document.querySelector('.color-car-creator') as HTMLInputElement;
    let carName = name.value;
    if (name.value === '') {
      carName = CarsController.getRandomName();
      CarsController.message = 'RANDOM CAR IS CREATED';
      CarsController.setPageCarInfo();
    }

    await fetch(`${CarsController.baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: carName, color: color.value }),
    });

    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
  }

  static async updateCar(): Promise<void> {
    const name = document.querySelector('.text-car-updater') as HTMLInputElement;
    const color = document.querySelector('.color-car-updater') as HTMLInputElement;
    if (CarTracks.currentTrack === undefined) {
      CarsController.message = 'CHOOSE CAR FOR UPDATING';
      CarsController.setPageCarInfo();
      return;
    }

    await fetch(`${CarsController.baseUrl}/garage/${CarTracks.currentTrack}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, color: color.value }),
    });

    CarsController.textUpdater = name.value;
    CarsController.colorUpdater = color.value;

    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
  }

  static async removeCar(event: Event): Promise<void> {
    const target = event.target as Element;
    if (target.matches('[button = delete]')) {
      const id = target.parentElement?.parentElement?.getAttribute('id') as string;

      await fetch(`${CarsController.baseUrl}/garage/${id}`, {
        method: 'DELETE',
      });

      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();

      TableController.deleteWinner(id);

      CarsController.message = 'CAR HAS BEEN REMOVED';
      CarsController.setPageCarInfo();
    }
  }

  static async startRace(): Promise<void> {
    const carsReady = await CarsController.cars;
    const arr: Array<Promise<CarTracks>> = [];
    carsReady.forEach((car) => arr.push(car.startCarEngine()));
    try {
      const promise = await Promise.any(arr);
      const winnerData = await TableController.getWinner(promise.carId);
      if (winnerData.time === undefined) {
        TableController.createWinner(promise.carId, Number((promise.driveTime / 1000).toFixed(2)));
      } else if (winnerData.time < promise.driveTime) {
        TableController.updateWinner(winnerData.id, winnerData.wins, winnerData.time);
      } else {
        TableController.updateWinner(winnerData.id, winnerData.wins, Number((promise.driveTime / 1000).toFixed(2)));
      }
    } catch {
      CarsController.message = 'All ENGINES ARE BROKEN DOWN!!!';
      CarsController.setPageCarInfo();
    }
  }

  static async resetRace(): Promise<void> {
    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => car.stopCarEngine());
  }
}

CarsController.drawCars();

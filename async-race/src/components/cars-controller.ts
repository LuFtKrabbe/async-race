import { type DataCarsController } from './types/interfaces';
import CarTracks from './car-tracks';
import TableController from './table-controller';

export default class CarsController extends CarTracks implements DataCarsController {
  static baseUrl = 'http://localhost:3000';

  static currentPage: number = 1;

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

  static async setPageCarInfo(): Promise<void> {
    const buttonCars = document.querySelector('[button = cars]') as Element;
    const buttonPage = document.querySelector('[button = page]') as Element;
    buttonPage.innerHTML = `PAGE ${CarsController.currentPage}`;
    buttonCars.innerHTML = `CARS ${CarsController.totalCars}`;
  }

  static async getCars(): Promise<CarTracks[]> {
    const arr: Array<CarTracks> = [];
    const response = await fetch(`${this.baseUrl}/garage?_page=${this.currentPage}&_limit=7`);
    const data = await response.json();

    CarsController.totalCars = response.headers.get('x-total-count');
    CarsController.setPageCarInfo();

    data.forEach((value: { name: string; color: string; id: number }) => {
      arr.push(new CarTracks(value.name, value.color, value.id));
    });

    return arr;
  }

  static async drawCars(): Promise<void> {
    const racePlace = document.querySelector('.race-place') as Element;
    racePlace.replaceChildren();

    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => {
      racePlace.append(car.carTrack);
    });
  }

  static async generateCars(): Promise<void> {
    const brand = ['Audi', 'Bently', 'BMW', 'Cherry', 'Shevrolet', 'Nissan', 'Lamborgini', 'Mazda', 'Opel', 'Volvo'];
    const models = ['A4', 'Azure', 'X5', 'Tiggo', 'Aveo', 'X-Trail', 'Aventador', 'CX-3', 'Astra', 'XC60'];

    function getRandomName(): string {
      return `${brand[Math.floor(Math.random() * 10)]} ${models[Math.floor(Math.random() * 10)]}`;
    }
    function getRandomColor(): string {
      const color: string[] = [];
      for (let i = 1; i <= 3; i += 1) {
        color.push(Math.floor(Math.random() * 256).toString(16));
      }
      return `#${color.join('')}`;
    }
    const randomCarArr: Array<Promise<Response>> = [];

    for (let i = 1; i <= 100; i += 1) {
      randomCarArr.push(CarsController.createRandomCar(getRandomName(), getRandomColor()));
    }

    await Promise.all(randomCarArr);

    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
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

    await fetch(`${CarsController.baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, color: color.value }),
    });

    CarsController.cars = CarsController.getCars();
    CarsController.drawCars();
  }

  static async updateCar(): Promise<void> {
    const name = document.querySelector('.text-car-updater') as HTMLInputElement;
    const color = document.querySelector('.color-car-updater') as HTMLInputElement;

    await fetch(`${CarsController.baseUrl}/garage/${CarTracks.currentTrack}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, color: color.value }),
    });

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
      console.log('All engines are broken down!!!');
    }
  }

  static async resetRace(): Promise<void> {
    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => car.stopCarEngine());
  }
}

const createButton = document.querySelector('[button = create]') as Element;
const updateButton = document.querySelector('[button = update]') as Element;
const raceButton = document.querySelector('[button = race]') as Element;
const resetButton = document.querySelector('[button = reset]') as Element;
const generateButton = document.querySelector('[button = generate]') as Element;
const prevButton = document.querySelector('[button = prev]') as Element;
const nextButton = document.querySelector('[button = next]') as Element;
const racePlace = document.querySelector('.race-place') as Element;

createButton.addEventListener('click', CarsController.createCar);
updateButton.addEventListener('click', CarsController.updateCar);
raceButton.addEventListener('click', CarsController.startRace);
resetButton.addEventListener('click', CarsController.resetRace);
generateButton.addEventListener('click', CarsController.generateCars);
prevButton.addEventListener('click', CarsController.drawPrevPage);
nextButton.addEventListener('click', CarsController.drawNextPage);
racePlace.addEventListener('click', CarsController.removeCar);

CarsController.drawCars();

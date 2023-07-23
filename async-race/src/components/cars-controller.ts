import { type DataCarsController } from './types/interfaces';
import CarTracks from './car-tracks';

export default class CarsController extends CarTracks implements DataCarsController {
  static baseUrl = 'http://localhost:3000';

  static currentTrack: number;

  static currentPage: number = 1;

  static totalCars: string | null;

  static cars = CarsController.getCars();

  static async drawNextPage(): Promise<void> {
    if (Number(CarsController.totalCars) / 7 > CarsController.currentPage) {
      CarsController.currentPage += 1;
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
    }
  }

  static async drawPrevPage(): Promise<void> {
    if (CarsController.currentPage > 1) {
      CarsController.currentPage -= 1;
      CarsController.cars = CarsController.getCars();
      CarsController.drawCars();
    }
  }

  static async getCars(): Promise<CarTracks[]> {
    const racePlace = document.querySelector('.race-place') as Element;
    const buttonCars = document.querySelector('[button = cars]') as Element;
    const buttonPage = document.querySelector('[button = page]') as Element;

    racePlace.replaceChildren();

    const response = await fetch(`${this.baseUrl}/garage?_page=${this.currentPage}&_limit=7`);
    const data = await response.json();

    CarsController.totalCars = response.headers.get('x-total-count');
    buttonPage.innerHTML = `PAGE ${CarsController.currentPage}`;
    buttonCars.innerHTML = `CARS ${CarsController.totalCars}`;

    const arr: Array<CarTracks> = [];

    data.forEach((value: { name: string; color: string; id: number }) => {
      const CarDrive = new CarTracks(value.name, value.color, value.id);
      arr.push(CarDrive);
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

    CarsController.drawCars();
  }

  static async updateCar(): Promise<void> {
    const name = document.querySelector('.text-car-updater') as HTMLInputElement;
    const color = document.querySelector('.color-car-updater') as HTMLInputElement;

    await fetch(`${CarsController.baseUrl}/garage/${CarsController.currentTrack}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, color: color.value }),
    });

    CarsController.drawCars();
  }

  static async removeCar(event: Event): Promise<void> {
    const target = event.target as Element;
    const id = target.parentElement?.parentElement?.getAttribute('id') as string;

    await fetch(`${CarsController.baseUrl}/garage/${id}`, {
      method: 'DELETE',
    });

    CarsController.drawCars();
  }

  static async startRace(): Promise<void> {
    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => car.startCarEngine());
  }

  static async resetRace(): Promise<void> {
    const carsReady = await CarsController.cars;
    carsReady.forEach((car) => car.stopCarEngine());
  }
}

const createButton = document.querySelector('[button = create]') as Element;
const updateButton = document.querySelector('[button = update]') as Element;
const prevButton = document.querySelector('[button = prev]') as Element;
const nextButton = document.querySelector('[button = next]') as Element;
const raceButton = document.querySelector('[button = race]') as Element;
const resetButton = document.querySelector('[button = reset]') as Element;

createButton.addEventListener('click', CarsController.createCar);
updateButton.addEventListener('click', CarsController.updateCar);
prevButton.addEventListener('click', CarsController.drawPrevPage);
nextButton.addEventListener('click', CarsController.drawNextPage);
raceButton.addEventListener('click', CarsController.startRace);
resetButton.addEventListener('click', CarsController.resetRace);

CarsController.drawCars();

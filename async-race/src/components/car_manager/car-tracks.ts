import { type DataCarTracks } from '../types/interfaces';
import elemHTMLClassAttr from '../utilities/functions';
import CarQueriesEngine from './car-queries-engine';
import Cars from './cars';

export default class CarTracks implements DataCarTracks {
  static currentTrack: number;

  static baseUrl = 'http://localhost:3000';

  carTrack: HTMLElement = elemHTMLClassAttr('car-track')();

  stopButton: HTMLElement = elemHTMLClassAttr('button-engine')('button', 'stop');

  startButton: HTMLElement = elemHTMLClassAttr('button-engine')('button', 'start');

  car: SVGSVGElement;

  carId: number;

  carName: string;

  carColor: string;

  driveTime: number;

  animationId: number;

  constructor(name: string, color: string, id: number) {
    this.car = new Cars(color).car;
    this.carId = id;
    this.carName = name;
    this.carColor = color;
    this.driveTime = 0;
    this.animationId = 0;
    this.createTrack();
  }

  createTrack(): void {
    const deleteButton = elemHTMLClassAttr('button-edit')('button', 'delete');
    deleteButton.innerHTML = '&#10060';
    const editButton = elemHTMLClassAttr('button-edit')('button', 'edit');
    editButton.innerHTML = '&#128396';
    editButton.addEventListener('click', this.setTrackForUpdate.bind(this));

    this.stopButton.addEventListener('click', this.stopCarEngine.bind(this));
    this.stopButton.classList.add('unactive');
    this.stopButton.style.pointerEvents = 'none';
    this.stopButton.innerHTML = 'S';

    this.startButton.addEventListener('click', this.startCarEngine.bind(this));
    this.startButton.innerHTML = 'GO';

    const carName = elemHTMLClassAttr('car-name')();
    carName.innerHTML = `${this.carName}`;

    const carEditor = elemHTMLClassAttr('car-editor')();
    const carController = elemHTMLClassAttr('car-controller')();
    const engineButtons = elemHTMLClassAttr('engine-buttons')();

    carEditor.append(deleteButton, editButton, carName);
    engineButtons.append(this.stopButton, this.startButton);

    carController.append(engineButtons);
    carController.append(this.car);

    this.carTrack.setAttribute('id', `${this.carId}`);
    this.carTrack.append(carEditor, carController);
  }

  setTrackForUpdate() {
    CarTracks.currentTrack = Number(this.carTrack.getAttribute('id'));
    const name = document.querySelector('.text-car-updater') as HTMLInputElement;
    const color = document.querySelector('.color-car-updater') as HTMLInputElement;
    name.value = this.carName;
    color.value = this.carColor;
  }

  async startCarEngine(): Promise<this> {
    this.stopButton.classList.remove('unactive');
    this.stopButton.style.pointerEvents = 'auto';
    this.startButton.classList.add('unactive');
    this.startButton.style.pointerEvents = 'none';

    const currentWidth = document.documentElement.clientWidth;
    const carWidth = 160;
    const carDistance = currentWidth - carWidth;

    const response = await CarQueriesEngine.startEngine(this.carId);
    const data = await response.json();
    this.driveTime = data.distance / data.velocity;
    const step = carDistance / this.driveTime;

    const startTime = performance.now();

    const myAnimation = (currentTime: number): void => {
      this.car.style.left = `${(currentTime - startTime) * step}px`;
      if (currentTime < startTime + this.driveTime) {
        this.animationId = requestAnimationFrame(myAnimation);
      }
    };
    this.animationId = requestAnimationFrame(myAnimation);

    try {
      const responseCar = await CarQueriesEngine.driveEngine(this.carId);
      await responseCar.json();
    } catch {
      cancelAnimationFrame(this.animationId);
      throw new Error();
    }
    return this;
  }

  async stopCarEngine(): Promise<void> {
    this.stopButton.classList.add('unactive');
    this.stopButton.style.pointerEvents = 'none';

    cancelAnimationFrame(this.animationId);
    await CarQueriesEngine.stopEngine(this.carId);

    this.car.style.left = `${0}px`;

    this.startButton.classList.remove('unactive');
    this.startButton.style.pointerEvents = 'auto';
  }
}

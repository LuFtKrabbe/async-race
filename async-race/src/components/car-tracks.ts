import { type DataCarTracks } from './types/interfaces';
import elemHTMLClassAttr from './utilities/functions';
import Cars from './cars';

export default class CarTracks implements DataCarTracks {
  static currentTrack: number;

  static baseUrl = 'http://localhost:3000';

  racePlace = document.querySelector('.race-place') as Element;

  carTrack: HTMLElement = elemHTMLClassAttr('car-track')();

  car: SVGSVGElement;

  carId: number;

  carName: string;

  driveTime: number = 0;

  animationId: number = 0;

  constructor(name: string, color: string, id: number) {
    this.car = new Cars(color).car;
    this.carId = id;
    this.carName = name;
    this.createTrack();
  }

  createTrack(): void {
    const deleteButton = elemHTMLClassAttr('button-edit')('button', 'delete');
    deleteButton.innerHTML = '&#10060';
    const editButton = elemHTMLClassAttr('button-edit')('button', 'edit');
    editButton.innerHTML = '&#128396';
    editButton.addEventListener('click', this.setTrackForUpdate.bind(this));
    const stopButton = elemHTMLClassAttr('button-engine')('button', 'stop');
    stopButton.addEventListener('click', this.stopCarEngine.bind(this));
    stopButton.innerHTML = 'S';
    const startButton = elemHTMLClassAttr('button-engine')('button', 'start');
    startButton.addEventListener('click', this.startCarEngine.bind(this));
    startButton.innerHTML = 'A';
    const carName = elemHTMLClassAttr('car-name')();
    carName.innerHTML = `${this.carName}`;

    const carEditor = elemHTMLClassAttr('car-editor')();
    const carController = elemHTMLClassAttr('car-controller')();
    const engineButtons = elemHTMLClassAttr('engine-buttons')();

    carEditor.append(deleteButton, editButton, carName);
    engineButtons.append(stopButton, startButton);

    carController.append(engineButtons);
    carController.append(this.car);

    this.carTrack.setAttribute('id', `${this.carId}`);
    this.carTrack.append(carEditor, carController);
  }

  setTrackForUpdate() {
    CarTracks.currentTrack = Number(this.carTrack.getAttribute('id'));
  }

  async startCarEngine(): Promise<this> {
    const carDistance = document.documentElement.clientWidth - 150;
    let carPostion = 0;

    const response = await fetch(`${CarTracks.baseUrl}/engine?id=${this.carId}&status=started`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);

    this.driveTime = data.distance / data.velocity;
    const startTime = performance.now();
    const step = carDistance / this.driveTime;

    const myAnimation = (currentTime: number): void => {
      carPostion = (currentTime - startTime) * step;
      this.car.style.left = `${carPostion}px`;
      if (currentTime < startTime + this.driveTime) {
        this.animationId = requestAnimationFrame(myAnimation);
      }
    };

    this.animationId = requestAnimationFrame(myAnimation);
    let dataDrive;
    try {
      const responseDrive = await fetch(`${CarTracks.baseUrl}/engine?id=${this.carId}&status=drive`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dataDrive = await responseDrive.json();
      console.log(dataDrive);
    } catch {
      cancelAnimationFrame(this.animationId);
      throw new Error();
    }
    return this;
  }

  async stopCarEngine(): Promise<void> {
    const response = await fetch(`${CarTracks.baseUrl}/engine?id=${this.carId}&status=stopped`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    cancelAnimationFrame(this.animationId);
    this.car.style.left = `${0}px`;
    console.log(data);
  }
}

import { type DataCarsController } from './types/interfaces';
import elemHTMLClassAttr from './utilities/functions';
import Cars from './cars';

export default class CarsController implements DataCarsController {
  static carsQuantity: number;

  carTrack: HTMLElement = elemHTMLClassAttr('car-track')();

  counter: number = 1;

  constructor() {
    this.counter += 1;
    this.createTrack();
  }

  async createTrack() {
    const deleteButton = elemHTMLClassAttr('button-edit')('button', 'delete');
    deleteButton.innerHTML = '&#10060';
    deleteButton.addEventListener('click', this.removeTrack.bind(this));
    const editButton = elemHTMLClassAttr('button-edit')('button', 'edit');
    editButton.innerHTML = '&#128396';
    const stopButton = elemHTMLClassAttr('button-engine')('button', 'start');
    stopButton.innerHTML = 'S';
    const startButton = elemHTMLClassAttr('button-engine')('button', 'stop');
    startButton.innerHTML = 'A';
    const carName = elemHTMLClassAttr('car-name')();
    carName.innerHTML = `${await CarsController.setName(this.counter)}`;

    const carEditor = elemHTMLClassAttr('car-editor')();
    const carController = elemHTMLClassAttr('car-controller')();
    const engineButtons = elemHTMLClassAttr('engine-buttons')();

    carEditor.append(deleteButton, editButton, carName);
    engineButtons.append(stopButton, startButton);

    carController.append(engineButtons);
    carController.append(new Cars().car);

    this.carTrack.append(carEditor, carController);
  }

  removeTrack() {
    this.carTrack.remove();
  }

  static async setName(counter: number): Promise<string> {
    const baseUrl = 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/garage/${counter}`);
    const data = await response.json();
    return data.name;
  }
}

const race = document.querySelector('.race-place') as Element;
race.append(new CarsController().carTrack);
race.append(new CarsController().carTrack);
race.append(new CarsController().carTrack);
race.append(new CarsController().carTrack);

/* function createCarUpdater() {
  const carUpdater = elemHTMLClassAttr('car-updater')();

  const inputBrandUpdater = elemHTMLClassAttr('text-car-updater', 'input')('placeholder', 'Type car brand...');
  inputBrandUpdater.setAttribute('type', 'text');
  inputBrandUpdater.setAttribute('size', '30');
  inputBrandUpdater.setAttribute('size', '16');

  const colorUpdater = elemHTMLClassAttr('color-car-updater', 'input')('type', 'color');
  colorUpdater.setAttribute('value', '#aaffff');

  const buttonUpdater = elemHTMLClassAttr('button')('button', 'update');
  buttonUpdater.innerHTML = 'UPDATE';

  carUpdater.append(inputBrandUpdater, colorUpdater, buttonUpdater);

  return carUpdater;
} */

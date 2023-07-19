import { type DataCars } from './types/interfaces';
import car from '../svg/car.svg';

export default class Cars implements DataCars {
  static carsQuantity: number;

  div: HTMLElement;

  car: SVGSVGElement;

  use: SVGUseElement;

  constructor() {
    this.div = document.createElement('div');
    this.div.classList.add('div');
    this.car = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.car.classList.add('car');
    this.div.append(this.car);
    this.use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    this.use.setAttributeNS(null, 'href', `${car}#old-auto`);
    this.car.append(this.use);
    this.car.style.fill = '#FF00FF';
  }

  createCar() {
    this.car.setAttribute('car', 'create');
  }
}

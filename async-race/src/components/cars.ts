import { type DataCars } from './types/interfaces';
import car from '../svg/car.svg';

export default class Cars implements DataCars {
  static carsQuantity: number;

  car: SVGSVGElement;

  use: SVGUseElement;

  constructor(color: string) {
    this.car = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.car.classList.add('car');
    this.use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    this.use.setAttributeNS(null, 'href', `${car}#old-auto`);
    this.car.append(this.use);
    this.car.style.fill = `${color}`;
  }

  createCar() {
    this.car.setAttribute('car', 'create');
  }
}

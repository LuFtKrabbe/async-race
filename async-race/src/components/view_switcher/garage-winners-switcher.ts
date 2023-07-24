import createGarageView from '../garage-view';
import createTableView from '../table-view';
import CarsController from '../car_manager/cars-controller';
import TableController from '../table-controller';
import addEventListenersGarage from './garage-listeners';
import addEventListenersTable from './table-listeners';

function switchGarageWinners(event: Event): void {
  const target = event.target as Element;
  const main = document.querySelector('.main');

  if (target.matches('.garage-button') && main !== null) {
    main.replaceChildren();
    createGarageView();
    addEventListenersGarage();
    CarsController.drawCars();
  }

  if (target.matches('.winners-button') && main !== null) {
    main.replaceChildren();
    createTableView();
    addEventListenersTable();
    TableController.getWinners();
    TableController.drawTable();
  }
}

const header = document.querySelector('.header') as Element;
header.addEventListener('click', switchGarageWinners);

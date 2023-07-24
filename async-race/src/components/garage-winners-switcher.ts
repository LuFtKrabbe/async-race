import createGarageView from './garage-view';
import createTableView from './table-view';
import CarsController from './cars-controller';
import TableController from './table-controller';

function switchGarageWinners(event: Event): void {
  const target = event.target as Element;
  const main = document.querySelector('.main');

  if (target.matches('.garage-button') && main !== null) {
    main.replaceChildren();
    createGarageView();
    CarsController.drawCars();

    const createButton = document.querySelector('[button = create]') as Element;
    const updateButton = document.querySelector('[button = update]') as Element;
    const prevButton = document.querySelector('[button = prev]') as Element;
    const nextButton = document.querySelector('[button = next]') as Element;
    const raceButton = document.querySelector('[button = race]') as Element;
    const resetButton = document.querySelector('[button = reset]') as Element;
    const racePlace = document.querySelector('.race-place') as Element;

    createButton.addEventListener('click', CarsController.createCar);
    updateButton.addEventListener('click', CarsController.updateCar);
    prevButton.addEventListener('click', CarsController.drawPrevPage);
    nextButton.addEventListener('click', CarsController.drawNextPage);
    raceButton.addEventListener('click', CarsController.startRace);
    resetButton.addEventListener('click', CarsController.resetRace);
    racePlace.addEventListener('click', CarsController.removeCar);
  }

  if (target.matches('.winners-button') && main !== null) {
    main.replaceChildren();
    createTableView();
    TableController.getWinners();
    TableController.drawTable();
    const prevButton = document.querySelector('[button-table = prev]') as Element;
    const nextButton = document.querySelector('[button-table = next]') as Element;

    prevButton.addEventListener('click', TableController.drawPrevPage);
    nextButton.addEventListener('click', TableController.drawNextPage);
  }
}

const header = document.querySelector('.header') as Element;
header.addEventListener('click', switchGarageWinners);

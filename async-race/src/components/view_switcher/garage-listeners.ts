import CarsController from '../car_manager/cars-controller';

export default function addEventListenersGarage() {
  const createButton = document.querySelector('[button = create]') as Element;
  const updateButton = document.querySelector('[button = update]') as Element;
  const generateButton = document.querySelector('[button = generate]') as Element;

  const raceButton = document.querySelector('[button = race]') as Element;
  const resetButton = document.querySelector('[button = reset]') as Element;

  const prevButton = document.querySelector('[button = prev]') as Element;
  const nextButton = document.querySelector('[button = next]') as Element;

  const racePlace = document.querySelector('.race-place') as Element;

  createButton.addEventListener('click', CarsController.createCar);
  updateButton.addEventListener('click', CarsController.updateCar);
  generateButton.addEventListener('click', CarsController.generateCars);

  raceButton.addEventListener('click', CarsController.startRace);
  resetButton.addEventListener('click', CarsController.resetRace);

  prevButton.addEventListener('click', CarsController.drawPrevPage);
  nextButton.addEventListener('click', CarsController.drawNextPage);

  racePlace.addEventListener('click', CarsController.removeCar);
}

addEventListenersGarage();

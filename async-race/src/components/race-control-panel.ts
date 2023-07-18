import elemHTMLClassAttr from './utilities/functions';

function createCarCreator() {
  const carCreator = elemHTMLClassAttr('car-creator')();

  const inputBrandCreator = elemHTMLClassAttr('text-car-creator', 'input')('placeholder', 'Type car brand...');
  inputBrandCreator.setAttribute('type', 'text');
  inputBrandCreator.setAttribute('size', '30');
  inputBrandCreator.setAttribute('size', '16');

  const colorCreator = elemHTMLClassAttr('color-car-creator', 'input')('type', 'color');
  colorCreator.setAttribute('value', '#aaffff');

  const buttonCreator = elemHTMLClassAttr('button')('button', 'create');
  buttonCreator.innerHTML = 'CREATE';

  carCreator.append(inputBrandCreator, colorCreator, buttonCreator);

  return carCreator;
}

function createRaceControllPanel() {
  const controllPanel = elemHTMLClassAttr('race-controll-panel')();

  const raceButton = elemHTMLClassAttr('button')('button', 'race');
  raceButton.innerHTML = 'RACE';
  const resetButton = elemHTMLClassAttr('button')('button', 'reset');
  resetButton.innerHTML = 'RESET';
  const randomCarsButton = elemHTMLClassAttr('button')('button', 'generate');
  randomCarsButton.innerHTML = 'GENERATE CARS';

  controllPanel.append(raceButton, resetButton, randomCarsButton);

  return controllPanel;
}

export default function createRaceController(): void {
  const main = document.querySelector('.main') as Element;

  const controllerPanelWrapper = elemHTMLClassAttr('controll-panel-wrapper')();
  main.append(controllerPanelWrapper);
  const controllerPanel = elemHTMLClassAttr('controll-panel')();
  controllerPanelWrapper.append(controllerPanel);

  const carCreator = createCarCreator();
  const raceControllPanel = createRaceControllPanel();

  controllerPanel.append(carCreator, raceControllPanel);
}

createRaceController();

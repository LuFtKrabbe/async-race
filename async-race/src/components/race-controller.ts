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

function createCarUpdater() {
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
}

function createControllPanel() {
  const controllPanel = elemHTMLClassAttr('controll-panel')();

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

  const controllerWrapper = elemHTMLClassAttr('controller-wrapper')();
  main.append(controllerWrapper);
  const controller = elemHTMLClassAttr('controller')();
  controllerWrapper.append(controller);

  const carCreator = createCarCreator();
  const carUpdater = createCarUpdater();
  const controllPanel = createControllPanel();

  controller.append(carCreator, carUpdater, controllPanel);
}

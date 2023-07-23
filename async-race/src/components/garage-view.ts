import elemHTMLClassAttr from './utilities/functions';

function createCarCreatorPanel(): HTMLElement {
  const carCreatorPanel = elemHTMLClassAttr('car-creator-panel')();

  const inputBrandCreator = elemHTMLClassAttr('text-car-creator', 'input')('placeholder', 'Type car brand...');
  inputBrandCreator.setAttribute('type', 'text');
  inputBrandCreator.setAttribute('size', '30');
  inputBrandCreator.setAttribute('size', '16');

  const colorCreator = elemHTMLClassAttr('color-car-creator', 'input')('type', 'color');
  colorCreator.setAttribute('value', '#aaffff');

  const createButton = elemHTMLClassAttr('button')('button', 'create');
  createButton.innerHTML = 'CREATE';

  carCreatorPanel.append(inputBrandCreator, colorCreator, createButton);

  return carCreatorPanel;
}

function createCarUpdaterPanel(): HTMLElement {
  const carUpdater = elemHTMLClassAttr('car-updater-panel')();

  const inputBrandUpdater = elemHTMLClassAttr('text-car-updater', 'input')('placeholder', 'Type car brand...');
  inputBrandUpdater.setAttribute('type', 'text');
  inputBrandUpdater.setAttribute('size', '30');
  inputBrandUpdater.setAttribute('size', '16');

  const colorUpdater = elemHTMLClassAttr('color-car-updater', 'input')('type', 'color');
  colorUpdater.setAttribute('value', '#aaffff');

  const updateButton = elemHTMLClassAttr('button')('button', 'update');
  updateButton.innerHTML = 'UPDATE';

  carUpdater.append(inputBrandUpdater, colorUpdater, updateButton);

  return carUpdater;
}

function createRaceControlPanel(): HTMLElement {
  const controllPanel = elemHTMLClassAttr('race-control-panel')();

  const raceButton = elemHTMLClassAttr('button')('button', 'race');
  raceButton.innerHTML = 'RACE';
  const resetButton = elemHTMLClassAttr('button')('button', 'reset');
  resetButton.innerHTML = 'RESET';
  const randomCarsButton = elemHTMLClassAttr('button')('button', 'generate');
  randomCarsButton.innerHTML = 'GENERATE CARS';

  controllPanel.append(raceButton, resetButton, randomCarsButton);

  return controllPanel;
}

function createInformationPanel(): HTMLElement {
  const informationPanel = elemHTMLClassAttr('information-panel')();

  const pageInfo = elemHTMLClassAttr('button')('button', 'page');
  pageInfo.innerHTML = 'PAGE: 1';
  const carInfo = elemHTMLClassAttr('button')('button', 'cars');
  carInfo.innerHTML = 'CARS: 1';

  informationPanel.append(pageInfo, carInfo);

  return informationPanel;
}

function createPaginationPanel(): HTMLElement {
  const paginationPanel = elemHTMLClassAttr('pagination-panel')();

  const prevButton = elemHTMLClassAttr('button')('button', 'prev');
  prevButton.innerHTML = 'PREVIOUS';
  const nextButton = elemHTMLClassAttr('button')('button', 'next');
  nextButton.innerHTML = 'NEXT';

  paginationPanel.append(prevButton, nextButton);

  return paginationPanel;
}

export default function createGarageView(): void {
  const main = document.querySelector('.main') as Element;

  const controlPanelWrapper = elemHTMLClassAttr('control-panel-wrapper')();
  main.append(controlPanelWrapper);
  const controlPanel = elemHTMLClassAttr('control-panel')();
  controlPanelWrapper.append(controlPanel);

  const carCreatorPanel = createCarCreatorPanel();
  const carUpdaterPanel = createCarUpdaterPanel();
  const raceControlPanel = createRaceControlPanel();
  const informationPanel = createInformationPanel();
  const paginationPanel = createPaginationPanel();

  controlPanel.append(carCreatorPanel, carUpdaterPanel, raceControlPanel, informationPanel, paginationPanel);

  const racePlaceWrapper = elemHTMLClassAttr('race-place-wrapper')();
  main.append(racePlaceWrapper);
  const racePlace = elemHTMLClassAttr('race-place')();
  racePlaceWrapper.append(racePlace);
}

createGarageView();

import elemHTMLClassAttr from './utilities/functions';

export default function createWinnersTable(): void {
  const main = document.querySelector('.main') as Element;

  const tableWrapper = elemHTMLClassAttr('table-wrapper')();
  main.append(tableWrapper);
  const table = elemHTMLClassAttr('table')();
  tableWrapper.append(table);
  const tableHeader = elemHTMLClassAttr('table-header')();
  table.append(tableHeader);

  const ordinalNumber = elemHTMLClassAttr('header-cell')('header', 'ordinal-number');
  ordinalNumber.innerText = '№';
  const carImage = elemHTMLClassAttr('header-cell')('header', 'car-image');
  carImage.innerText = 'Image';
  const carName = elemHTMLClassAttr('header-cell')('header', 'car-name');
  carName.innerText = 'Name';
  const winsNumber = elemHTMLClassAttr('header-cell')('header', 'wins-number');
  winsNumber.innerText = 'Wins';
  const bestTime = elemHTMLClassAttr('header-cell')('header', 'best-time');
  bestTime.innerText = 'Best time';

  tableHeader.append(ordinalNumber, carImage, carName, winsNumber, bestTime);
}

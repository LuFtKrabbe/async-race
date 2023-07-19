import elemHTMLClassAttr from './utilities/functions';

function createTableHeader(): void {
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

function createTablePagination() {
  const tableWrapper = document.querySelector('.table-wrapper') as Element;

  const tablePaginationInfo = elemHTMLClassAttr('table-pagination-info')();
  const tablePagination = elemHTMLClassAttr('table-pagination')();

  const tableCarInfo = elemHTMLClassAttr('text-table-pagination')('text', 'cars');
  tableCarInfo.innerHTML = 'WINNERS: 1';
  const tablePageInfo = elemHTMLClassAttr('text-table-pagination')('text', 'page');
  tablePageInfo.innerHTML = 'PAGE: 1';

  const tablePrevButton = elemHTMLClassAttr('button-table-pagination')('button', 'prev');
  tablePrevButton.innerHTML = 'PREVIOUS';
  const tableNextButton = elemHTMLClassAttr('button-table-pagination')('button', 'next');
  tableNextButton.innerHTML = 'NEXT';

  tablePagination.append(tablePrevButton, tableNextButton);
  tablePaginationInfo.append(tableCarInfo, tablePageInfo);
  tableWrapper.append(tablePaginationInfo, tablePagination);
}

export default function createTable() {
  createTableHeader();
  createTablePagination();
}

import elemHTMLClassAttr from './utilities/functions';

function createTableHeader(): HTMLElement {
  const tableHeader = elemHTMLClassAttr('table-header')();

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

  return tableHeader;
}

function createTableInformationPanel(): HTMLElement {
  const tableInformationPanel = elemHTMLClassAttr('table-information-panel')();

  const tableWinnersInfo = elemHTMLClassAttr('button-table')('button-table', 'winners');
  tableWinnersInfo.innerHTML = 'WINNERS: 1';
  const tablePageInfo = elemHTMLClassAttr('button-table')('button-table', 'page');
  tablePageInfo.innerHTML = 'PAGE: 1';

  tableInformationPanel.append(tableWinnersInfo, tablePageInfo);

  return tableInformationPanel;
}

function createTablePaginationPanel(): HTMLElement {
  const tablePagination = elemHTMLClassAttr('table-pagination-panel')();

  const tablePrevButton = elemHTMLClassAttr('button-table')('button-table', 'prev');
  tablePrevButton.innerHTML = 'PREVIOUS';
  const tableNextButton = elemHTMLClassAttr('button-table')('button-table', 'next');
  tableNextButton.innerHTML = 'NEXT';

  tablePagination.append(tablePrevButton, tableNextButton);

  return tablePagination;
}

export default function createTableView(): void {
  const main = document.querySelector('.main') as Element;

  const tableWrapper = elemHTMLClassAttr('table-wrapper')();
  main.append(tableWrapper);
  const table = elemHTMLClassAttr('table')();
  tableWrapper.append(table);

  const tableHeader = createTableHeader();
  const tableInformationPanel = createTableInformationPanel();
  const tablePaginationPanel = createTablePaginationPanel();

  table.append(tableHeader);
  tableWrapper.append(tableInformationPanel, tablePaginationPanel);
}

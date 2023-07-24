import elemHTMLClassAttr from './utilities/functions';

function createTableHeader(): HTMLElement {
  const tableHeader = elemHTMLClassAttr('table-header')();

  const ordinalNumber = elemHTMLClassAttr('header-cell')('header', 'ordinal-number');
  ordinalNumber.innerText = '№';
  const carImage = elemHTMLClassAttr('header-cell')('header', 'car-image');
  carImage.innerText = 'IMAGE';
  const carName = elemHTMLClassAttr('header-cell')('header', 'car-name');
  carName.innerText = 'NAME';
  const winsNumber = elemHTMLClassAttr('header-cell')('header', 'wins-number');
  winsNumber.innerHTML = 'WINS &#128269;';
  const bestTime = elemHTMLClassAttr('header-cell')('header', 'best-time');
  bestTime.innerHTML = 'BEST TIME &#128269;';

  tableHeader.append(ordinalNumber, carImage, carName, winsNumber, bestTime);

  return tableHeader;
}

function createTableInformationPanel(): HTMLElement {
  const tableInformationPanel = elemHTMLClassAttr('table-information-panel')();

  const tablePageInfo = elemHTMLClassAttr('button-table')('button-table', 'page');
  tablePageInfo.innerHTML = 'PAGE: 1';
  const tableWinnersInfo = elemHTMLClassAttr('button-table')('button-table', 'winners');
  tableWinnersInfo.innerHTML = 'WINNERS: 1';

  tableInformationPanel.append(tablePageInfo, tableWinnersInfo);

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
  const tableRows = elemHTMLClassAttr('table-rows')();
  const tableInformationPanel = createTableInformationPanel();
  const tablePaginationPanel = createTablePaginationPanel();

  table.append(tableHeader, tableRows);
  tableWrapper.append(tableInformationPanel, tablePaginationPanel);
}

import elemHTMLClassAttr from './utilities/functions';

export default function createWinnersTable(): void {
  const main = document.querySelector('.main') as Element;

  const tableWrapper = elemHTMLClassAttr('table-wrapper')();
  main.append(tableWrapper);
  const table = elemHTMLClassAttr('table')();
  tableWrapper.append(table);
  const tableHeader = elemHTMLClassAttr('table-header')();
  table.append(tableHeader);
}

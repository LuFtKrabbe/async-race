import elemHTMLClassAttr from './utilities/functions';
import Cars from './cars';
import { type DataTableRows } from './types/interfaces';

export default class TableRows implements DataTableRows {
  static currentTrack: number;

  static baseUrl = 'http://localhost:3000';

  table = document.querySelector('.table') as Element;

  tableRow: HTMLElement = elemHTMLClassAttr('table-row')();

  rowCar: SVGSVGElement = new Cars('#ffffff').car;

  rowId: number;

  rowWins: number;

  rowTime: number;

  rowNumber: number;

  constructor(id: number, wins: number, time: number, index: number) {
    this.rowId = id;
    this.rowWins = wins;
    this.rowTime = time;
    this.rowNumber = index + 1;
    this.createTableRow();
  }

  async createTableRow(): Promise<void> {
    const response = await fetch(`${TableRows.baseUrl}/garage/${this.rowId}`);
    const data = await response.json();
    this.rowCar.style.fill = `${data.color}`;

    const ordinalNumber = elemHTMLClassAttr('row-cell')('row', 'ordinal-number');
    ordinalNumber.innerText = `${this.rowNumber}`;
    const carImage = elemHTMLClassAttr('row-cell')('row', 'car-image');
    carImage.append(this.rowCar);
    const carName = elemHTMLClassAttr('row-cell')('row', 'car-name');
    carName.innerText = `${data.name}`;
    const winsNumber = elemHTMLClassAttr('row-cell')('row', 'wins-number');
    winsNumber.innerText = `${this.rowWins}`;
    const bestTime = elemHTMLClassAttr('row-cell')('row', 'best-time');
    bestTime.innerText = `${this.rowTime}`;

    this.tableRow.setAttribute('id', `${this.rowId}`);
    this.tableRow.append(ordinalNumber, carImage, carName, winsNumber, bestTime);
  }
}

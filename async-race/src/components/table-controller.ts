import { type DataTableController } from './types/interfaces';
import TableRows from './table-rows';

export default class TableController implements DataTableController {
  static baseUrl = 'http://localhost:3000';

  static totalWinners: string | null;

  static currentPage: number = 1;

  static pageWinners: number = 10;

  static sort: string = '';

  static winners = TableController.getWinners();

  static async getWinners(): Promise<TableRows[]> {
    const buttonPage: Element | null = document.querySelector('[button-table = page]');
    const buttonWinners: Element | null = document.querySelector('[button-table = winners]');

    const queryString = `?_page=${TableController.currentPage}&_limit=${TableController.pageWinners}&${TableController.sort}`;

    const response = await fetch(`${TableController.baseUrl}/winners${queryString}`);
    const data = await response.json();

    TableController.totalWinners = response.headers.get('x-total-count');

    if (buttonPage !== null && buttonWinners !== null) {
      buttonPage.innerHTML = `PAGE ${TableController.currentPage}`;
      buttonWinners.innerHTML = `WINNERS ${TableController.totalWinners}`;
    }

    const arr: Array<TableRows> = [];

    data.forEach((value: { id: number; wins: number; time: number }, index: number) => {
      arr.push(new TableRows(value.id, value.wins, value.time, index));
    });

    return arr;
  }

  static async drawTable(): Promise<void> {
    const tableRows = document.querySelector('.table-rows') as Element;
    tableRows.replaceChildren();

    const rowsReady = await TableController.winners;
    rowsReady.forEach((winner) => {
      tableRows.append(winner.tableRow);
    });
  }

  static async drawNextPage(): Promise<void> {
    if (Number(TableController.totalWinners) / TableController.pageWinners > TableController.currentPage) {
      TableController.currentPage += 1;
      TableController.winners = TableController.getWinners();
      TableController.drawTable();
    }
  }

  static async drawPrevPage(): Promise<void> {
    if (TableController.currentPage > 1) {
      TableController.currentPage -= 1;
      TableController.winners = TableController.getWinners();
      TableController.drawTable();
    }
  }

  static async getWinner(carId: number): Promise<{ id: number; wins: number; time: number }> {
    const response = await fetch(`${TableController.baseUrl}/winners/${carId}`);
    const data: { id: number; wins: number; time: number } = await response.json();

    return data;
  }

  static async createWinner(carId: number, driveTime: number): Promise<void> {
    await fetch(`${TableController.baseUrl}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: carId, wins: 1, time: driveTime }),
    });

    TableController.winners = TableController.getWinners();
  }

  static async updateWinner(carId: number, wins: number, driveTime: number): Promise<void> {
    await fetch(`${TableController.baseUrl}/winners/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: carId, wins: wins + 1, time: driveTime }),
    });

    TableController.winners = TableController.getWinners();
  }

  static async deleteWinner(carId: string): Promise<void> {
    await fetch(`${TableController.baseUrl}/winners/${carId}`, {
      method: 'DELETE',
    });
    TableController.winners = TableController.getWinners();
  }

  static async sortWins(): Promise<void> {
    if (TableController.sort === '_sort=wins&_order=ASC') {
      TableController.sort = '_sort=wins&_order=DESC';
    } else {
      TableController.sort = '_sort=wins&_order=ASC';
    }
    TableController.winners = TableController.getWinners();
    TableController.drawTable();
  }

  static async sortTime(): Promise<void> {
    if (TableController.sort === '_sort=time&_order=ASC') {
      TableController.sort = '_sort=time&_order=DESC';
    } else {
      TableController.sort = '_sort=time&_order=ASC';
    }
    TableController.winners = TableController.getWinners();
    TableController.drawTable();
  }
}

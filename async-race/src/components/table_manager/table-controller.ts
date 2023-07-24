import TableQueries from './table_queries';
import TableRows from './table-rows';

export default class TableController {
  static totalWinners: string | null;

  static currentPage: number = 1;

  static pageWinners: number = 10;

  static sort: string = '';

  static winners = TableController.getWinners();

  static async getWinners(): Promise<TableRows[]> {
    const buttonPage: Element | null = document.querySelector('[button-table = page]');
    const buttonWinners: Element | null = document.querySelector('[button-table = winners]');

    const response = await TableQueries.getWinnersOnPage(TableController.currentPage, TableController.sort);
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
    const response = await TableQueries.getWinner(carId);
    const data: { id: number; wins: number; time: number } = await response.json();

    return data;
  }

  static async createWinner(carId: number, driveTime: number): Promise<void> {
    await TableQueries.createWinner(carId, driveTime);
    TableController.winners = TableController.getWinners();
  }

  static async updateWinner(carId: number, wins: number, driveTime: number): Promise<void> {
    await TableQueries.updateWinner(carId, wins, driveTime);
    TableController.winners = TableController.getWinners();
  }

  static async deleteWinner(carId: string): Promise<void> {
    await TableQueries.removeWinner(carId);
    TableController.winners = TableController.getWinners();
  }

  static async sortWins(): Promise<void> {
    const winsButton = document.querySelector('[header = wins-number]') as HTMLElement;
    const bestTimeButton = document.querySelector('[header = best-time]') as HTMLElement;
    if (TableController.sort === '_sort=wins&_order=ASC') {
      TableController.sort = '_sort=wins&_order=DESC';
      winsButton.innerHTML = 'WINS &#128269; &#8595;';
    } else {
      TableController.sort = '_sort=wins&_order=ASC';
      winsButton.innerHTML = 'WINS &#128269; &#8593;';
    }
    bestTimeButton.innerHTML = 'BEST TIME &#128269;';
    TableController.winners = TableController.getWinners();
    TableController.drawTable();
  }

  static async sortTime(): Promise<void> {
    const winsButton = document.querySelector('[header = wins-number]') as HTMLElement;
    const bestTimeButton = document.querySelector('[header = best-time]') as HTMLElement;
    if (TableController.sort === '_sort=time&_order=ASC') {
      TableController.sort = '_sort=time&_order=DESC';
      bestTimeButton.innerHTML = 'BEST TIME &#128269; &#8595;';
    } else {
      TableController.sort = '_sort=time&_order=ASC';
      bestTimeButton.innerHTML = 'BEST TIME &#128269; &#8593;';
    }
    winsButton.innerHTML = 'WINS &#128269;';
    TableController.winners = TableController.getWinners();
    TableController.drawTable();
  }
}

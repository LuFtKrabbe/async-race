export default class TableQueries {
  static baseUrl = 'http://localhost:3000';

  static winnersOnPage = 10;

  static async getWinnersOnPage(currentPage: number, sort: string): Promise<Response> {
    const queryString = `?_page=${currentPage}&_limit=${TableQueries.winnersOnPage}&${sort}`;
    return fetch(`${TableQueries.baseUrl}/winners${queryString}`);
  }

  static async getWinner(id: number): Promise<Response> {
    return fetch(`${TableQueries.baseUrl}/winners/${id}`);
  }

  static async createWinner(id: number, time: number): Promise<Response> {
    return fetch(`${TableQueries.baseUrl}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, wins: 1, time }),
    });
  }

  static async updateWinner(id: number, wins: number, time: number): Promise<Response> {
    return fetch(`${TableQueries.baseUrl}/winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, wins: wins + 1, time }),
    });
  }

  static async removeWinner(id: string): Promise<Response> {
    return fetch(`${TableQueries.baseUrl}/winners/${id}`, {
      method: 'DELETE',
    });
  }
}

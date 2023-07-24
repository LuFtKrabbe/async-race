export default class CarQueries {
  static baseUrl = 'http://localhost:3000';

  static carsOnPage = 7;

  static async getCarsOnPage(currentPage: number): Promise<Response> {
    const queryString = `?_page=${currentPage}&_limit=${CarQueries.carsOnPage}`;
    return fetch(`${this.baseUrl}/garage${queryString}`);
  }

  static async createCar(name: string, color: string): Promise<Response> {
    return fetch(`${CarQueries.baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });
  }

  static async updateCar(currentTrack: number, name: string, color: string): Promise<Response> {
    return fetch(`${CarQueries.baseUrl}/garage/${currentTrack}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });
  }

  static async removeCar(carId: string): Promise<Response> {
    return fetch(`${CarQueries.baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
  }
}

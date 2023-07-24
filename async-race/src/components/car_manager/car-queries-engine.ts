export default class CarQueriesEngine {
  static baseUrl = 'http://localhost:3000';

  static async startEngine(carId: number): Promise<Response> {
    return fetch(`${CarQueriesEngine.baseUrl}/engine?id=${carId}&status=started`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async driveEngine(carId: number): Promise<Response> {
    return fetch(`${CarQueriesEngine.baseUrl}/engine?id=${carId}&status=drive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async stopEngine(carId: number): Promise<Response> {
    return fetch(`${CarQueriesEngine.baseUrl}/engine?id=${carId}&status=stopped`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

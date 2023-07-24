export function getRandomName(): string {
  const brand = ['Audi', 'Bently', 'BMW', 'Cherry', 'Shevrolet', 'Nissan', 'Lamborgini', 'Mazda', 'Opel', 'Volvo'];
  const models = ['A4', 'Azure', 'X5', 'Tiggo', 'Aveo', 'X-Trail', 'Aventador', 'CX-3', 'Astra', 'XC60'];
  return `${brand[Math.floor(Math.random() * 10)]} ${models[Math.floor(Math.random() * 10)]}`;
}

export function getRandomColor(): string {
  const color: string[] = [];
  for (let i = 1; i <= 3; i += 1) {
    color.push(`0${Math.floor(Math.random() * 256).toString(16)}`.slice(-2));
  }
  return `#${color.join('')}`;
}

export function lockButtonsSwitcher(state: boolean) {
  const body = document.querySelector('.body') as HTMLElement;
  const garageButton = document.querySelector('.garage-button') as HTMLElement;
  const winnersButton = document.querySelector('.winners-button') as HTMLElement;
  const resetButton = document.querySelector('[button = reset]') as HTMLElement;

  if (state === true) {
    body.style.pointerEvents = 'none';
    resetButton.style.pointerEvents = 'none';
    garageButton.innerHTML = 'RACE TIME!';
    winnersButton.innerHTML = 'LOCKED!';
  }
  if (state === false) {
    body.style.pointerEvents = 'auto';
    resetButton.style.pointerEvents = 'auto';
    garageButton.innerHTML = 'GARAGE';
    winnersButton.innerHTML = 'WINNERS';
  }
}

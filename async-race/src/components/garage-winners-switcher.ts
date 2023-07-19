import createGarageView from './garage-view';
import createTableView from './table-view';

function switchGarageWinners(event: Event): void {
  const target = event.target as Element;
  const main = document.querySelector('.main');

  if (target.matches('.garage-button') && main !== null) {
    main.replaceChildren();
    createGarageView();
  }

  if (target.matches('.winners-button') && main !== null) {
    main.replaceChildren();
    createTableView();
  }
}

const header = document.querySelector('.header') as Element;
header.addEventListener('click', switchGarageWinners);

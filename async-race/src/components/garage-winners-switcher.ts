import createControlPanel from './garage-view';
import createTable from './winners-table';

function switchGarageWinners(event: Event): void {
  const target = event.target as Element;
  const main = document.querySelector('.main');

  if (target.matches('.garage-button') && main !== null) {
    main.replaceChildren();
    createControlPanel();
  }

  if (target.matches('.winners-button') && main !== null) {
    main.replaceChildren();
    createTable();
  }
}

const header = document.querySelector('.header') as Element;
header.addEventListener('click', switchGarageWinners);

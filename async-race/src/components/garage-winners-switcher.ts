import createRaceController from './race-control-panel';
import createPagination from './pagination';
import createTable from './winners-table';
import createRace from './race-car-boxes';

function switchGarageWinners(event: Event): void {
  const target = event.target as Element;
  const main = document.querySelector('.main');

  if (target.matches('.garage-button') && main !== null) {
    main.replaceChildren();
    createRaceController();
    createPagination();
    createRace();
  }

  if (target.matches('.winners-button') && main !== null) {
    main.replaceChildren();
    createTable();
  }
}

const header = document.querySelector('.header') as Element;
header.addEventListener('click', switchGarageWinners);

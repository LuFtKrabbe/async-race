import createRaceController from './race-controller';
import createWinnersTable from './winners-table';

function switchGarageWinners(event: Event): void {
  const target = event.target as Element;

  if (target.matches('.garage')) {
    const winnersTable = document.querySelector('.table-wrapper');
    if (winnersTable !== null) {
      winnersTable.remove();
      createRaceController();
    }
  }

  if (target.matches('.winners')) {
    const controlPanel = document.querySelector('.controller-wrapper');
    if (controlPanel !== null) {
      controlPanel.remove();
      createWinnersTable();
    }
  }
}

const header = document.querySelector('.header') as Element;
header.addEventListener('click', switchGarageWinners);

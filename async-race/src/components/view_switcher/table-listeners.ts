import TableController from '../table_manager/table-controller';

export default function addEventListenersTable() {
  const prevButton = document.querySelector('[button-table = prev]') as Element;
  const nextButton = document.querySelector('[button-table = next]') as Element;
  const sortWinsButton = document.querySelector('[header = wins-number]') as Element;
  const sortTimeButton = document.querySelector('[header = best-time]') as Element;

  prevButton.addEventListener('click', TableController.drawPrevPage);
  nextButton.addEventListener('click', TableController.drawNextPage);
  sortWinsButton.addEventListener('click', TableController.sortWins);
  sortTimeButton.addEventListener('click', TableController.sortTime);
}

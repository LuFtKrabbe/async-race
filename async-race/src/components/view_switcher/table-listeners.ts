import TableController from '../table-controller';

export default function addEventListenersTable() {
  const prevButton = document.querySelector('[button-table = prev]') as Element;
  const nextButton = document.querySelector('[button-table = next]') as Element;

  prevButton.addEventListener('click', TableController.drawPrevPage);
  nextButton.addEventListener('click', TableController.drawNextPage);
}

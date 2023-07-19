import elemHTMLClassAttr from './utilities/functions';

export default function createPagination() {
  const panelWrapper = document.querySelector('.controll-panel-wrapper') as Element;
  const paginationInfo = elemHTMLClassAttr('pagination-info')();
  const pagination = elemHTMLClassAttr('pagination')();

  const carInfo = elemHTMLClassAttr('text-pagination')('text', 'cars');
  carInfo.innerHTML = 'CARS: 1';
  const pageInfo = elemHTMLClassAttr('text-pagination')('text', 'page');
  pageInfo.innerHTML = 'PAGE: 1';

  const prevButton = elemHTMLClassAttr('button-pagination')('button', 'prev');
  prevButton.innerHTML = 'PREVIOUS';
  const nextButton = elemHTMLClassAttr('button-pagination')('button', 'next');
  nextButton.innerHTML = 'NEXT';

  pagination.append(prevButton, nextButton);
  paginationInfo.append(carInfo, pageInfo);
  panelWrapper.append(paginationInfo, pagination);
}

createPagination();

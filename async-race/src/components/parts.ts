import elemHTMLClassAttr from './utilities/functions';

export default function createPageParts(): void {
  const body = document.querySelector('.body') as Element;

  const header = elemHTMLClassAttr('header', 'header')();
  const main = elemHTMLClassAttr('main', 'main')();
  const footer = elemHTMLClassAttr('footer', 'footer')();

  body.append(header, main, footer);

  const garage = elemHTMLClassAttr('garage-button')();
  garage.innerHTML = 'GARAGE';
  const winners = elemHTMLClassAttr('winners-button')();
  winners.innerHTML = 'WINNERS';
  header.append(garage, winners);

  const footerContent = elemHTMLClassAttr('footer-content')();
  footer.append(footerContent);

  const contentLuftkrabbe = elemHTMLClassAttr('luftkrabbe', 'a')('href', 'https://github.com/LuFtKrabbe');
  const contentLogo = elemHTMLClassAttr('logo', 'a')('href', 'https://rs.school/js/');
  const contentYear = elemHTMLClassAttr('year', 'p')();
  contentYear.innerHTML = '2023';
  footerContent.append(contentLuftkrabbe, contentYear, contentLogo);
}

createPageParts();

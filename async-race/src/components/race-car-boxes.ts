import elemHTMLClassAttr from './utilities/functions';

export default function createRace() {
  const main = document.querySelector('.main') as Element;
  const raceWrapper = elemHTMLClassAttr('race-wrapper')();
  main.append(raceWrapper);
  const race = elemHTMLClassAttr('race')();
  raceWrapper.append(race);
}

createRace();

export default function elemHTMLClassAttr(
  className: string,
  tag = 'div'
): (key?: string, value?: string) => HTMLElement {
  const elem = document.createElement(`${tag}`);
  elem.classList.add(`${className}`);
  return (key?: string, value?: string): HTMLElement => {
    if (key !== undefined && value !== undefined) {
      elem.setAttribute(`${key}`, `${value}`);
    }
    return elem;
  };
}

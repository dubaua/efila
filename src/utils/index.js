/* eslint-disable import/prefer-default-export */

export const numberWithSpaces = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function addClassToElement(el, className) {
  if (el.classList) el.classList.add(className);
  else {
    // eslint-disable-next-line no-param-reassign
    el.className += ` ${className}`;
  }
}

export function removeClassFromElement(el, className) {
  if (el.classList) el.classList.remove(className);
  else {
    // eslint-disable-next-line no-param-reassign
    el.className = el.className.replace(
      new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'),
      ' ',
    );
  }
}

export function declOfNum(n, titles) {
  return titles[ // eslint-disable-next-line no-nested-ternary
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  ];
}

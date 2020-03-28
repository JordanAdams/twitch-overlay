import "babel-polyfill";
import "./scss/bigtext.scss";

import * as qs from 'query-string';

const titleElement = document.querySelector('#title')

const getTitle = (): string => {
  const { query } = qs.parseUrl(window.location.href);
  const title = Array.isArray(query.text) ? query.text[0] : query.text;
  if (!title) {
    return '';
  }

  return title.replace('...', '&hellip;')
}


if (titleElement) {
  titleElement.innerHTML = getTitle();
}

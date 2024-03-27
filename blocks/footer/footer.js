import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { decorateLangSwitcher } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // language switcher
  decorateLangSwitcher(footer.querySelector('ul'));

  block.append(footer);

  // tag line
  block.querySelector('.footer > div > div')
    .classList.add('footer-tag-line');
  // social icons
  block.querySelector('.footer > div > div:last-of-type')
    .classList.add('footer-social');

  // move social elements
  const footerSocialElement = block.querySelector('.footer-social');
  footerSocialElement.querySelectorAll('p.button-container').forEach((ele) => {
    footerSocialElement.appendChild(ele);
  });
  footerSocialElement.querySelector('div.default-content-wrapper').remove();

  // remove class button-container and button
  block.querySelectorAll('p.button-container').forEach((ele) => {
    ele.classList.remove('button-container');
    ele.querySelector('a').classList.remove('button');
  });
}

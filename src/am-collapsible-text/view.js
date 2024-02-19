/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import { textMaxLength } from './constants';

//'.wp-block-awesome-blocks-collapsible-text'

document.addEventListener('DOMContentLoaded', (event) => {
    let buttons = document.querySelectorAll( '.wp-block-awesome-blocks-collapsible-text .am-collapsible-btn' );
    buttons.forEach((button) => {
        button.addEventListener('click', ( el) => {
            // button.classList.add('blue');
            // let block = this.closest('.wp-block-awesome-blocks-collapsible-text')

            let currentBtn = el.target;

            let blockWrapper = currentBtn.parentElement.parentElement;
            blockWrapper.classList.toggle( 'expand' );

            let content = blockWrapper.firstChild.dataset.content;

            if ( blockWrapper.classList.contains( 'expand' ) ) {
                currentBtn.innerHTML = currentBtn.dataset.collapseButtonText;
                blockWrapper.firstChild.innerHTML = content;
            } else {
                currentBtn.innerHTML = currentBtn.dataset.expandButtonText;
                if ( content.length > textMaxLength ) {
                    blockWrapper.firstChild.innerHTML = content.slice(0, textMaxLength) + " ...";
                } else {
                    blockWrapper.firstChild.innerHTML = content;
                }
            }
        });
    });

});

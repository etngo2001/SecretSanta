"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Initializes and sets up the page
   */
  function init() {
    // Randomly change colors of h1 and h2 elements
    const h1Elements = document.querySelectorAll('h1');
    const h2Elements = document.querySelectorAll('h2');

    setInterval(() => {
      h1Elements.forEach(element => randomlyChangeColors(element));
      h2Elements.forEach(element => randomlyChangeColors(element));
    }, 300); // Change colors every 300 milliseconds (1 second)
  }

  /**
   * Randomly changes the colors of the letters in an element
   * @param {object} element - The DOM element whose text content will have randomly colored letters
   * No return value
   */
  function randomlyChangeColors(element) {
    const text = element.textContent.trim();
    const coloredText = text
      .split('')
      .map(letter => `<span style="color: ${getRandomChristmasColor()}">${letter}</span>`)
      .join('');

    element.innerHTML = coloredText;
  }

  /**
   * Returns a random Christmas color
   * No parameters
   * @returns {string} - Random Christmas color
   */
  function getRandomChristmasColor() {
    const colors = ['#00873E', '#3FD485', '#089E79', '#079094', '#2F9B61', '#D6001C', '#E3001E', '#BD0019', '#960014', '#ED240C'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  /**
   * Below here are helper methods used to simplify the above functions.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} selector - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();
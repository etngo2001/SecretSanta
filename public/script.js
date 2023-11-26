"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Initializes and sets up the page
   */
  function init() {
    let formButton = id("to-form");
    formButton.addEventListener("click", () => switchViewInit(formButton.id));

    let targetButton = id("to-target");
    targetButton.addEventListener("click", () => switchViewInit(targetButton.id));

    let ssButton = id("to-ss");
    ssButton.addEventListener("click", () => switchViewInit(ssButton.id));

    let submitButton = id("form-submit-button");
    submitButton.addEventListener("click", submitForm);

    let backButton = qsa(".back-button");
    backButton.forEach(function (button) {
      button.addEventListener("click", function () {
        switchView(".welcome");
      });
    });

    // Randomly change colors of h1 and h2 elements
    const h1Elements = document.querySelectorAll('h1');
    const h2Elements = document.querySelectorAll('h2');

    setInterval(() => {
      h1Elements.forEach(element => randomlyChangeColors(element));
      h2Elements.forEach(element => randomlyChangeColors(element));
    }, 300); // Change colors every 300 milliseconds (1 second)
  }

  function switchHide(curr, className) {
    qs(curr).classList.add("hide")
    qs(className).classList.remove("hide")
  }

  /**
     * Handles form submission
     * No parameters
     * No return value
     */
  function submitForm() {
    event.preventDefault();

    // Guard to ensure that the necessary fields are filled
    if (!fullName || !family || !wish1) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if the name is already in the JSON file
    if (isNameAlreadyExists(fullName)) {
      alert("You have already entered. Please enter only once.");
      return;
    }

    // reformat form data and get key
    const formData = {
      name: fullName,
      family: family,
      wishlist: [
        wish1,
        wish2,
        wish3
      ],
      key: generateKey()
    };

    // Convert to JSON
    const jsonData = JSON.stringify(formData);

    // Log the JSON data (you can send it to the server or do anything else here)
    console.log(jsonData);

    qs(".key").textContent = formData.key;

    switchHide(".ssform", ".ugk");
  }

  /**
   * Generates a unique key for each form submission
   * No parameters
   * @returns {string} - Unique key
   */
  function generateKey() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const keyLength = 9;

    let key = '';
    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }

    return key;
  }

  // Function to check if the name already exists in the JSON file
  function isNameAlreadyExists(name) {
    // Assuming jsonData is an array of objects with 'name' property
    // You need to replace this with your actual JSON data or loading logic
    const jsonData = []; // Replace with your actual JSON data

    return jsonData.some(entry => entry.name === name);
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
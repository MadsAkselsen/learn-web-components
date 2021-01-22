class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log('its working');
  }
}

customElements.define('ma-tooltip', Tooltip); // ma stands for Mads Akselsen

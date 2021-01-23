class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Missing text on text attribute';
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // use the attribute
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    // add new html elements and event listeners
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.style.position = 'relative';
    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    // adding underscore to indicate that this method is not be called
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.style.zIndex = '10';
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('ma-tooltip', Tooltip); // ma stands for Mads Akselsen

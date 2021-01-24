class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Missing text on text attribute';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      div {
        background-color: black;
        color: white;
        position: absolute;
        z-index:10;
      }
    </style>
    <slot>hi</slot> <span> (?)</span>`;
  }

  connectedCallback() {
    // use the attribute
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    // add new html elements and event listeners
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.style.position = 'relative';
    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    // adding underscore to indicate that this method is not be called
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('ma-tooltip', Tooltip); // ma stands for Mads Akselsen

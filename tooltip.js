class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipIcon;
    this._tooltipText = 'Missing text on text attribute';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      div {
        font-weight: normal;
        background-color: black;
        color: white;
        position: absolute;
        top: 1.5rem;
        left: 0.75rem;
        z-index:10;
        padding: 0.15rem;
        border-radius: 3px;
        box-shadow: 1px 1px 6px rgba(0,0,0,0.26)
      }

      :host(.important) {
        background: var(--color-primary, #ccc);
        padding: 0.15rem;
      }

      :host-context(p) {
        
        font-weight: bold;
      }
 
      ::slotted(.highlight) {
        border-bottom:3px dotted red;
      }

      .icon {
        background: black;
        color: white;
        padding: 0.15rem 0.5rem;
        text-align:center;
        border-radius:50%;
      }
    </style>
    <slot>Default text that only renders if no text are inserted from the normal DOM</slot> 
    <span class="icon">?</span>
    `;
  }

  connectedCallback() {
    // use the attribute
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    // add new html elements and event listeners
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this)
    );
    this.style.position = 'relative';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text'];
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._showTooltip);
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

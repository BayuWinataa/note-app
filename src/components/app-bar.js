class AppBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
			<style>
				h1 {
					text-align: center;
					margin: 20px;
					font-size: 60px;
					font-weight: bold;
				}
			</style>
			<header>
				<h1>Notes App</h1>
			</header>
		`;
  }
}

customElements.define('app-bar', AppBar);

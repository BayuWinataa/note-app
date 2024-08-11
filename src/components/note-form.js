class NoteForm extends HTMLElement {
  static get observedAttributes() {
    return ['title-placeholder', 'body-placeholder'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() {
    this.render();
    this.addEventListeners();
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const titlePlaceholder =
      this.getAttribute('title-placeholder') || 'Enter title here...';
    const bodyPlaceholder =
      this.getAttribute('body-placeholder') || 'Enter body here...';

    this.shadowRoot.innerHTML = `
			<style>
				:host {
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.form-group {
					display: block;
					border: 2px solid #ddd;
					width: 100%;
					font-weight: bold !important;
					max-width: 600px;
					margin: 0 auto 40px;
					padding: 20px;
					background-color: #d6efd8;
					border-radius: 8px;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					transition: transform 0.3s ease, box-shadow 0.3s ease;
				}
				.form-group div {
					margin-bottom: 15px;
				}
				label {
					display: block;
					margin-bottom: 5px;
					color: #333;
				}
				input[type='text'],
				textarea {
					width: 100%;
					padding: 10px;
					border: 2px solid #ddd;
					border-radius: 5px;
					font-size: 16px;
					box-sizing: border-box;
					resize: none;
				}
				input[type='text']:focus,
				textarea:focus {
					border: 3px solid #468585;
					outline: none;
				}
				button {
					width: 100%;
					background-color: #468585;
					color: #fff;
					font-weight: bold;
					border: none;
					border-radius: 5px;
					padding: 15px;
					font-size: 16px;
					cursor: pointer;
					transition: background-color 0.3s ease, transform 0.3s ease;
				}
				button:hover {
					background-color: #36ba98;
					transform: scale(0.99);
				}
				textarea,
				input {
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					font-weight: 500;
					background-color: #83bc81;
				}
				.error {
					color: red;
					font-size: 16px;
				}
			</style>
      <form id="noteForm" class="form-group">
        <div>
          <label for="title">Judul:</label>
          <input type="text" id="title" name="title" placeholder="${titlePlaceholder}" />
          <span id="titleError" class="error"></span>
        </div>
        <div>
          <label for="body">Isi:</label>
          <textarea id="body" name="body" rows="5" placeholder="${bodyPlaceholder}"></textarea>
          <span id="bodyError" class="error"></span>
        </div>
        <button type="submit">Tambah</button>
      </form>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('#noteForm');
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyTextarea = this.shadowRoot.querySelector('#body');
    const titleError = this.shadowRoot.querySelector('#titleError');
    const bodyError = this.shadowRoot.querySelector('#bodyError');

    titleInput.addEventListener('input', () => {
      titleError.textContent =
        titleInput.value.trim() === '' ? 'Judul tidak boleh kosong' : '';
    });

    bodyTextarea.addEventListener('input', () => {
      bodyError.textContent =
        bodyTextarea.value.trim() === '' ? 'Isi tidak boleh kosong' : '';
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      titleInput.dispatchEvent(new Event('input'));
      bodyTextarea.dispatchEvent(new Event('input'));

      if (!titleError.textContent && !bodyError.textContent) {
        const title = titleInput.value;
        const body = bodyTextarea.value;

        this.dispatchEvent(
          new CustomEvent('add-note', {
            detail: { title, body },
            bubbles: true,
            composed: true,
          })
        );
        form.reset(); 
      }
    });
  }
}

customElements.define('note-form', NoteForm);
export default NoteForm;

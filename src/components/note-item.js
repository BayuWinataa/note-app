class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'body', 'created-at', 'id', 'archived'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'No Title';
    const body = this.getAttribute('body') || 'No Content';
    const createdAt =
      this.getAttribute('created-at') || new Date().toISOString();
    const id = this.getAttribute('id') || '';
    const archived = this.getAttribute('archived') === 'true';

    this.shadowRoot.innerHTML = `
      <style>
        .note {
          border: 2px solid #ddd;
          padding: 20px;
          font-size: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          background-color: #D6EFD8;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .note:hover {
          transform: translateY(-7px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        .note h2 {
          margin-bottom: 10px;
          font-size: 22px;
          color: #263238;
        }
        .note p {
          margin: 10px 0;
          font-size: 20px;
          color: #555;
          line-height: 1.5;
        }
        .note small {
          display: block;
          margin-top: 10px;
          font-size: 14px;
          color: #888;
        }
        button {
          background-color: #468585;
          color: #fff;
          margin-top: 10px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        button:focus {
          box-shadow: 0 0 0 3px rgba(0, 123, 0, 0.5);
        }
        button:active {
          background-color: #36BA98;
          transform: scale(0.98);
        }
        button:hover {
          background-color: #36BA98;
          transform: scale(0.98);
        }
      </style>
      <div class="note">
        <h2>${title}</h2>
        <p>${body}</p>
        <small>${new Date(createdAt).toLocaleString()}</small>
        <button class="delete-btn">Hapus</button>
        <button class="archive-btn">${archived ? 'Unarchive' : 'Archive'}</button>
      </div>
    `;

    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id },
            bubbles: true,
            composed: true,
          })
        );
      });

    this.shadowRoot
      .querySelector('.archive-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent(archived ? 'unarchive-note' : 'archive-note', {
            detail: { id },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define('note-item', NoteItem);

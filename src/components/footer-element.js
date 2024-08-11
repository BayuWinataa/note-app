class FooterElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #508d4e;
                    font-size: larger;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    color: #fff;
                    padding: 5px;
                    margin-top: 40px;
                    text-align: center;
                    width: 100%;
                    bottom: 0;
                    left: 0;
                    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                }

                footer a {
                    color: #ff9;
                    text-decoration: none;
                    margin: 0 10px;
                }

                footer a:hover {
                    color: rgb(193, 193, 5);
                }

                footer .social-icons {
                    margin-top: 10px;
                }

                footer .social-icons img {
                    width: 40px;
                    margin: 0 5px;
                }

                footer span {
                    cursor: pointer;
                }
            </style>
            <footer >
                <p>Created with <span class="love-icon">❤️</span> by <a href="https://github.com/bayuwinataa" target="_blank">Bayu Winata</a></p>
                <p>
                    <a href="#">Home</a> |
                    <a href="#t">About</a> |
                    <a href="#">Services</a> |
                    <a href="#">Contact</a>
                </p>
                <div class="social-icons">
                    <a href="https://facebook.com" target="_blank">
                        <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook">
                    </a>
                    <a href="https://twitter.com" target="_blank">
                        <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter">
                    </a>
                    <a href="https://instagram.com" target="_blank">
                        <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram">
                    </a>
                </div>
            </footer>
        `;
  }
}

customElements.define('footer-element', FooterElement);

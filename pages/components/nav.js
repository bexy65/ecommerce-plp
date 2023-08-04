class Nav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="navbar navbar-light bg-light fixed-top navbar-expand-md">
        <div class="container-fluid">
            <a class="navbar-brand" href="/index.html">
                <img src="/images/4.svg" alt="" width="50" height="50" class="d-inline-block align-text-top">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                   
                </ul>
            </div>
        </div>
    </nav>
      `;
  }
}

customElements.define('nav-component', Nav);

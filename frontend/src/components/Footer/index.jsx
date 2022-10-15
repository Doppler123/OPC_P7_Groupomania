import "./footer.scss"

function Footer() {
  return (
    <footer className="card">
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-4 py-6 my-6"
        id="cardFooter"
      >
        <div className="col mb-3" id="iconAndCopyright">
          <img src="../../images/logos/favicon.png" alt="Logo Groupomania" />
          <p className="text-muted">© 2022</p>
        </div>

        <div className="col mb-3">
          <h2>A propos :</h2>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <p>Fonctionnement du site</p>
            </li>
            <li className="nav-item mb-2">
              <p>Données et confidentialité</p>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h2 className="card-title">Assistance :</h2>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <p>Contacter l'administrateur</p>
            </li>
            <li className="nav-item mb-2">
              <p>Contacter le service technique</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

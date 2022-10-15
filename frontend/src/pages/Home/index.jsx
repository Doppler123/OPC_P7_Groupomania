import LogOutButton from "../../components/LogOutButton"

import "./home.scss"

function Home() {
  const bearerCookie = document.cookie

  return (
    <div id="home">
      {bearerCookie ? <LogOutButton /> : <div></div>}
      <div className="card">
        <div className="card-body">
          <h1 className="card text-center">
            Bienvenue sur le réseau social de GROUPOMANIA!
          </h1>
          <p className="card text-center">
            Notre nouveau réseau social interne est enfin disponible!
            <br />
            Nous espérons qu'il répondra à vos attentes et qu'il deviendra un
            espace de convivialité et de détente... <br />
            Pour participer aux échanges, il vous suffit de vous enregistrer sur
            la page d'authentification avec votre email professionnel puis de
            vous connecter!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

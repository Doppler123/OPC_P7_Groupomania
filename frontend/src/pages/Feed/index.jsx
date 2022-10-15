import PostForm from "../../components/PostForm"
import PostList from "../../components/PostList"
import LogOutButton from "../../components/LogOutButton"

import "./feed.scss"

function Feed() {
  const bearerCookie = document.cookie

  return (
    <div>
      {bearerCookie ? (
        <div>
          <LogOutButton />
          <hr />
          <PostForm />
          <hr />
          <h2 className="card text-center" id="postListTitle">
            Voici les derniers posts :
          </h2>
          <PostList />
        </div>
      ) : (
        <div className="card text-center" id="connectionNeeded">
          Il faut vous connecter pour pouvoir accéder aux discussions!
        </div>
      )}
    </div>
  )
}

export default Feed

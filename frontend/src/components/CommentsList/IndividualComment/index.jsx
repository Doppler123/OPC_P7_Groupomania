import Author from "../../Author"
import Time from "../../Time"
import Text from "../../Text"
import DeleteCommentButton from "./DeleteCommentButton"
import ModifyCommentButton from "./ModifyCommentButton"

const IndividualComment = ({ comment }) => {
  const {
    comment_id,
    comment_time,
    comment_text,
    comment_userId,
    user_email,
    user_firstName,
    user_lastName,
  } = comment

  const userIdFromLocalStorage = JSON.parse(
    localStorage.getItem("userData")
  ).user_id

  const emailFromLocalStorage = JSON.parse(
    localStorage.getItem("userData")
  ).user_email

  return (
    <>
      <div>
        <hr />
        <div className="card">
          <div className="card-header">
            <Author
              author_email={user_email}
              author_firstName={user_firstName}
              author_lastName={user_lastName}
            />
            <Time timestamp={comment_time} />
          </div>
        </div>
        <div className="card-body">
          <Text text={comment_text} />
          {userIdFromLocalStorage === parseInt(comment_userId) ||
          emailFromLocalStorage === "admin@groupomania.com" ? (
            <DeleteCommentButton comment_id={comment_id} />
          ) : (
            <div></div>
          )}
          {userIdFromLocalStorage === parseInt(comment_userId) ||
          emailFromLocalStorage === "admin@groupomania.com" ? (
            <ModifyCommentButton comment_id={comment_id} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}

export default IndividualComment

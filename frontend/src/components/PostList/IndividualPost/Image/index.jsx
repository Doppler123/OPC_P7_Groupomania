import "./image.scss"

const Image = ({ imageUrl, imageName }) => {
  return (
    <div id="postImage">
      {
        <img
          className={("img-fluid", "rounded mx-auto d-block", "card-img-top")}
          src={"http://localhost:8000/" + imageUrl}
          alt={imageName}
        />
      }
    </div>
  )
}
export default Image

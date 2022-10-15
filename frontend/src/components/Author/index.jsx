const Author = ({ author_email, author_firstName, author_lastName }) => {
  return (
    <div>
      {"par " +
        author_firstName +
        " " +
        author_lastName +
        " (" +
        author_email +
        ")"}
    </div>
  )
}

export default Author

const dayjs = require("dayjs")

const Time = ({ timestamp }) => {
  var formatedTimestampDate = dayjs(timestamp).format("DD/MM/YYYY")
  var formatedTimestampHour = dayjs(timestamp).format("HH:mm")
  return (
    <div>{"le " + formatedTimestampDate + " à " + formatedTimestampHour}</div>
  )
}

export default Time

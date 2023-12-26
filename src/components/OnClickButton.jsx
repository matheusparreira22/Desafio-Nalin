import PropTypes from "prop-types"
import { IoIosClose } from "react-icons/io"
const messageError = {
  background: "red",
  borderRadius: "10px",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
  padding: "1px",
  alignItems: "center",
  color: "white"
}
const closeMessage = {
  background: "white",
  padding: "1px",
  borderRadius: "5px",
  height: "80%",
  alignItems: "center",
  cursor: "pointer"
}

export default function OnClickButton({ textError, event }) {
  return (
    <div style={messageError}>
      <small>{textError}</small>
      <button style={closeMessage} onClick={event}>
        <IoIosClose />
      </button>
    </div>
  )
}
OnClickButton.propTypes = {
  event: PropTypes.func,
  textError: PropTypes.string
}

import React from "react";

const Message = (props) => {
  return (
    <div className="message">
      {props.message.text}
    </div>
  )
}
export default Message

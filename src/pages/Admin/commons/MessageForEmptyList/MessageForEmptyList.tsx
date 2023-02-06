import React, { FC } from "react";

const MessageForEmptyList: FC<{ message: string }> = ({ message }) => (
  <h2>{message}</h2>
);

export default MessageForEmptyList;

import { InterlocutorI } from "websockets/entities/Users";

export const generateFullName = ({
  interlocutor,
}: {
  interlocutor: InterlocutorI;
}) => {
  if (interlocutor) {
    const { firstname, lastname } = interlocutor;

    return `${firstname} ${lastname}`;
  }
  return "fullname";
};

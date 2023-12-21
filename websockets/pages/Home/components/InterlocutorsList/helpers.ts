import { InterlocutorI } from "websockets/entities/Users";

export const isUserOnline = ({
  usersOnlineIds,
  interlocutor,
}: {
  usersOnlineIds: string[];
  interlocutor: InterlocutorI;
}) => {
  return usersOnlineIds.includes(interlocutor._id);
};

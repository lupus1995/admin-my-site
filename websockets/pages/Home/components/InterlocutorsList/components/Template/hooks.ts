import {
  InterlocutorI,
  useGetActiveInterlocutor,
} from "websockets/entities/Users";

export const useIsActiveInterlocutor = ({
  interlocutor,
}: {
  interlocutor: InterlocutorI;
}) => {
  const { activeInterlocutor } = useGetActiveInterlocutor();

  return activeInterlocutor?._id === interlocutor._id;
};

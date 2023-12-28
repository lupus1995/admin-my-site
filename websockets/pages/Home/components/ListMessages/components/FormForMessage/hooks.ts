import { useForm } from "react-hook-form";

import {
  useCreateMessage,
  useGetTypesMessage,
  useGetRoomId,
  CreateMessageI,
  useFetchTypesMessage,
} from "websockets/entities/Messages";
import {
  useGetActiveInterlocutor,
  useActiveUser,
} from "websockets/entities/Users";
import { useUpdateInterlocutorBySocket } from "websockets/pages/Home/wrappers/SocketsWrapper";

export const useHandleSubmit = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { handleCreateMessage } = useCreateMessage();
  useFetchTypesMessage();
  const typeMessage = useGetTypesMessage();
  const activeRoomId = useGetRoomId();
  const { activeInterlocutor } = useGetActiveInterlocutor();
  const activeUser = useActiveUser();
  const { handleEmitUpdateInterlocutor } = useUpdateInterlocutorBySocket();

  const onSubmit = async ({ message }: { message: string }) => {
    const newMessage: CreateMessageI = {
      from: activeUser._id,
      to: activeInterlocutor._id,
      typeMessage: typeMessage.TEXT,
      value: message,
      roomId: activeRoomId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    handleCreateMessage(newMessage).then(() => handleEmitUpdateInterlocutor());
    setValue("message", "");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};

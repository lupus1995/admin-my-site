import { FeedbackI } from "../../interface";

export interface ModalFeedbackI {
  selected: FeedbackI[];
  handleClearFeedback: () => void;
}

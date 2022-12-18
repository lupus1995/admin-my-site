import { FeedbackI } from "../../interface";

export interface FeedbackTableI {
  feedback: FeedbackI[];
  selected: FeedbackI[];
  setSelected: React.Dispatch<React.SetStateAction<FeedbackI[]>>;
}

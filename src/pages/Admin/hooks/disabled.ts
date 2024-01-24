import { useState } from "react";

import useUtilsStyles from "utils/styles";

export const useDisabled = () => {
  const utlisStyles = useUtilsStyles();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return { isDisabled, setIsDisabled, disabledClass: utlisStyles.disabled };
};

import React, { FC } from "react";

import { getDate } from "./helpers";

const Time: FC<{ date: string }> = ({ date }) => <time>{getDate(date)}</time>;

export default Time;

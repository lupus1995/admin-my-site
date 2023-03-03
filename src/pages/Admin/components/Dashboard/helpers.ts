import { urls } from "./constants";
import { LinkI } from "./interface";

export const getRootParentLink = ({
  activeLink,
}: {
  activeLink: LinkI | undefined;
}): LinkI => {
  if (activeLink?.parent === null) {
    return activeLink;
  }

  const parentLink = urls.find((item) => {
    if (item.to === activeLink?.parent) {
      return item;
    }
  });

  return getRootParentLink({ activeLink: parentLink });
};

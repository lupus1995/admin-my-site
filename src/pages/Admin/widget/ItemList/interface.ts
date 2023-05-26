export interface ItemPropsI {
  src: string;
  title: string;
  description: string;
}

export interface ItemWrapperPropI {
  children: React.ReactNode;
  href: string;
  handleClick: () => void;
}

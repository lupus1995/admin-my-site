const reactI18next = ({ language }: { language: string }) => {
  const module = jest.requireActual("react-i18next");

  return {
    ...module,
    useTranslation: () => ({
      i18n: {
        language: language,
      },
      t: (value: string) => value,
    }),
  };
};

export default reactI18next;

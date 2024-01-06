const reactI18next = ({ language }: { language: string }) => {
  const mockModule = jest.requireActual("react-i18next");

  return {
    ...mockModule,
    useTranslation: () => ({
      i18n: {
        language: language,
      },
      t: (value: string) => value,
    }),
  };
};

export default reactI18next;

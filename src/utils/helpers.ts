export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: unknown) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

// проверяет наличие объекта window
// сделано для того, чтобы на стороне ssr исключить рендеринг для компонента для которого
// требуется наличие объекта window
export const hasWindow = () => {
  return typeof window !== "undefined";
};

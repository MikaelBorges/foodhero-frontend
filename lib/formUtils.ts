type FiltersType = {
  [key: string]: string | string[] | null | undefined;
};

export const removeEmptyValues = (values: FiltersType) => {
  const cleanedValues: FiltersType = {};
  for (const [key, value] of Object.entries(values)) {
    if (
      value !== "" &&
      value !== null &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      cleanedValues[key] = value;
    }
  }
  return cleanedValues;
};

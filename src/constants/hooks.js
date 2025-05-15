export const optionLabelToName = (list) =>
  list?.map((item) => ({
    name: item?.label,
    id: item?.value,
  }));

export const consultantTier = [
  { id: 0, name: "Bronze" },
  { id: 1, name: "Platinum" },
  { id: 2, name: "Gold" },
  { id: 3, name: "Silver" },
];

export const studyMode = [
  { id: 1, name: "Part Time" },
  { id: 2, name: "Full Time" },
  { id: 3, name: "Sandwich" },
];

export const deliveryMethods = [
  { id: 1, name: "Online" },
  { id: 2, name: "On-Campus" },
  { id: 3, name: "Hybrid" },
];

export const deliverySchedules = [
  { id: 1, name: "Evening" },
  { id: 2, name: "Evening Weekend" },
  { id: 3, name: "Standard" },
  { id: 4, name: "Weekend" },
  { id: 5, name: "Flexible" },
];

export const currencyData = [
  { id: 0, name: "£" },
  { id: 1, name: "$" },
  { id: 2, name: "£" },
  { id: 3, name: "$" },
  { id: 4, name: "$" },
  { id: 5, name: "€" },
  { id: 6, name: "AED" },
];

export const currency = (id) => {
  const filter = currencyData.filter((item) => item.id === id);
  const result = filter.length > 0 ? filter[0].name : null;
  return result;
};

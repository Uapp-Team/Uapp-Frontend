export const consultantTier = [
  { id: 0, name: "Bronze" },
  { id: 1, name: "Platinum" },
  { id: 2, name: "Gold" },
  { id: 3, name: "Silver" },
];

export const studyMode = [
  { id: 2, name: "Full Time" },
  { id: 1, name: "Part Time" },
  { id: 3, name: "Sandwich" },
];

export const deliveryMethods = [
  { id: 2, name: "On-Campus" },
  { id: 1, name: "Online" },
  { id: 3, name: "Hybrid" },
];

export const deliverySchedules = [
  { id: 3, name: "Standard" },
  { id: 1, name: "Evening" },
  { id: 5, name: "Flexible" },
  { id: 4, name: "Weekend" },
  { id: 2, name: "Evening + Weekend" },
];

export const countryList = [
  { id: 1, name: "USA", currency: "$" },
  { id: 2, name: "UK", currency: "£" },
  { id: 3, name: "Canada", currency: "$" },
  { id: 4, name: "Australia", currency: "$" },
  { id: 5, name: "Germany", currency: "€" },
  { id: 6, name: "UAE", currency: "AED" },
];

export const currency = (id) => {
  const filter = countryList.filter((item) => item.id === id);
  const result = filter.length > 0 ? filter[0].currency : "£";
  return result;
};

export const countryInfo = (id) => {
  const filter = countryList.filter((item) => item.id === id);
  const result = filter.length > 0 ? filter[0] : null;
  return result;
};

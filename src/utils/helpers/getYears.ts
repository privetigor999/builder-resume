export const getYears = () => {
  const years = ["-"];
  const nextYear = new Date().getFullYear();

  for (let firstYear = nextYear; firstYear >= 1980; firstYear--) {
    years.push(firstYear.toString());
  }

  return years;
};

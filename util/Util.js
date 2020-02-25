const capitalize = text => {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const capitalizeFirst = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const dateToString = date => {
  return date.toISOString();
};

module.exports = { capitalize, capitalizeFirst, dateToString };

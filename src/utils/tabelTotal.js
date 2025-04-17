export const tableTotal = (data, name) => {
  const total = data?.reduce((acc, cur) => {
    return parseFloat(acc) + (parseFloat(cur?.[name]) || 0);
  }, 0);
  return total;
};

export const tableAdditionalFieldsTotal = (data, name) => {
  const total = data?.reduce((acc, cur) => {
    return parseFloat(acc) + (parseFloat(cur?.additionalFields?.[name]) || 0);
  }, 0);
  return total;
};

export const galaxtTabelTotal = (item, price) => {
  return item * price || null;
};

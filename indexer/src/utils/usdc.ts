export const formatBalance = (result) => {
  const balance = Number(result) / 10 ** 6;
  return balance;
};

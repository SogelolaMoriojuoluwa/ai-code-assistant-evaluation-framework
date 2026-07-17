export const generateSequentialId = (
  prefix,
  lastId,
  length = 6
) => {
  const nextNumber = lastId ? lastId + 1 : 1;

  return `${prefix}-${String(nextNumber).padStart(length, "0")}`;
};
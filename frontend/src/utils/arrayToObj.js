export const convertArrayToObject = (arr) => {
  const resultArray = [];

  for (const value of arr) {
    resultArray.push({ key: value, isChecked: false });
  }

  return resultArray;
};

export const getRow = (flatArray, rowNo) => {
  const numberOfRows = flatArray.length / 9;
  const twoDimensionalArray = [];

  for (let i = 0; i < numberOfRows; i++) {
    const startIdx = i * 9;
    const endIdx = startIdx + 9;
    twoDimensionalArray.push(flatArray.slice(startIdx, endIdx));
  }

  return twoDimensionalArray[rowNo];
};

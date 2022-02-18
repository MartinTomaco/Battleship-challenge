const pMatrix = new Array(100);
for (let index = 0; index < pMatrix.length; index += 1) {
  pMatrix[index] = 0;
}
pMatrix[75] = '4';
pMatrix[85] = '4';
pMatrix[95] = '4';

console.log(pMatrix, '\n');

const ship = '4'; //  4 carrier - 3a 3b 3c cruisers - 2 submarine

// This function suggests possible positions to the player
const findSuggestedPos = (pMatrix, currentPos, previousPos, ship) => {
  const suggestedValues = [];
  let index;
  let idx;
  let result;
  let resultMin;
  let resultMax;

  const firstInRow = Math.floor(currentPos / 10) * 10;
  const firstInColumn = Math.floor(currentPos % 10); // If currentPos === 92 it should return 2
  const currentRow = pMatrix.slice(firstInRow, firstInRow + 10);

  const currentColumn = [];
  for (let i = 0; i < 10 * 10; i += 10) {
    currentColumn.push(pMatrix[firstInColumn + i]);
  }

  const diff = currentPos - previousPos;

  switch (1 % diff) {
    case 0: // row
      index = [];
      idx = currentRow.indexOf(ship);
      while (idx !== -1) {
        index.push(idx);
        idx = currentRow.indexOf(ship, idx + 1);
      }
      // index of the ships within the row
      result = index.map((element) => { return Number(element) + firstInRow; });
      console.log(result);

      resultMin = Math.min(...result); // when result is empty this is infinity
      resultMax = Math.max(...result);

      if (resultMin > firstInRow && !!result.length) {
        // if its in range and result is not empty
        suggestedValues.push(resultMin - 1); // suggest one to left
      }
      if (resultMax < firstInRow + (10 - 1) && !!result.length) {
        suggestedValues.push(resultMax + 1); // suggest one to right
      }
      return suggestedValues;

    case 1: // column
      console.log('column');
      index = [];
      idx = currentColumn.indexOf(ship);
      console.log('currentColumn: ', currentColumn);
      console.log('firstInColumn: ', firstInColumn);
      while (idx !== -1) {
        index.push(idx);
        idx = currentColumn.indexOf(ship, idx + 1);
      }
      // index of the ships within the column
      result = index.map((element) => { return Number(element) * 10 + firstInColumn; });
      console.log('result: ', result);

      resultMin = Math.min(...result); // when result is empty this is infinity
      resultMax = Math.max(...result);

      if (resultMin > firstInColumn && !!result.length) {
        // if its in range and result is not empty
        suggestedValues.push(resultMin - 10); // suggest one to up
      }

      if (resultMax < firstInColumn + (10 - 1) * 10 && !!result.length) {
        suggestedValues.push(resultMax + 10); // suggest one to down
      }
      return suggestedValues;

    default:
      break;
  }
};

export default { findSuggestedPos };

let previousPos = '95';
let currentPos = '85';
let toPaintPos = 0;

previousPos = Number(previousPos);
currentPos = Number(currentPos);

toPaintPos = findSuggestedPos(currentPos, previousPos, ship);

console.log(toPaintPos, '\n');

// console.log(1 % -1); // horizontal
// console.log(1 % 1);
// console.log(1 % 10); // vertical
// console.log(1 % -10);

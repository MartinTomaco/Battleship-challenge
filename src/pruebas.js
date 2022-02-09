let pMatrix = new Array(100);
for (let index = 0; index < pMatrix.length; index++) {
  pMatrix[index] = 0;
}
pMatrix[75] = "4";
pMatrix[85] = "4";
pMatrix[95] = "4";

console.log(pMatrix, `\n`);

let ship = "4"; //  4 carrier - 3a 3b 3c cruisers - 2 submarine

// This function suggests possible positions to the player
const findSuggestedPos = (currentPos, previousPos, ship) => {
  
  let suggestedValues = [],
    index,
    idx,
    result,
    resultMin,
    resultMax;

  let firtsInRow = Math.floor(currentPos / 10) * 10;
  let firtsInColumn = Math.floor(currentPos % 10); // Si el currentPos es 92 deberia devolverme 2
  let currentRow = pMatrix.slice(firtsInRow, firtsInRow + 10);

  let currentColumn = [];
  for (let i = 0; i < 10*10; i = i + 10) {
    currentColumn.push(pMatrix[firtsInColumn + i]);
  }

  let diff = currentPos - previousPos;

  switch (1 % diff) {
    case 0: //row
      index = [];
      idx = currentRow.indexOf(ship);
      while (idx !== -1) {
        index.push(idx);
        idx = currentRow.indexOf(ship, idx + 1);
      }
      result = index.map((element) => Number(element) + firtsInRow); //index of the ships within the row
      console.log(result);

      resultMin = Math.min(...result); //when result is empty this is infinity
      resultMax = Math.max(...result);

      if (resultMin > firtsInRow && !!result.length) {
        // if its in range and result is not empty
        suggestedValues.push(resultMin - 1); //suggest one to left
      }
      if (resultMax < firtsInRow + (10-1) && !!result.length) {
        suggestedValues.push(resultMax + 1); //suggest one to right
      }
      return suggestedValues;

    case 1: //column
      console.log("column");
      index = [];
      idx = currentColumn.indexOf(ship);
      console.log("currentColumn: ", currentColumn);
      console.log("firtsInColumn: ", firtsInColumn);
      while (idx !== -1) {
        index.push(idx);
        idx = currentColumn.indexOf(ship, idx + 1);
      }
      result = index.map((element) => Number(element) * 10 + firtsInColumn); //index of the ships within the column
      console.log("result: ", result);

      resultMin = Math.min(...result); //when result is empty this is infinity
      resultMax = Math.max(...result);

      if (resultMin > firtsInColumn && !!result.length) {
        // if its in range and result is not empty
        suggestedValues.push(resultMin - 10); //suggest one to up
      }

      if (resultMax < firtsInColumn + (10-1)*10 && !!result.length) {
        suggestedValues.push(resultMax + 10); //suggest one to down
      }
      return suggestedValues;

    default:
      break;
  }
};

let previousPos = "95";
let currentPos = "85";
let toPaintPos = 0;

previousPos = Number(previousPos);
currentPos = Number(currentPos);

toPaintPos = findSuggestedPos(currentPos, previousPos, ship);

console.log(toPaintPos, `\n`);

// console.log(1 % -1); // horizontal
// console.log(1 % 1);
// console.log(1 % 10); // vertical
// console.log(1 % -10);

export const handleKeyDown = (e, currentRow, currentCol) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
    return;

  e.preventDefault();

  // Clear previously focused cells
  const allCells = document.querySelectorAll(".focused");
  allCells.forEach((cell) => cell.classList.remove("focused"));

  let newRow = currentRow;
  let newCol = currentCol;

  // Calculate new positions
  if (e.key === "ArrowDown") {
    newRow = currentRow + 1;
  } else if (e.key === "ArrowUp") {
    newRow = currentRow - 1;
  } else if (e.key === "ArrowRight") {
    newCol = currentCol + 1;
  } else if (e.key === "ArrowLeft") {
    newCol = currentCol - 1;
  }

  // Find the next cell by id
  const nextCell = document.getElementById(`${newRow}${newCol}`);
  if (nextCell) {
    nextCell.focus();
    nextCell.classList.add("focused");
  }
};

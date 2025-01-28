const draggableDiv = document.getElementById("draggable-div");
let table = document.getElementsByTagName("table")[0];
let table_Array = [["Cell 1-1"]];
let selectedCells = [];
let isInitialized = false;
let addRowBtn = document.getElementById("add-row");
let startCellValue = document.getElementById("select-starting-cell-input");
let endCellValue = document.getElementById("select-ending-cell-input");
let width,
    height,
    tableColor,
    borderColor,
    borderWidth,
    cellSpacing,
    cellPadding,
    tableAlignMent;

// Add event listeners for input changes
startCellValue.addEventListener("input", checkInputValues);
endCellValue.addEventListener("input", checkInputValues);

window.onload = loadTableState();

// dragable div code
draggableDiv.addEventListener("dragend", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    draggableDiv.style.position = "absolute";
    draggableDiv.style.left = `${x}px`;
    draggableDiv.style.top = `${y}px`;
});

function checkInputValues() {
    // Get the specific td,
    // check if both of the inputs exists by cellname,
    // if exists, highlight the cells, apply styles and enable the merge button,
    // else reset the styles and disable the merge button.

    const startCellName = startCellValue.value.trim();
    const endCellName = endCellValue.value.trim();

    if (startCellName && endCellName) {
        const startCell = getCellByName(startCellName);
        const endCell = getCellByName(endCellName);

        if (startCell && endCell) {
            highlightSelectedCells(startCell, endCell);
            document.getElementById("merge-button").disabled = false;
        } else {
            resetCellStyles();
            document.getElementById("merge-button").disabled = true;
        }
    } else {
        resetCellStyles();
        document.getElementById("merge-button").disabled = true;
    }
}

// Usecase: loop through all tds to get the one user entered.
function getCellByName(cellName) {
    const cells = table.getElementsByTagName("td");
    for (let cell of cells) {
        if (cell.textContent.trim() === cellName.trim()) {
            return cell;
        }
    }
    return null;
}

// Returns 2d array cordinates from the cell name: i.e: Cell 2-1 => [1] [0]
function getCellCoordinates(cellName) {
    if (cellName.includes("Cell")) {
        const row = parseInt(cellName[5]) - 1;
        const col = parseInt(cellName[7]) - 1;
        console.log(row, col);
        return { row, col };
    } else {
        return null;
    }
}

// function to add the styles to the selected cells
function highlightSelectedCells(startCell, endCell) {
    const startCoords = getCellCoordinates(startCell.textContent);
    const endCoords = getCellCoordinates(endCell.textContent);

    if (!startCoords || !endCoords) {
        return;
    }

    resetCellStyles();

    const startRow = Math.min(startCoords.row, endCoords.row);
    const endRow = Math.max(startCoords.row, endCoords.row);
    const startCol = Math.min(startCoords.col, endCoords.col);
    const endCol = Math.max(startCoords.col, endCoords.col);

    selectedCells = [];

    for (let i = startRow; i <= endRow; i++) {
        for (let j = startCol; j <= endCol; j++) {
            if (table.rows[i] && table.rows[i].cells[j]) {
                const cell = table.rows[i].cells[j];
                cell.style.border = "2px solid red";
                selectedCells.push(cell);
            }
        }
    }
}

// function to reset the styles of the cells
function resetCellStyles() {
    const cells = table.getElementsByTagName("td");
    for (let cell of cells) {
        cell.style.backgroundColor = "";
        cell.style.border = `${borderWidth || 1}px solid ${
            borderColor || "#000"
        }`;
    }
    selectedCells = [];
}

// Disable the button on first site load
function disableControllerButtons() {
    const controllerButtons = document.querySelectorAll(".controllers button");
    controllerButtons.forEach((button) => {
        button.disabled = true;
    });
}

// Enable the button on first site load
function enableControllerButtons() {
    const controllerButtons = document.querySelectorAll(".controllers button");
    controllerButtons.forEach((button) => {
        button.disabled = false;
    });
}

// Toggle style buttons based on table state
function toggleStyleButtons() {
    const controllerButtons = document.querySelectorAll(".controllers button");
    const canAddRow = table.rows.length < 10; // Example condition
    const canRemoveRow = table.rows.length > 1;

    controllerButtons.forEach((button) => {
        if (button.id === "add-row") {
            button.disabled = !canAddRow;
        } else if (button.id === "remove-row") {
            button.disabled = !canRemoveRow;
        }
    });
}

// intialize the table
function initializeTable() {
    renderTable();
    isInitialized = true;
    enableControllerButtons();
}

// Utility functions for creating cell elements
function createCellContainer() {
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "100%";
    container.style.height = "100%";
    return container;
}

function createTextSpan(content) {
    const span = document.createElement("span");
    span.textContent = content;
    span.style.display = "block";
    span.style.width = "100%";
    span.style.height = "100%";
    return span;
}

function createCell(rowIndex, colIndex, content, cell) {
    const cellContainer = createCellContainer();
    const textSpan = createTextSpan(
        content || `Cell ${rowIndex + 1}-${colIndex + 1}`
    );

    cellContainer.appendChild(textSpan);
    cell.appendChild(cellContainer);

    // Add jQuery click event handler
    $(cell).on("click", function (e) {
        selectCell(cell);
    });

    cell.style.border = `${borderWidth || 1}px solid ${borderColor || "#000"}`;
    return cell;
}

// Helper function for selecting cells in a range
function selectCellsInRange(
    startRow,
    endRow,
    startCol,
    endCol,
    onlyRow = false,
    onlyCol = false
) {
    for (let i = startRow; i <= endRow; i++) {
        const row = table.rows[i];
        if (!row) continue;

        for (let j = 0; j < row.cells.length; j++) {
            const currentCell = row.cells[j];
            const currentCellCoords = getCellCoordinates(
                currentCell.textContent
            );

            if (!currentCellCoords) continue;

            const shouldSelect = onlyRow
                ? currentCellCoords.row === startRow &&
                  currentCellCoords.col >= startCol &&
                  currentCellCoords.col <= endCol
                : onlyCol
                ? currentCellCoords.col === startCol &&
                  currentCellCoords.row >= startRow &&
                  currentCellCoords.row <= endRow
                : currentCellCoords.row >= startRow &&
                  currentCellCoords.row <= endRow &&
                  currentCellCoords.col >= startCol &&
                  currentCellCoords.col <= endCol;

            if (shouldSelect) {
                currentCell.querySelector(
                    'input[type="checkbox"]'
                ).checked = true;
                currentCell.style.border = "2px solid red";
                if (!selectedCells.includes(currentCell)) {
                    selectedCells.push(currentCell);
                }
            }
        }
    }
}

// Updated functions using the new utilities
function renderTable() {
    table.innerHTML = "";
    for (let i = 0; i < table_Array.length; i++) {
        const newRow = table.insertRow();
        for (let j = 0; j < table_Array[i].length; j++) {
            const cellData = table_Array[i][j];
            if (cellData === null) continue;

            const newCell = newRow.insertCell();
            if (typeof cellData === "object") {
                createCell(i, j, cellData.content, newCell);
                newCell.rowSpan = cellData.rowSpan;
                newCell.colSpan = cellData.colSpan;
            } else {
                createCell(i, j, cellData, newCell);
            }
        }
    }
}

function addRow() {
    if (!isInitialized) {
        initializeTable();
        return;
    }

    const newRow = table.insertRow();
    const rowData = [];
    for (let i = 0; i < table_Array[0].length; i++) {
        const newCell = newRow.insertCell();
        createCell(newRow.rowIndex, i, null, newCell);
        rowData.push(newCell.textContent);
    }
    table_Array.push(rowData);
    toggleStyleButtons();
    storeTableState();
}

function addColumn() {
    if (!isInitialized) {
        initializeTable();
        return;
    }

    for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        const row = table.rows[rowIndex];
        const newCell = row.insertCell();
        createCell(rowIndex, row.cells.length - 1, null, newCell);
        table_Array[rowIndex].push(newCell.textContent);
    }
    storeTableState();
}

function removeRow() {
    if (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
        table_Array.pop();
        toggleStyleButtons(); // Call to update button states
        storeTableState();
    } else {
        alert("Last cell remaining! can't remove.");
    }
}

function removeColumn() {
    console.log(table.rows);
    for (let row of table.rows) {
        if (row.cells.length > 1) {
            row.deleteCell(row.cells.length - 1);
            table_Array[row.rowIndex].pop();
        } else {
            alert("Last cell remaining! can't remove.");
            break;
        }
    }
    storeTableState();
}

// function to select cells in table html / css add/remove class
function selectCell(cell) {
    // If clicking an already selected cell, reset all selections
    if (selectedCells.includes(cell)) {
        resetCellStyles();
        return;
    }

    if (selectedCells.length === 0) {
        // First cell selection
        $(cell).css("border", "2px solid red");
        selectedCells.push(cell);
    } else {
        // Second cell selection - select all cells in between
        const firstCell = selectedCells[0];
        const firstCoords = getCellCoordinates(firstCell.textContent);
        const currentCoords = getCellCoordinates(cell.textContent);

        // Reset previous selection except the first cell
        resetCellStyles();
        selectedCells = [firstCell];
        $(firstCell).css("border", "2px solid red");

        // Rest of the selection logic remains the same
        const isFirstCellMergedVertically = firstCell.rowSpan > 1;
        const isFirstCellMergedHorizontally = firstCell.colSpan > 1;

        if (isFirstCellMergedVertically) {
            // Vertical selection logic
            if (firstCoords.col !== currentCoords.col) {
                alert(
                    "Merged cells can only be extended in the same direction!"
                );
                resetCellStyles();
                return;
            }

            const startRow = Math.min(firstCoords.row, currentCoords.row);
            const endRow = Math.max(firstCoords.row, currentCoords.row);

            for (let i = startRow; i <= endRow; i++) {
                const row = table.rows[i];
                if (!row) continue;

                for (let j = 0; j < row.cells.length; j++) {
                    const currentCell = row.cells[j];
                    const currentCellCoords = getCellCoordinates(
                        currentCell.textContent
                    );

                    if (
                        currentCellCoords &&
                        currentCellCoords.col === firstCoords.col
                    ) {
                        $(currentCell).css("border", "2px solid red");
                        if (!selectedCells.includes(currentCell)) {
                            selectedCells.push(currentCell);
                        }
                        break;
                    }
                }
            }
        } else if (isFirstCellMergedHorizontally) {
            // Horizontal selection logic remains similar, just update the styling
            // ... existing horizontal selection logic ...
            // Replace checkbox checks with jQuery border styling
            $(currentCell).css("border", "2px solid red");
        } else {
            // Normal selection
            const startRow = Math.min(firstCoords.row, currentCoords.row);
            const endRow = Math.max(firstCoords.row, currentCoords.row);
            const startCol = Math.min(firstCoords.col, currentCoords.col);
            const endCol = Math.max(firstCoords.col, currentCoords.col);

            for (let i = startRow; i <= endRow; i++) {
                const row = table.rows[i];
                if (!row) continue;

                for (let j = 0; j < row.cells.length; j++) {
                    const currentCell = row.cells[j];
                    const currentCellCoords = getCellCoordinates(
                        currentCell.textContent
                    );

                    if (
                        currentCellCoords &&
                        currentCellCoords.row >= startRow &&
                        currentCellCoords.row <= endRow &&
                        currentCellCoords.col >= startCol &&
                        currentCellCoords.col <= endCol
                    ) {
                        $(currentCell).css("border", "2px solid red");
                        if (!selectedCells.includes(currentCell)) {
                            selectedCells.push(currentCell);
                        }
                    }
                }
            }
        }
    }

    toggleMergeUnmergeButtons();
}

// button disable / enable
function toggleMergeUnmergeButtons() {
    const mergeButton = document.querySelector(".merge-button");
    const unmergeButton = document.querySelector(".unmerge-button");

    if (selectedCells.length > 1) {
        mergeButton.disabled = false;
        unmergeButton.disabled = true;
    } else if (
        selectedCells.length === 1 &&
        (selectedCells[0].rowSpan > 1 || selectedCells[0].colSpan > 1)
    ) {
        mergeButton.disabled = true;
        unmergeButton.disabled = false;
    } else {
        mergeButton.disabled = true;
        unmergeButton.disabled = true;
    }
}

// Logic: Get Last selected cell's values and give row & col span to first one.
function mergeCells() {
    if (selectedCells.length < 2) return;

    const firstCell = selectedCells[0];
    const lastCell = selectedCells[selectedCells.length - 1];
    const startCoords = getCellCoordinates(firstCell.textContent);
    const endCoords = getCellCoordinates(lastCell.textContent);

    // Determine if current selection is vertical or horizontal
    const isVerticalSelection = startCoords.col === endCoords.col;
    const isHorizontalSelection = startCoords.row === endCoords.row;

    // Check each selected cell for existing merges
    for (let cell of selectedCells) {
        if (cell.rowSpan > 1) {
            // Cell is merged vertically, prevent horizontal merging
            if (!isVerticalSelection) {
                alert(
                    "Cannot merge horizontally: One or more cells are already merged vertically!"
                );
                resetCellStyles();
                return;
            }
        }
        if (cell.colSpan > 1) {
            // Cell is merged horizontally, prevent vertical merging
            if (!isHorizontalSelection) {
                alert(
                    "Cannot merge vertically: One or more cells are already merged horizontally!"
                );
                resetCellStyles();
                return;
            }
        }
    }

    // Proceed with merging
    const rowSpan = Math.abs(endCoords.row - startCoords.row) + 1;
    const colSpan = Math.abs(endCoords.col - startCoords.col) + 1;

    firstCell.rowSpan = rowSpan;
    firstCell.colSpan = colSpan;

    // Remove other cells
    selectedCells.forEach((cell) => {
        if (cell !== firstCell) {
            cell.remove();
        }
    });

    // Update table array with merge information
    updateTableArray(
        startCoords,
        endCoords,
        firstCell.textContent,
        rowSpan,
        colSpan
    );

    resetCellStyles();
    document.querySelector(".merge-button").disabled = true;
    document.querySelector(".unmerge-button").disabled = false;
    storeTableState();
}

// Logic: Get the merged cell and store its colspan & rowspan value,
// iterate 2 loops row & cols, add misssing elements from row to col.
// Note: Last element should be cell row (n + row_span_value) - col (m + col_span_value)
function unmergeCells() {
    if (selectedCells.length !== 1) return;

    const cell = selectedCells[0];
    if (cell.rowSpan === 1 && cell.colSpan === 1) return;

    const coords = getCellCoordinates(cell.textContent);
    if (!coords) return;

    const originalRowSpan = cell.rowSpan;
    const originalColSpan = cell.colSpan;

    cell.rowSpan = 1;
    cell.colSpan = 1;

    for (let i = coords.row; i < coords.row + originalRowSpan; i++) {
        const currentRow = table.rows[i];
        for (let j = coords.col; j < coords.col + originalColSpan; j++) {
            if (i === coords.row && j === coords.col) continue;

            let insertIndex = j;
            const cells = currentRow.cells;
            for (let k = 0; k < j; k++) {
                if (cells[k] && cells[k].colSpan > 1) {
                    insertIndex -= cells[k].colSpan - 1;
                }
            }

            const newCell = currentRow.insertCell(insertIndex);
            createCell(i, j, null, newCell);
        }
    }

    restoreTableArray(coords, originalRowSpan, originalColSpan);
    resetCellStyles();
    document.querySelector(".unmerge-button").disabled = true;
    storeTableState();
}

// Update the table array storage to include merge information
function updateTableArray(startCoords, endCoords, content, rowSpan, colSpan) {
    for (let i = startCoords.row; i <= endCoords.row; i++) {
        for (let j = startCoords.col; j <= endCoords.col; j++) {
            if (i === startCoords.row && j === startCoords.col) {
                table_Array[i][j] = {
                    content: content,
                    rowSpan: rowSpan,
                    colSpan: colSpan,
                };
            } else {
                table_Array[i][j] = null; // Mark merged cells
            }
        }
    }
}

// function to add missing cells back to table!
function restoreTableArray(coords, rowSpan, colSpan) {
    for (let i = coords.row; i < coords.row + rowSpan; i++) {
        for (let j = coords.col; j < coords.col + colSpan; j++) {
            table_Array[i][j] = `Cell ${i + 1}-${j + 1}`;
        }
    }
}

// function to apply table styles based on user's selection
function applyTableStyles() {
    width = document.getElementById("table-width").value;
    height = document.getElementById("table-height").value;
    tableColor = document.getElementById("color_input").value;
    borderColor = document.getElementById("table-border-color-input").value;
    borderWidth = document.getElementById("table_border_input").value;
    cellSpacing = document.getElementById("table_cell_spacing_input").value;
    cellPadding = document.getElementById("table_cell_padding_input").value;

    table.style.width = `${width}px`;
    table.style.height = `${height}px`;
    table.style.backgroundColor = tableColor;
    table.style.border = `${borderWidth}px solid ${borderColor}`;
    table.cellSpacing = cellSpacing;
    table.cellPadding = cellPadding;
    const cells = table.getElementsByTagName("td");
    for (let cell of cells) {
        if (!selectedCells.includes(cell)) {
            cell.style.border = `${borderWidth}px solid ${borderColor}`;
        }
    }
    storeTableState();
}

// function to align table based on dropdown.
function tableAlign(alignment) {
    tableAlignMent = alignment;
    table.parentElement.style.justifyContent = alignment;
    storeTableState();
}

// disable all buttons on first page load (Except addRow / addColumn)
disableControllerButtons();
document.querySelector(".controllers .btn-outline-success").disabled = false;

//store all states so on reloading nothig gets lost:
// Function to store table state in localStorage
function storeTableState() {
    const tableState = {
        tableArray: table_Array,
        width: document.getElementById("table-width").value,
        height: document.getElementById("table-height").value,
        tableColor: document.getElementById("color_input").value,
        tableAlignment: tableAlignMent,
        borderColor: document.getElementById("table-border-color-input").value,
        borderWidth: document.getElementById("table_border_input").value,
        cellSpacing: document.getElementById("table_cell_spacing_input").value,
        cellPadding: document.getElementById("table_cell_padding_input").value,
    };
    localStorage.setItem("tableState", JSON.stringify(tableState));
}

// Function to load table state from localStorage
function loadTableState() {
    const savedState = localStorage.getItem("tableState");
    if (savedState) {
        const tableState = JSON.parse(savedState);

        // Restore table array and render
        table_Array = tableState.tableArray;
        renderTable();

        // Restore input values
        document.getElementById("table-width").value = tableState.width;
        document.getElementById("table-height").value = tableState.height;
        document.getElementById("color_input").value = tableState.tableColor;
        document.getElementById("table-border-color-input").value =
            tableState.borderColor;
        document.getElementById("table_border_input").value =
            tableState.borderWidth;
        document.getElementById("table_cell_spacing_input").value =
            tableState.cellSpacing;
        document.getElementById("table_cell_padding_input").value =
            tableState.cellPadding;

        // Apply saved styles
        applyTableStyles();
        if (tableState.tableAlignment) {
            tableAlign(tableState.tableAlignment);
        }

        // Enable buttons if table exists
        if (table_Array.length > 0) {
            isInitialized = true;
            enableControllerButtons();
        }
    }
}

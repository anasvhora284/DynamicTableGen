# Dynamic Table Generator

## Overview

The main functionality begins with the `addRow` and `addColumn` functions. Both functions first check if the table has been initialized. If not, they will add either a row or a column based on the function called.

### Note:

The following functions are used for these operations: `addRow`, `addColumn` -> `InitializeTable` -> `RenderTable` -> change initialization value to false -> enable all other buttons.

Once the table is initialized, we can perform various tasks:

-   Add and remove rows and columns
-   Merge and unmerge cells

It is essential to keep the synchronization between the 2D table array and the HTML table.

## Add Row Operation:

1. Creates a new array of cells with the same width as the existing table.
2. Pushes this new row into the 2D array.
3. Updates the HTML table by adding a new `<tr>` with appropriate `<td>` elements.
4. Maintains cell properties like `colspan` and `rowspan` if any exist.

## Add Column Operation:

1. Iterates through each row in the 2D array.
2. Adds a new cell at the end of each row.
3. Updates the HTML table by adding new `<td>` elements to each row.
4. Adjusts the table width accordingly.
5. Considers existing merged cells to maintain table structure.

## Merge Cells Operation:

1. Takes selected cells as input (must be adjacent cells).
2. Calculates the total span (both row and column) of the selected area.
3. Updates the first cell in the selection with new `colspan`/`rowspan` values.
4. Removes other cells from the 2D array (marks as null or empty).
5. Updates the HTML table to reflect the merged structure.
6. Maintains data consistency between the array and visual representation.

## Unmerge Cells Operation:

1. Identifies the merged cell by its `colspan`/`rowspan` values.
2. Calculates original cell positions.
3. Restores individual cells in the 2D array.
4. Removes `colspan`/`rowspan` attributes.
5. Updates the HTML table by splitting the merged cell back into individual cells.
6. Resets all cells to default properties.

### Note:

All operations maintain synchronization between the 2D array data structure and the HTML table representation to ensure data integrity.

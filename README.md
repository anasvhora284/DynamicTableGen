Start:-
    So the main thing starts from the addRow or addColumn Functions.
    Both functions first checks if the table has been intialised or not, if not it adds one row or one column based on the function called.

    Note:-
    used functions for this operations: addRow, addColumn -> InitialiseTable -> Rendertable -> change init value to false -> enable all other buttons.

    once there's Table we can performe tasks:
    Add & remove the rows & columns, merge & unmerge the cells.

    keep the sync between 2d table array & html table.

Add Row Operation:-
    1. Creates a new array of cells with the same width as existing table
    2. Pushes this new row into the 2D array
    3. Updates the HTML table by adding a new <tr> with appropriate <td> elements
    4. Maintains cell properties like colspan and rowspan if any exist

Add Column Operation:-
    1. Iterates through each row in the 2D array
    2. Adds a new cell at the end of each row
    3. Updates the HTML table by adding new <td> elements to each row
    4. Adjusts the table width accordingly
    5. Considers existing merged cells to maintain table structure

Merge Cells Operation:-
    1. Takes selected cells as input (must be adjacent cells)
    2. Calculates the total span (both row and column) of selected area
    3. Updates the first cell in selection with new colspan/rowspan values
    4. Removes other cells from the 2D array (marks as null or empty)
    5. Updates HTML table to reflect merged structure
    6. Maintains data consistency between array and visual representation

Unmerge Cells Operation:-
    1. Identifies merged cell by its colspan/rowspan values
    2. Calculates original cell positions
    3. Restores individual cells in the 2D array
    4. Removes colspan/rowspan attributes
    5. Updates HTML table by splitting merged cell back into individual cells
    6. Resets all cells to default properties

Note: All operations maintain synchronization between the 2D array data structure and the HTML table representation to ensure data integrity.
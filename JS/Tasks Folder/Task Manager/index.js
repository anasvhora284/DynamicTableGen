$(document).ready(function () {
    let stageCount = 1;
    let currentStageId = null;

    // Restore data from local storage
    restoreData();

    // Handle adding tasks to any stage
    $(document).on("click", ".add-button", function () {
        currentStageId = $(this)
            .closest(".task-management-main-div")
            .attr("id");

        $(".pop-up-box-add-task")
            .removeClass("hide-popup")
            .addClass("show-popup");

        $(".list-container").addClass("blur-background");
        $(".popupbox-heading").text("Add new task");

        // Clear existing buttons and add the Add button
        $(".popup-buttons").remove();
        $(".inputs-container").append(`
            <div class="popup-buttons">
                <button id="add-task-button" class="action-button">Add</button>
            </div>
        `);
    });

    // handle popup close
    $("#close-add-task-popup").click(function () {
        $(".pop-up-box-add-task")
            .removeClass("show-popup")
            .addClass("hide-popup");
        $(".list-container").removeClass("blur-background");
    });

    // on click hanlder of add task button
    $(document).on("click", "#add-task-button", function () {
        const taskName = $("#new-task-name-input").val().trim();
        if (taskName) {
            const currentDate = new Date().toISOString().split("T")[0];
            addTaskToStage(currentStageId, taskName, currentDate);
            storeData();
            closePopup();
        }
    });

    // Handle adding new stages
    $("#add-new-stage-button").click(function () {
        const stageName = prompt(
            "Enter the stage name:",
            `Stage ${stageCount}`
        );
        if (stageName) {
            const newStage = createStageHTML(stageCount, stageName);
            $(newStage).insertBefore(".new-list-div");
            initializeDragAndDrop();
            storeData();
            stageCount++;
        }
    });

    // edit the existing tasks
    $(document).on("click", ".edit-task", function () {
        const taskItem = $(this).closest("li");
        const currentText = taskItem.find(".task-text").text().trim();

        $("#new-task-name-input").val(currentText);
        $(".popupbox-heading").text("Edit task");

        // Clear existing buttons and add the Update button
        $(".popup-buttons").remove();
        $(".inputs-container").append(`
            <div class="popup-buttons">
                <button id="edit-task-confirm" class="action-button">Update</button>
            </div>
        `);

        $(".pop-up-box-add-task")
            .removeClass("hide-popup")
            .addClass("show-popup");
        $(".list-container").addClass("blur-background");

        $("#edit-task-confirm")
            .off()
            .on("click", function () {
                const newText = $("#new-task-name-input").val().trim();
                if (newText) {
                    taskItem.find(".task-text").text(newText);
                    storeData();
                    closePopup();
                }
            });
    });

    // Delete the tasks
    $(document).on("click", ".delete-task", function () {
        $(this).closest("li").remove();
        storeData();
    });

    // Delete the stages
    $(document).on("click", ".delete-stage", function () {
        const stageDiv = $(this).closest(".task-management-main-div");
        stageDiv.remove();
        storeData();
    });

    // Initialize drag and drop on document ready
    $(document).ready(function () {
        initializeDragAndDrop();
    });

    // Add function to close popupWW
    function closePopup() {
        $(".pop-up-box-add-task")
            .removeClass("show-popup")
            .addClass("hide-popup");
        $(".list-container").removeClass("blur-background");
        $("#new-task-name-input").val("");
        $(".popup-buttons").remove();
        currentStageId = null;
    }

    // Function to create stage HTML
    function createStageHTML(count, name) {
        return `
            <div class="task-management-main-div" id="stage${count}">
                <div class="list-header">
                    <span>${name}</span>
                    <div class="stage-icons">
                        <i class="fa fa-plus add-button" id="addList${count}"></i>
                        <i class="fa fa-trash delete-stage"></i>
                    </div>
                </div>
                <div>
                    <ul id="list${count}-ul" class="list-ul"></ul>
                </div>
            </div>
        `;
    }

    // Function to add task to a specific stage
    function addTaskToStage(stageId, taskText, taskDate) {
        let dateText = "";
        if (taskDate) {
            dateText = convertDateToText(taskDate);
        }

        const taskHTML = `
            <li>
                <span class="task-text">${taskText}</span>
                ${
                    dateText
                        ? '<span class="date-text"> (' + dateText + ")</span>"
                        : ""
                }
                <div class="task-icons">
                    <i class="fa fa-edit edit-task"></i>
                    <i class="fa fa-trash delete-task"></i>
                </div>
            </li>
        `;
        $(`#${stageId} .list-ul`).append(taskHTML);
    }

    // Function to convert date (starting: 01-01-2025 to ending: 10-01-2025) to text (10 days from now on || 10 days ago)
    function convertDateToText(selectedDate) {
        let currentDate = new Date();
        let selectedDateObj = new Date(selectedDate);

        currentDate.setHours(0, 0, 0, 0);
        selectedDateObj.setHours(0, 0, 0, 0);

        let diff = selectedDateObj - currentDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let future = days >= 0;
        days = Math.abs(days);
        let result = "";

        if (days === 0) {
            result += "Today";
        } else if (days === 1) {
            result += future ? "Tomorrow" : "Yesterday";
        } else if (days < 7) {
            result += days + " days ";
        } else if (days >= 7 && days < 30) {
            result += Math.floor(days / 7) + " weeks ";
        } else if (days >= 30 && days < 365) {
            result += Math.floor(days / 30) + " months ";
        } else {
            result += Math.floor(days / 365) + " years ";
        }

        if (days > 1) {
            // Don't add "ago" or "from now" for "Today"
            result += future ? "from now" : "ago";
        }

        return result;
    }

    // Update drag and drop initialization with classes for dragged elements
    function initializeDragAndDrop() {
        // Make stages sortable
        $(".list-container").sortable({
            start: function (event, ui) {
                ui.item.addClass("animate-drag-element");
            },
            items: ".task-management-main-div",
            handle: ".list-header",
            cursor: "move",
            stop: function (event, ui) {
                ui.item.removeClass("animate-drag-element");
                storeData();
            },
        });

        // Make tasks sortable within and between stages
        $(".list-ul").sortable({
            connectWith: $(this).parent(),
            cursor: "move",
            stop: function (event, ui) {
                storeData();
            },
        });
    }

    // Function to restoreData from local storage
    function restoreData() {
        const jsonData = JSON.parse(localStorage.getItem("stages"));
        const data = jsonData ? Object.entries(jsonData) : null;
        if (data) {
            data.forEach(([stageId, [stageName, tasks]]) => {
                const Id = stageId.split("stage")[1];
                const newStage = createStageHTML(Id, stageName);
                $(newStage).insertBefore(".new-list-div");
                tasks.forEach((task) => {
                    addTaskToStage(stageId, task.text, task.date);
                });
            });
            stageCount = data.length;
            initializeDragAndDrop(); // Initialize drag and drop after restoring
        }
    }

    // Store data to local storage
    function storeData() {
        const data = {};
        $(".task-management-main-div").each(function () {
            const stageId = $(this).attr("id");
            const stageName = $(this).find(".list-header span").text();
            const tasks = $(this)
                .find(".list-ul li")
                .map(function () {
                    return {
                        text: $(this).find(".task-text").text(),
                        date: new Date().toISOString().split("T")[0], // Store the date in ISO format
                    };
                })
                .get();
            data[stageId] = [stageName, tasks];
        });
        localStorage.setItem("stages", JSON.stringify(data));
    }
});

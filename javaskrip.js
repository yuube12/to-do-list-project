document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("add-button");
    var toDoEntryBox = document.getElementById("todo-entry-box");
    var toDoList = document.getElementById("todo-list");
    var clearButton = document.getElementById("clear-completed-button");
    var emptyButton = document.getElementById("empty-button");
    var saveButton = document.getElementById("save-button");

    addButton.addEventListener("click", function(event) {
        event.preventDefault();
        addToDoItem();
    });

    function addToDoItem() {
        var itemText = toDoEntryBox.value.trim();
        if (itemText !== "") {
            newToDoItem(itemText, false);
            toDoEntryBox.value = "";
        }
    }

    function newToDoItem(itemText, completed) {
        var toDoItem = document.createElement("li");
        toDoItem.textContent = itemText;

        if (completed) {
            toDoItem.classList.add("completed");
        }

        toDoList.appendChild(toDoItem);
        toDoItem.addEventListener("dblclick", toggleToDoItemState);
    }

    function toggleToDoItemState() {
        this.classList.toggle("completed");
    }

    clearButton.addEventListener("click", function() {
        var completedItems = Array.from(toDoList.getElementsByClassName("completed"));
        completedItems.forEach(item => item.remove());
    });

    emptyButton.addEventListener("click", function() {
        toDoList.innerHTML = "";
    });

    saveButton.addEventListener("click", function() {
        var toDos = [];
        for (var i = 0; i < toDoList.children.length; i++) {
            var toDo = toDoList.children[i];
            toDos.push({
                "task": toDo.textContent,
                "completed": toDo.classList.contains("completed")
            });
        }
        localStorage.setItem("toDos", JSON.stringify(toDos));
    });

    function loadList() {
        var savedToDos = localStorage.getItem("toDos");
        if (savedToDos) {
            var toDos = JSON.parse(savedToDos);
            toDos.forEach(item => {
                newToDoItem(item.task, item.completed);
            });
        }
    }

    loadList();
});

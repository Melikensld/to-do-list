document.addEventListener("DOMContentLoaded", function() {
    loadList();
});

function loadList() {
    document.getElementById("list").innerHTML = "";

    let list = JSON.parse(localStorage.getItem("tasks")) || [];
    list.forEach((item) => {
        addListItem(item.text, item.checked);
    });
}

function saveList() {
    let listItems = document.querySelectorAll("#list li");
    let list = [];
    listItems.forEach((item) => {
        list.push({
            text: item.childNodes[0].nodeValue,
            checked: item.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(list));
}

function newElement() {
    let inputValue = document.getElementById("task").value;

    if (inputValue.trim() !== "") {
        addListItem(inputValue);
        saveList();

        let successToast = document.getElementById("liveToast");
        successToast.classList.remove("hide");
        successToast.classList.add("show");

        setTimeout(() => {
            successToast.classList.remove("show");
            successToast.classList.add("hide");
        }, 4000);
    } else {
        let errorToast = document.getElementById("liveToastError");
        errorToast.classList.remove("hide");
        errorToast.classList.add("show");

        setTimeout(() => {
            errorToast.classList.remove("show");
            errorToast.classList.add("hide");
        }, 4000);
    }
}

function addListItem(text, checked = false) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    if (checked) {
        li.classList.add("checked");
    }
    li.onclick = toggleCompleted;

    let span = document.createElement("span");
    span.textContent = "×";
    span.className = "close";
    span.onclick = deleteElement;
    li.appendChild(span);

    document.getElementById("list").appendChild(li);
    document.getElementById("task").value = "";
}

function deleteElement(event) {
    event.stopPropagation(); 
    this.parentElement.remove();
    saveList();
}

function toggleCompleted(event) {
    event.stopPropagation(); 
    this.classList.toggle("checked");
    saveList();
}

let existingListItems = document.querySelectorAll("#list li");
existingListItems.forEach((item) => {
    item.onclick = toggleCompleted;

    let span = document.createElement("span");
    span.textContent = "×";
    span.className = "close";
    span.onclick = deleteElement;
    item.appendChild(span);
});

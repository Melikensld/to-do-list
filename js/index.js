function newElement() {
  let inputValue = document.getElementById("task").value;

  if (inputValue.trim() !== "") {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));

    let span = document.createElement("span");
    span.textContent = "×";
    span.className = "close";
    span.onclick = deleteElement;
    li.appendChild(span);

    document.getElementById("list").appendChild(li);
    document.getElementById("task").value = "";

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

function deleteElement() {
  this.parentElement.remove();
}

function toggleCompleted() {
  this.classList.toggle("checked");
}

let listItems = document.querySelectorAll("#list li");
listItems.forEach((item) => {
  item.onclick = toggleCompleted;
});

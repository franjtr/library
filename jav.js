const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id=crypto.randomUUID()
}

function addBookToLibrary(book) {
    myLibrary.push(new Book(book.title, book.author, book.pages, book.read));
}

addBookToLibrary({title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: "Read"});
addBookToLibrary({title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178, read: "Not Read"});

var table=document.getElementById("table");
table.oldHTML=table.innerHTML;

function displayBooks(){
    table.innerHTML=table.oldHTML;
    for (let i = 0; i < myLibrary.length; i++) {
        var row = table.insertRow(i+1);
        row.id = myLibrary[i].id;
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML=myLibrary[i].title;
        cell2.innerHTML=myLibrary[i].author;
        cell3.innerHTML=myLibrary[i].pages;
        if(myLibrary[i].read == "Read"){
            cell4.innerHTML='<button class="read" onclick="readStatus(\'' + myLibrary[i].id + '\')">Read</button>';
        }
        else{
            cell4.innerHTML='<button class="notRead" onclick="readStatus(\'' + myLibrary[i].id + '\')">Not Read</button>';
        }
        cell5.innerHTML='<button class="delete" onclick="deleteRow(\'' + myLibrary[i].id + '\')">X</button>';
    }
}

function deleteRow(rowid){   
    var row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == rowid) {
            myLibrary.splice(i, 1);
        }
    }
}

function readStatus(rowid){
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == rowid) {
            if(myLibrary[i].read == "Read"){
                myLibrary[i].read = "Not Read";
            }
            else{
                myLibrary[i].read = "Read";
            }
        }
    }
    displayBooks();
}

const myform = document.forms["form"];
myform.onsubmit = function(e){
    e.preventDefault();
    addBookToLibrary({title: myform.bookName.value, author: myform.author.value, pages: myform.pages.value, read: myform.readStatus.value});
    displayBooks();
    myform.reset();
}

displayBooks();
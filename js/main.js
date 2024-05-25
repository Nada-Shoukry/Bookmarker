
// select HTML Elements:

var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");

var bookmarkNameAlert = document.getElementById("alertName");
var bookmarkUrlAlert = document.getElementById("alertUrl");


// var bookmarksArray= [];

// if (localStorage.getItem("bookmarks") != null){
//     bookmarksArray = JSON.parse(localStorage.getItem("bookmarks"));
//     displayBookmark();
// }


var bookmarksArray= JSON.parse(localStorage.getItem("bookmarks")) ?? [];
displayBookmark();

// function to add bookmarks in an array ..

function addBookmark() {

    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkURL.value
    }

    validateInputs(bookmark);

}


// Validation for Website Inputs ... 

function validateInputs(bookmark){

    if ((/^\w{3,}(\s+\w+)*$/.test(bookmarkName.value) == true) && ( /^((http|https):\/\/)(w{3}\.)[a-zA-Z0-9.-]+\.[a-z]{2,6}([\/?].*)?$/.test(bookmarkURL.value) == true)){

            bookmarkNameAlert.classList.add("d-none");
            bookmarkName.classList.add("is-valid");
            bookmarkName.classList.remove("is-invalid");

            bookmarkUrlAlert.classList.add("d-none");
            bookmarkURL.classList.add("is-valid");
            bookmarkURL.classList.remove("is-invalid");

            bookmarksArray.push(bookmark);
    
            onDataChange();
            clearInputs();
           
    } 

    else if ( (/^\w{3,}(\s+\w+)*$/.test(bookmarkName.value)) == false || (/^((http|https):\/\/)(w{3}\.)[a-zA-Z0-9.-]+\.[a-z]{2,6}([\/?].*)?$/.test(bookmarkURL.value)) == true){
    
        bookmarkNameAlert.classList.remove("d-none");
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        bookmarkUrlAlert.classList.add("d-none");
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");

    } 
    
    else if ((/^\w{3,}(\s+\w+)*$/.test(bookmarkName.value)) == true || (/^((http|https):\/\/)(w{3}\.)[a-zA-Z0-9.-]+\.[a-z]{2,6}([\/?].*)?$/.test(bookmarkURL.value)) == false ){

        bookmarkNameAlert.classList.add("d-none");
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");

        bookmarkUrlAlert.classList.remove("d-none");
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");

    } 
    
    else{
        bookmarkNameAlert.classList.remove("d-none");
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        bookmarkUrlAlert.classList.remove("d-none");
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");
    }

}


// function on change data = store in local storage & dispaly data ..

function onDataChange (){

    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
    displayBookmark();

}


//  function to dispaly array of bookmarks in the table ..

function displayBookmark (){

    var box = "";

    for (var i=0; i < bookmarksArray.length ; i++){
        box += `
            <tr>
            <td>${i+1}</td>
            <td>${bookmarksArray[i].name}</td>

            <td><button onclick="visitBookmark(${i})" class="btn btn-outline-success"><i class="fa-solid fa-eye"></i> Visit</button></td>

            <td><button onclick="deleteBookmark(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `
        }
        
    document.getElementById("tableBody").innerHTML = box;
}        


// function to clear form inputs ..

function clearInputs (){

    bookmarkName.value = "";
    bookmarkURL.value = "";

    bookmarkName.classList.remove("is-invalid");
    bookmarkName.classList.remove("is-valid");

    bookmarkURL.classList.remove("is-invalid");
    bookmarkURL.classList.remove("is-valid");

}


// function to delete Bookmark ..

function deleteBookmark (index){

    bookmarksArray.splice(index,1);
    onDataChange ();

}


// Visit bookmark URL function ...

function visitBookmark (index){

    console.log(bookmarksArray[index].url);

    window.open(bookmarksArray[index].url);

}





 








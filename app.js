const firebaseConfig = {
    apiKey: "AIzaSyCm8mX5zvtWhd1d_3B19FHDp3XLbOcZLiA",
    authDomain: "dat-base-todo.firebaseapp.com",
    projectId: "dat-base-todo",
    storageBucket: "dat-base-todo.appspot.com",
    messagingSenderId: "488119501389",
    appId: "1:488119501389:web:e4e5edc964811e786d5204"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var database = app.database

///Geting data from firebase//

firebase.database().ref('todoData').on('child_added', function (data) {

    console.log(data.val())



    var ul = document.getElementById("Second-main");
    var li = document.createElement("li");
    var tex = document.createTextNode(data.val().nam);
    var div = document.createElement("div");
    var btndiv = document.createElement("div");
    li.setAttribute("id", "li2")
    ul.setAttribute("class", "ul")


    li.appendChild(tex);
    ul.appendChild(div);
    div.appendChild(li)
    div.appendChild(btndiv)


    div.setAttribute("id", "ulinput");



    //delete buuton


    var del = document.createElement("button");
    del.innerHTML = '<i class="fas fa-times"></i>';
    del.setAttribute("onclick", "del(this)");
    del.setAttribute("id",data.val().key1)
    del.setAttribute("class", "delbtn");
    btndiv.appendChild(del);

    // edit button


    var edit = document.createElement("button");
    edit.innerHTML = '<i class="far fa-edit"></i>';
    edit.setAttribute("onclick", "edit(this)");
    edit.setAttribute("class", "editbtn");
    edit.setAttribute("id",data.val().key1)
    btndiv.appendChild(edit);


    //tick button
    var tick = document.createElement("button");
    tick.innerHTML = '<i class="fas fa-check"></i>';
    tick.setAttribute("onclick", "done(this)");
    tick.setAttribute("id", "delete");
    btndiv.appendChild(tick);



})

var get = document.getElementById("myinput");

function additems() {

   

    /// Adding value in  Database

    if (get.value === "") {
        alert("Please fill the input")
    }
    else {


        var key = firebase.database().ref('todoData').push().key
        var data = {
            key1: key,
            nam: get.value

        }
        firebase.database().ref('todoData/' + key).set(data)

        get.value = "";
    }

}
function done(t) {

    var a = t.parentNode.parentNode.firstChild;
    a.setAttribute("class", "done");
    var b = t.parentNode.firstChild.nextSibling;

    b.disabled = true;

}

function del(d) {

    d.parentNode.parentNode.remove()
    firebase.database().ref("todoData/" + d.id).remove()
    console.log(d.id)

}

function edit(e) {

    var a = e.parentNode.parentNode.firstChild.innerHTML;

    var take = prompt("Edit the text", a);
    var editObj = {
        editNam: take, 
        key: e.id
    }
    console.log(editObj)
    firebase.database().ref('todoData/'+ e.id).set(editObj)
    e.parentNode.parentNode.firstChild.innerHTML = take;


}

function deleteAll(e) {

    var get = document.getElementById("Second-main");
    
    get.innerHTML = "";
    firebase.database().ref("todoData").remove()


}

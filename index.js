var firebaseConfig = {
    apiKey: "AIzaSyDZJ-51vMxB8PTlGZhTgkS2ftxJ3N_khkw",
    authDomain: "new-work-ccbe7.firebaseapp.com",
    databaseURL: "https://new-work-ccbe7.firebaseio.com",
    projectId: "new-work-ccbe7",
    storageBucket: "",
    messagingSenderId: "688164292556",
    appId: "1:688164292556:web:3eca004aac27a9f0"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// var metalObj = []
function addMetal() {
    var div = document.getElementById("mainDiv3");
    if (div.innerHTML === "") {
        div.innerHTML += `
        <form>
        <div class="form-group">
        <label for="exampleInputEmail1">Item Name</label>
        <input type="name" class="form-control input" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter ITem">
        <label for="exampleInputEmail1">Item Code</label>
        <input type="name" class="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Code">
        </div>
        <button type="button" class="btn btn-info" onclick = "addvalue()" >Add Metal</button>
        </form>
        `
    }
    div.style.display = "block";
}
function metalConstructor(name, code) {
    this.name = name,
        this.code = code
}
var inp1;
var inp2;
var metalCon;
function addvalue() {
    event.preventDefault();
    inp1 = document.getElementById("exampleInputEmail2").value;
    inp2 = document.getElementById("exampleInputEmail1").value;
    metalCon = new metalConstructor(inp1, inp2.toUpperCase());
    // metalObj.push(metalCon)
    database.ref().child('data').child('metal').child(inp1).set(metalCon)

    document.getElementById("exampleInputEmail2").value = "";
    document.getElementById("exampleInputEmail1").value = "";

    document.getElementById("inputGroupSelect01").innerHTML = "";
    metal();
    document.getElementById("mainDiv3").style.display = "none";

}
var metalName;
function metal() {
    var id = document.getElementById("inputGroupSelect01");
    database.ref().child('data').child('metal').on('value', (snap) => {
        var data = Object.values(snap.val())
        for (var i = 0; i < data.length; i++) {
            metalName = data[i].name;
            id.innerHTML += `
        <option value="${data[i].name}">${data[i].name}</option>
        `
        }

    })

}
metal()
function select1() {
    document.getElementById("inputGroupSelect02").removeAttribute("disabled");
    item()
}


function addItem() {
    var div = document.getElementById("mainDiv2");
    if (div.innerHTML === "") {
        div.innerHTML = `
        <form>
        <div class="form-group">
        <label for="exampleInputEmail1">Item Name</label>
        <input type="name" class="form-control input" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter ITem">
        <label for="exampleInputEmail1">Item Code</label>
        <input type="name" class="form-control input" id="exampleInputEmail4" aria-describedby="emailHelp" placeholder="Enter Code">
        </div>
        <button type="button" class="btn btn-info" onclick = "objAdd()" >Add item</button>
        </form>
        `
    }
    div.style.display = "block";
}
function itemConstructor(name, code) {
    this.name = name,
        this.code = code
}

function objAdd() {
    event.preventDefault();

    var value = document.getElementById("exampleInputEmail3").value;
    var value2 = document.getElementById("exampleInputEmail4").value;


    var itemCon = new itemConstructor(value, value2.toUpperCase());
    database.ref().child('data').child('item').child(value).set(itemCon)


    document.getElementById("exampleInputEmail3").value = "";
    document.getElementById("exampleInputEmail4").value = "";

    document.getElementById("inputGroupSelect02").innerHTML = "";
    document.getElementById("mainDiv2").style.display = "none";
    item();
}
var itemName;
function item() {
    var id = document.getElementById("inputGroupSelect02");
    id.innerHTML = ""
    database.ref().child('data').child('item').on('value', (snap) => {
        var data = Object.values(snap.val())
        for (var i = 0; i < data.length; i++) {
            itemName = data[i].name;
            id.innerHTML += `
            <option value="${data[i].name}">${data[i].name}</option>
            `
        }
    })

}
function itemCode(){
var index = document.getElementById("inputGroupSelect01").value;
var index1 = document.getElementById("inputGroupSelect02").value;
// console.log(index1)
let code1;
let code2;
database.ref().child('data').child('metal').child(index).on('value', (snap) => {
    var data = Object.values(snap.val())
    code1 = data[0];
    // for (var i = 0; i < data.length; i++) {
    //     console.log(data[i].code)
    // }
})
database.ref().child('data').child('item').child(index1).on('value', (snap) => {
    var data = Object.values(snap.val())
    code2 = data[0];
    // for (var i = 0; i < data.length; i++) {
    //     console.log(data[i])
    // }
})
    var date = new Date().getFullYear();
    var covert = date.toString().slice(2);

    var input = document.getElementById("inlineFormInputGroup");
    input.value = code1 + code2 + covert + "001";

}
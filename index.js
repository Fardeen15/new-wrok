var firebaseConfig = {
    apiKey: "AIzaSyDZJ-51vMxB8PTlGZhTgkS2ftxJ3N_khkw",
    authDomain: "new-work-ccbe7.firebaseapp.com",
    databaseURL: "https://new-work-ccbe7.firebaseio.com",
    projectId: "new-work-ccbe7",
    storageBucket: "new-work-ccbe7.appspot.com",
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
        <button type="button" class="btn btn-info" onclick = "cancel()" >Cancel</button>
        </form>
        `
    }
    div.style.display = "block";
}
function cancel() {
    document.getElementById("mainDiv3").style.display = "none"
    document.getElementById("mainDiv2").style.display = "none"
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
        id.innerHTML = `
        <option>--select--</option>
        `
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
    document.getElementById("inputGroupSelect02").innerHTML = `
    <option>--select--</option>    
    `
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
        <button type="button" class="btn btn-info" onclick = "cancel()" >Cancel</button>
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
    var id = document.getElementById("inputGroupSelect01").value;


    var itemCon = new itemConstructor(value, value2.toUpperCase());
    database.ref().child('data').child('metal').child(id).child('item').child(value).set(itemCon)


    document.getElementById("exampleInputEmail3").value = "";
    document.getElementById("exampleInputEmail4").value = "";

    document.getElementById("inputGroupSelect02").innerHTML = "";
    document.getElementById("mainDiv2").style.display = "none";
    item();
}
var itemName;
function item() {
    var id = document.getElementById("inputGroupSelect02");
    var id1 = document.getElementById("inputGroupSelect01").value;
    database.ref().child('data').child('metal').child(id1).child('item').on('value', (snap) => {
        var data = Object.values(snap.val());
        // console.log(data)
        if (data === []) {

            id.innerHTML = `
            <option>--select--</option>
            `
        }
        for (var i = 0; i < data.length; i++) {
            itemName = data[i].name;
            id.innerHTML += `
            <option value="${data[i].name}">${data[i].name}</option>
            `
        }
    })

}
// var index1 = document.getElementById("inputGroupSelect02").value;
// console.log(index1);
function itemCode() {

    var index = document.getElementById("inputGroupSelect01").value;
    var index1 = document.getElementById("inputGroupSelect02").value;
    let code1;
    let code2;
    database.ref().child('data').child('metal').child(index).on('value', (snap) => {
        var data = Object.values(snap.val())
        code1 = data[0];
    })
    database.ref().child('data').child('metal').child(index).child('item').child(index1).on('value', (snap) => {
        var data = Object.values(snap.val())
        code2 = data[0];
    })
    var date = new Date().getFullYear();
    var covert = date.toString().slice(2);
    var number = 1;
    var input = document.getElementById("inlineFormInputGroup");

    var itemCode = code1 + code2 + covert + "00" + number;

    input.value = itemCode;
    database.ref().child('data').child('info').on('value', (snap) => {
        var data = Object.values(snap.val());
        for (var i = 0; i < data.length; i++) {
            if (data[i].code === itemCode) {
                var get = data[i].code;
                var arr = get.split("");
                var plus = Number(arr.slice(-1)) + 1;
                itemCode = code1 + code2 + covert + "00" + plus;
                input.value = itemCode;
            }
        }
    })

}

var image = document.getElementById('inlineFormInputGroup7');
image.addEventListener("change", function (e) {
    var file = e.target.files[0];
    var ref = firebase.storage().ref('images/' + file.name);
    ref.put(file);
})


function submit() {
    // console.log(this)
    var metal = document.getElementById('inputGroupSelect01').value;
    var item = document.getElementById('inputGroupSelect02').value;
    var code = document.getElementById('inlineFormInputGroup').value;
    var weigth = document.getElementById('inlineFormInputGroup1').value + document.getElementById('labelValue').innerHTML;
    var quantity = document.getElementById('inlineFormInputGroup2').value;
    var quality = document.getElementById('inlineFormInputGroup3').value;
    var stone = document.getElementById('inlineFormInputGroup4').value;
    var description = document.getElementById('inlineFormInputGroup5').value;
    var source = document.getElementById('inlineFormInputGroup6').value;
    var image = document.getElementById('inlineFormInputGroup7').value;
    console.log(weigth)
    var obj = {
        metal: metal,
        item: item,
        code: code,
        weigth: weigth,
        quantity: quantity,
        quality: quality,
        stone: stone,
        description: description,
        source: source
    }
    console.log(obj)
    database.ref().child('data').child('info').child(code).set(obj)
    document.getElementById('inputGroupSelect01').value += "";
    document.getElementById('inputGroupSelect02').value += "";

    document.getElementById('inlineFormInputGroup').value = ""
    document.getElementById('inlineFormInputGroup1').value = ""
    document.getElementById('inlineFormInputGroup2').value = ""
    document.getElementById('inlineFormInputGroup3').value = ""
    document.getElementById('inlineFormInputGroup4').value = ""
    document.getElementById('inlineFormInputGroup5').value = ""
    document.getElementById('inlineFormInputGroup6').value = ""
    document.getElementById('inlineFormInputGroup7').value = ""
}
function pageChange() {
    window.location.href = "report.html"
}



// var storage = firebase.storage();
// var pathReference = storage.ref('images/shoes11.jpg');
// var src;
// var item1 = document.getElementById('inputGroupSelect02');
// item1.addEventListener("change", function () {
//     pathReference.getDownloadURL().then(function (url) {
//         src = url;
//         console.log("dwonload")
//         console.log(src)
//         // console.log(pathReference)
//         var item = document.getElementById('inputGroupSelect02').value;

//         database.ref().child("data").child('info').child(item).on('value', (snap) => {
//             var data = snap.val();
//             document.getElementById('data').innerHTML = `
//         <span><img src = "${src}"><span>
//         <span><b>Item :</b> ${data.item}<span>
//         <span><b>Code :</b> ${data.code}<span>
//         <span><b>Weigth :</b> ${data.weigth}<span>
//         <span><b>Quantity :</b> ${data.quantity}<span>
//         <span><b>Quality :</b> ${data.quality}<span>
//         <span><b>Stone :</b> ${data.stone}<span>
//         <span><b>Description :</b> ${data.description}<span>
//         <span><b>Source :</b> ${data.source}<span>
//         <span><button type="button" class="btn btn-primary" id="editBtn" onclick="edit()">Edit</button></span>
//         <span><button name = "${data.item}" type="button" class="btn btn-primary" id="deleteBtn" onclick="remove(event)">Delete</button></span>
//         `
//         })

//     })
// })


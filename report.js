
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

function back() {
    document.getElementById('modal').style.display = 'none'
}
function remove(ev) {
    var name = ev.target.name;
    // var type = ev.target.type;
    // console.log(name, type)
    document.getElementById('tbody').innerHTML = ""
    database.ref().child('data').child('info').child(name).remove()
    // database.ref().child('data').child('item').child(name).remove()
}
var code;
function edit(ev) {
    console.log(ev.target.name)
    code = ev.target.name;
    document.getElementById('modal').style.display = 'block'
    document.getElementById('inlineFormInputGroup').value = code
}

function update() {
    var code1 = document.getElementById('inlineFormInputGroup').value;
    var item = document.getElementById('inlineFormInputGroup0').value;
    var weigth = document.getElementById('inlineFormInputGroup1').value + document.getElementById('labelValue').innerHTML;
    var quantity = document.getElementById('inlineFormInputGroup2').value;
    var quality = document.getElementById('inlineFormInputGroup3').value;
    var stone = document.getElementById('inlineFormInputGroup4').value;
    var description = document.getElementById('inlineFormInputGroup5').value;
    var source = document.getElementById('inlineFormInputGroup6').value;
    var obj = {
        item: item,
        code: code1,
        weigth: weigth,
        quantity: quantity,
        quality: quality,
        stone: stone,
        description: description,
        source: source
    }
    console.log(obj)

    document.getElementById('tbody').innerHTML = ""
    // database.ref().child('data').child(data1[j].name).child(code).remove()
    database.ref().child('data').child('info').child(code).update(obj)

    document.getElementById('inlineFormInputGroup').value = ""
    document.getElementById('inlineFormInputGroup0').value = ""
    document.getElementById('inlineFormInputGroup1').value = ""
    document.getElementById('inlineFormInputGroup2').value = ""
    document.getElementById('inlineFormInputGroup3').value = ""
    document.getElementById('inlineFormInputGroup4').value = ""
    document.getElementById('inlineFormInputGroup5').value = ""
    document.getElementById('inlineFormInputGroup6').value = ""
    document.getElementById('modal').style.display = 'none'

}

function report() {

    database.ref().child('data').child('info').on('value', (snap) => {
        var data = Object.values(snap.val())
        for (var i = 0; i < data.length; i++) {
            document.getElementById('tbody').innerHTML += `
                <tr>
                <td>${data[i].item}</td>
                <td>${data[i].code}</td>
                <td>${data[i].weigth}</td>
                <td>${data[i].quantity}</td>
                <td>${data[i].quality}</td>
                <td>${data[i].stone}</td>
                <td><button name = "${data[i].code}" type="button" class="btn btn-primary" id="editBtn" onclick="edit(event)">Edit</button></td>
                <td><button name = "${data[i].code}" type="button" class="btn btn-primary" id="deleteBtn" onclick="remove(event)">Delete</button></td>
                </tr>
                `
        }
    })
}

report()
function addItem() {
    window.location.href = "index.html"
}
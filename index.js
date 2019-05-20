var Code = ["lr", "gr", "ns", "ls"]
var metalObj = [
    {
        name: "Silver",
        code: "SI"
    },
    {
        name: "Gold",
        code: "G"
    },
    {
        name: "Palladium",
        code: "P"
    }
]
var obj = [
    {
        name: "ladies ring",
        code: "lR"
    },
    {
        name: "Gents ring",
        code: "GR"
    },
    {
        name: "Name Locket",
        code: "NL"
    }
]

function metal() {
    var id = document.getElementById("inputGroupSelect01");

    for (var i = 0; i < metalObj.length; i++) {
        id.innerHTML += `
        <option value="${i}">${metalObj[i].name}</option>
        `
    }

}
metal();


function select1() {
    document.getElementById("inputGroupSelect02").removeAttribute("disabled");
    item();
}


function item() {
    var id = document.getElementById("inputGroupSelect02");

    for (var i = 0; i < obj.length; i++) {
        id.innerHTML += `
        <option value="${i}">${obj[i].name}</option>
        ` 
    }
}



function itemCode() {
    var index = document.getElementById("inputGroupSelect01").value;
    var code = metalObj[index].code
    console.log(code)

    var index1 = document.getElementById("inputGroupSelect02").value;
    var code1 = obj[index1].code
    console.log(code1)

    var date = new Date().getFullYear();
    var covert = date.toString().slice(2);
    console.log(covert);

    var input = document.getElementById("inlineFormInputGroup");
    input.value = code + code1 + covert + "001";

}





var input;
function addItem() {
    var div = document.getElementById("mainDiv2");
    div.innerHTML += `
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Item Name</label>
    <input type="name" class="form-control input" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter ITem">
    <label for="exampleInputEmail1">Item Code</label>
    <input type="name" class="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Code">
  </div>
  <button type="" class="btn btn-info" onclick = "add()" >Add item</button>
</form>
    `
}
function add() {
    event.preventDefault()
    input = document.getElementById("exampleInputEmail2").value;
    var id = document.getElementById("inputGroupSelect02");
    // for(var i = 0; i < id.length; i++){
    id.innerHTML += `
        <option value="4">${input}</option>
        `
    // }
    var input2 = document.getElementById("exampleInputEmail1").value;
    Code.push(input2)
    console.log(Code);
    var id1 = document.getElementById("inputGroupSelect02").value;

    console.log(id1);
    var add = document.getElementById("inlineFormInputGroup");

}
// var metalObj = [
// {
//     name: "Silver",
//     code: "SI"
// },
// {
//     name: "Gold",
//     code: "G"
// },
// {
//     name: "Palladium",
//     code: "P"
// }
// ]
// var obj = [
// {
//     name: "ladies ring",
//     code: "lR"
// },
// {
//     name: "Gents ring",
//     code: "GR"
// },
// {
//     name: "Name Locket",
//     code: "NL"
// }
// ]
function metalConstructor(name, code) {
    this.name = name,
        this.code = code
}
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
var inp1;
var inp2;
var metalCon;
function addvalue() {
    event.preventDefault();
    // window.stop();
    inp1 = document.getElementById("exampleInputEmail2").value;
    inp2 = document.getElementById("exampleInputEmail1").value;

    metalCon = new metalConstructor(inp1, inp2);
    // metalObj.push(metalCon);
    // console.log(metalObj);

    document.getElementById("exampleInputEmail2").value = "";
    document.getElementById("exampleInputEmail1").value = "";

    document.getElementById("inputGroupSelect01").innerHTML = "";
    metal();
    document.getElementById("mainDiv3").style.display = "none";

}
var obj1 = JSON.parse(localStorage.getItem("data"));

function metal() {
    var id = document.getElementById("inputGroupSelect01");

    for (var i = 0; i < obj1.length; i++) {
        id.innerHTML += `
        <option value="${i}">${obj1[i].name}</option>
        `
    }
    var obj = JSON.parse(localStorage.getItem("data"))
    if (obj === null) {
        obj = []
    }
    obj.push(metalCon);
    localStorage.setItem("data", JSON.stringify(obj));
}

function select2() {
    var id = document.getElementById("inputGroupSelect01");
    if (id.value === null) {
        metal();
    }

}
select2()









function itemCode() {
    var index = document.getElementById("inputGroupSelect01").value;
    var code = obj1[index].code

    var index1 = document.getElementById("inputGroupSelect02").value;
    var code1 = obj2[index1].code

    var date = new Date().getFullYear();
    var covert = date.toString().slice(2);

    var input = document.getElementById("inlineFormInputGroup");
    input.value = code + code1 + covert + "001";

}


function itemConstructor(name, code) {
    this.name = name,
        this.code = code
}


function select1() {
    document.getElementById("inputGroupSelect02").removeAttribute("disabled");
    var id = document.getElementById("inputGroupSelect02");
    if (id.value === null) {
        item();
    }
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
var itemCon;
function objAdd() {
    event.preventDefault();
    
    var value = document.getElementById("exampleInputEmail3").value;
    var value2 = document.getElementById("exampleInputEmail4").value;
    
    
    itemCon = new itemConstructor(value, value2);
    // obj.push(itemCon);
    
    document.getElementById("exampleInputEmail3").value = "";
    document.getElementById("exampleInputEmail4").value = "";
    
    document.getElementById("inputGroupSelect02").innerHTML = "";
    document.getElementById("mainDiv2").style.display = "none";
    item();
}
var obj2 = JSON.parse(localStorage.getItem("data1"));
function item() {
    var id = document.getElementById("inputGroupSelect02");

    var obj = JSON.parse(localStorage.getItem("data1"))
    if (obj === null) {
        obj = []
    }
    obj.push(itemCon);
    localStorage.setItem("data1", JSON.stringify(obj));
    for (var i = 0; i < obj2.length; i++) {
        id.innerHTML += `
              <option value="${i}">${obj2[i].name}</option>
                            `
    }

}
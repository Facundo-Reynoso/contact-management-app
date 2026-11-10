let form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    AddData();
});


//validar

function ValidarFormulario() {
  let email = document.getElementById("inputEmail").value;
  let name = document.getElementById("inputName").value;
  let phone = document.getElementById("inputPhone").value;

  let patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let patronPhone = /^(?=.*[0-9])[0-9 +\-]+$/
  if (email.trim() === "") {
    alert("El campo correo es requerido");
    return false;
  } else if (!patronEmail.test(email)) {
    alert("El correo no es valido");
    return false;
  }

  if (name.trim() === "") {
    alert("El campo nombre es requerido");
    return false;
  }

  if (phone.trim() === "") {
    alert("El campo telefono es requerido");
    return false;
  } else if(!patronPhone.test(phone)){
    alert("El numero de telefono no es valido");
    return false;
  }

  return true;
}

//mostrar

function MostrarDatos() {
  let listPeople;

  if (localStorage.getItem("listPeople") == null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  let html =
    "<thead><tr><th>Correo</th><th>Nombre completo</th><th>Telefono</th><th>Acciones</th></tr></thead><tbody>";

  listPeople.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.phone + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Eliminar Dato</button> <button onclick="editData(' +
      index +
      ')" class="btn btn-warning">Editar Dato</button>';
    html += "</tr>";
  });

  html += "</tbody>";
  document.querySelector("#tableData").innerHTML = html;
}

document.onload = MostrarDatos();

//Agregar

function AddData() {
  if (ValidarFormulario() == true) {
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let phone = document.getElementById("inputPhone").value;

    let listPeople;

    if (localStorage.getItem("listPeople") == null) {
      listPeople = [];
    } else {
      listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.push({
      email: email,
      name: name,
      phone: phone,
    });

    localStorage.setItem("listPeople", JSON.stringify(listPeople));

    MostrarDatos();

    document.getElementById("inputEmail").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputPhone").value = "";
  }
}

//borrar

function deleteData(index) {
  let listPeople;

  if (localStorage.getItem("listPeople") == null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  listPeople.splice(index, 1);
  localStorage.setItem("listPeople", JSON.stringify(listPeople));

  MostrarDatos();
}

//editar

function editData(index) {
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";

  let listPeople;

  if (localStorage.getItem("listPeople") == null) {
    listPeople = [];
  } else {
    listPeople = JSON.parse(localStorage.getItem("listPeople"));
  }

  document.getElementById("inputEmail").value = listPeople[index].email;
  document.getElementById("inputName").value = listPeople[index].name;
  document.getElementById("inputPhone").value = listPeople[index].phone;

  document.querySelector("#btnUpdate").onclick = function () {
    if (ValidarFormulario() == true) {
      listPeople[index].email = document.getElementById("inputEmail").value;
      listPeople[index].name = document.getElementById("inputName").value;
      listPeople[index].phone = document.getElementById("inputPhone").value;

      localStorage.setItem("listPeople", JSON.stringify(listPeople));
      MostrarDatos();

      document.getElementById("inputEmail").value = "";
      document.getElementById("inputName").value = "";
      document.getElementById("inputPhone").value = "";

      document.getElementById("btnAdd").style.display = "block";
      document.getElementById("btnUpdate").style.display = "none";
    }
  };
}

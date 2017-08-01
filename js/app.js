// Initialize Firebase
var config = {
    apiKey: "AIzaSyB2-4qv_lpvAJwLAGTLm3MZoKtxOTFMGVo",
    authDomain: "taller-farebase.firebaseapp.com",
    databaseURL: "https://taller-farebase.firebaseio.com",
    projectId: "taller-farebase",
    storageBucket: "",
    messagingSenderId: "797617085844"
};
firebase.initializeApp(config);

var objDb = {
    usuarios: []
};

var formulario = document.getElementById("crear-usuario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById("name").value;
    var correo = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    objDb.usuarios.push({
            name: nombre,
            email: correo,
            password: password
        })
    guardarDatos(objDb);
})



// Get a reference to the database service
var database = firebase.database();

function guardarDatos(usuarios) {
    // Usar el metodos .set() para guardar base de datos
    database.ref("/").set(usuarios)
}

function mostrarUsuarios(usuarios) {
    document.getElementById("usuarios").innerHTML = "";
    usuarios.forEach(function (usuario) {
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        
        h3.textContent = usuario.name;
        p.innerHTML = "<strong>Email: </strong>" + usuario.email;
        
        div.appendChild(h3);
        div.appendChild(p);
        
        document.getElementById("usuarios").appendChild(div);
    });
}

//leer datos: usar el metodo .on('value')
database.ref("/usuarios").on("value", function (snapshot) {
    var usuarios = snapshot.val();
    objDb.usuarios = usuarios;
    mostrarUsuarios(usuarios);
});

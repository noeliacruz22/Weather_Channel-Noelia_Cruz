//Primera seccion, obtener clima
const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Su navegador no es compatible con la API de geolocalización");
    }
});

//API
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4b5b70c60ce7ed60a5a4945b7b7f8beb`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4b5b70c60ce7ed60a5a4945b7b7f8beb`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Obteniendo detalles del tiempo...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Algo salió mal";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){ 
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} No es una ciudad valida`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});

//Segunda seccion, agregando Ciudad favorita.
const texto = document.getElementById("texto")

//texto de titulo modificado por Dom
texto.innerHTML = `Agrega tu ciudad favorita`;

const todoInput = document.querySelector(`.todo-input`);
const todoButton = document.querySelector(`.todo-button`);
const todoList = document.querySelector(`.todo-list`);

todoButton.addEventListener(`click`, addTodo);
todoList.addEventListener(`click`, deleteCheck);



function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement(`div`);
    todoDiv.classList.add("todo");

    const newTodo = document.createElement(`li`);
    newTodo.innerText = todoInput.value;
    newTodo.classList.add(`todo-item`);
    todoDiv.appendChild(newTodo);

    //BOTON CHECK
    const completedButton = document.createElement(`button`);
    completedButton.innerHTML = `<i class="bi bi-check-square"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    
     //BOTON ELIMINAR
    const trashButton = document.createElement(`button`);
    trashButton.innerHTML = `<i class="bi bi-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value= "";
    //Agregado de libreria al boton de eliminar
    trashButton.addEventListener('click', () =>{
        Swal.fire({
            title: 'Ciudad eliminada',
            icon: 'success',
            timer: '5000',
            timerProgressBar: 'true',
            toast: 'true',
            position: 'bottom-end',
        });
    });
};

//borrado de items de listado
function deleteCheck(borrar){
    const item= borrar.target;

    if(item.classList[0] === `trash-btn`){
        const todo = item.parentElement;
        todo.remove()
    }

};

//Agregue libreria Sweet Alert al boton para agregar ciudad favorita
const btn = document.querySelector('#miBtn')

btn.addEventListener('click', () =>{
    Swal.fire({
        title: 'Buen trabajo!',
        text: 'ciudad agregada',
        icon: 'success',
        footer: 'Recuerda que puedes eliminarla cuando quieras.',
        timer: '5000',
        timerProgressBar: 'true',
        toast: 'true',
        position: 'bottom-end',
    });
});
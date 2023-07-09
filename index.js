
let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.querySelector("#bits");
let kbSpeed = document.querySelector("#kbs");
let mbSpeed = document.querySelector("#mbs");
let info = document.querySelector("#info");
let totalBitsSpeed = 0;
let totalkbsSpeed = 0;
let totalmbsSpeed = 0;    
let testCompleted = 0;
let start_button = document.querySelector("#start_button");
let numTest = 0;
let loader = document.querySelector(".custom-loader");


let imageAPI = "https://source.unsplash.com/random?topic=nature"

image.onload = async function(){
    endTime = new Date().getTime();
    await fetch(imageAPI).then((response)=>{
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    })
};

function calculateSpeed(){
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInkbs = loadedBits / 1024;
    let speedInMbs = speedInkbs / 1024;

    totalBitsSpeed += speedInBts;
    totalkbsSpeed += speedInkbs;
    totalmbsSpeed += speedInMbs;
    
    testCompleted++;
    if (testCompleted === numTest){
        loader.setAttribute("hidden", "hidden")
        start_button.setAttribute("hidden", "hidden")
        document.querySelector("#num_test").setAttribute("hidden", "hidden")
        document.querySelector("#hide").removeAttribute("hidden")
        let averageSpeedInBps = (totalBitsSpeed / numTest).toFixed(2);
        let averageSpeedInKbs = (totalkbsSpeed / numTest).toFixed(2);
        let averageSpeedInMbs = (totalmbsSpeed / numTest).toFixed(2);
        bitSpeed.textContent += `${averageSpeedInBps}`; 
        kbSpeed.textContent += `${averageSpeedInKbs}`; 
        mbSpeed.textContent += `${averageSpeedInMbs}`; 
        info.textContent = "test completed!";
    }
    else {
        startTime = new Date().getTime();
        image.src = imageAPI;
    }
}


const go_back = document.querySelector("#back_button");
go_back.onclick = function(){ location.reload(true); }

const init = async() =>{
    info.textContent = "Testing...";
    startTime = new Date().getTime();
    image.src = imageAPI;
}

start_button.onclick = ()=> {
    numTest = parseInt(document.querySelector("#num_test").value);
    if ((numTest != null) && (numTest > 0)){
        for (let i=0; i<numTest; i++){
            init();
            loader.removeAttribute("hidden")
        }
    }else {
        alert("Please, enter a valid value");
    }
}


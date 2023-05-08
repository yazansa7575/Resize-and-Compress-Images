const box = document.querySelector(".box");
const fileChoses = document.querySelector("input");
const imgprev = document.querySelector("img");
const widthInput = document.querySelector(".wIn");
const heightInput = document.querySelector(".hIn");
const radioLock = document.querySelector("#lock");
const download_btn = document.querySelector("#btn-download");
const radioQuality = document.querySelector("#quality");
var orImgRatio ;
const loadFile = (e) =>{

    const file = e.target.files[0];
    imgprev.src = URL.createObjectURL(file);
    if(!file) return;
    box.classList.add("active");
    widthInput.value = imgprev.naturalWidth*10;
    heightInput.value = imgprev.naturalHeight*10;
    widthInput.addEventListener("keyup",()=>{
        orImgRatio = imgprev.naturalHeight / imgprev.naturalWidth;
        const height = radioLock.checked ? widthInput.value / orImgRatio : heightInput.value; 
        heightInput.value =Math.floor(height);
    });

    heightInput.addEventListener("keyup",()=>{
        orImgRatio = imgprev.naturalHeight / imgprev.naturalWidth;
        const width = radioLock.checked ? heightInput.value * orImgRatio : widthInput.value; 
        widthInput.value =Math.floor(width);
    });

} 
const DownloadAndResizing = ()=>
{
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const quality = radioQuality.checked ? 0.7 : 1.0; 


    canvas.width =  widthInput.value;
    canvas.height = heightInput.value ;

    ctx.drawImage(imgprev,0,0,canvas.width,canvas.height);

    a.href = canvas.toDataURL("image/jpeg",quality);
    a.download = new Date().getTime();
    a.click();

} 



download_btn.addEventListener("click",DownloadAndResizing);
box.addEventListener('click',()=> fileChoses.click());
fileChoses.addEventListener("change",loadFile);

prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality: 90
});

camera =document.getElementById("camera");

Webcam.attach("#camera");

function takeimage(){
    Webcam.snap(function(data){
        document.getElementById("result").innerHTML ='<img id="imageresult" src="'+data+'">';

    })
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/H1ktJGPzS/model.json", modelload);

function modelload(){
    console.log("model has been loaded!");
}

function speak1(){
    var synth = window.speechSynthesis;
    Text1 = "The first prediction is " + prediction_1;
    Text2 = "And the second prediction is " + prediction_2;
    var speech = new SpeechSynthesisUtterance(Text1 + Text2);
    synth.speak(speech);

}
function identifygesture(){
    img = document.getElementById("imageresult");
    classifier.classify(img, imgfinal);
}

function imgfinal(error, results){
    if(error){
     console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("signal_name").innerHTML = results[0].label;
        document.getElementById("signal_name2").innerHTML = results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak1();
       
        if(results[0].label == "Victory"){
            document.getElementById("signal_update").innerHTML = "&#9996;";
 }
 else if (results[0].label == "Highfive"){
     document.getElementById("signal_update").innerHTML = "&#9995;";
 }
 
 else if(results[0].label=="Great") {
     document.getElementById("signal_update").innerHTML = "&#128077;";
 }
 
 else if (results[0].label=="Not good"){
     document.getElementById("signal_update").innerHTML = "&#128078;";
 }

 else if (results[0].label=="Ok"){
    document.getElementById("signal_update").innerHTML = "&#128076;";
 }
 
 if(results[1].label == "Victory"){
     document.getElementById("signal_update2").innerHTML = "&#9996;";
 
 }
 
 else if(results[1].label == "Highfive"){
     document.getElementById("signal_update2").innerHTML = "&#9995;";
 }
 
 else if(results[1].label == "Great"){
     document.getElementById("signal_update2").innerHTML = "&#128077;";
 
 }
 
 else if (results[1].label == "Not good"){ 
     document.getElementById("signal_update2").innerHTML = "&#128078;";
 }

 else if (results[1].label == "Ok"){ 
    document.getElementById("signal_update2").innerHTML = "&#128076;";
} 
}
    
    }
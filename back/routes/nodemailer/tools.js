function createCode(){
    var identifyingCode="";
    for(var i=0;i<6;i++){
        identifyingCode+=Math.floor(Math.random()*10);
    }       
    // console.log(identifyingCode)
    return identifyingCode;
}

module.exports = createCode;

upfiles=()=>{
    var fileObj = document.getElementById('img').files;
    var url = 'http://localhost:3001/imgs/';
    var form = new FormData();
    for(var i = 0;i<fileObj.length;i++){
        form.append("file",fileObj[i]);
    }
    fetch(url,{
        method:'POST',
        body:form,
    }).then(res=>res.json())
    .then(res=>{
        console.log(res)
        this.setState({
            lists:res
        })
    })
}
addPictures=()=>{
    console.log(this.state.lists,this.state.pid)
    var lists=JSON.stringify(this.state.lists)
    var addcpictureswarn = document.getElementById('addcpictureswarn');
    addcpictureswarn.style.display='block';
    if(this.state.lists.length==0){
        this.setState({
            code:'请上传照片'
        })
    }else{
        fetch(`http://localhost:3001/child/cpictures/caddpictures`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`childPhotoListid=${this.state.pid}&imgurl=${lists} `
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                code:json.msg
            })
        })
    }
}
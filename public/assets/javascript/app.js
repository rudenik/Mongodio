$(".waves-effect").on("click", function(e){
    console.log("clicked for srape");
    $.get("/getArts").then(function(res){
        console.log(res);
    })
})
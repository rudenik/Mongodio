<<<<<<< HEAD
$("#nav-mobile").on("click", ".waves-effect", function (e) {
  console.log("clicked for srape");
  $.get("/getArts").then(function (res) {
      for (arts in res) { 
        var rowHTML = buildHTML(res[arts]);
        rowHTML.appendTo($("#artdisplay"));
      }
})
})

$.get("/queryArts").then(function (res) {
  for (arts in res) { 
    console.log(res[arts].comments)
      var rowHTML = buildHTML(res[arts]);
      rowHTML.appendTo($("#artdisplay"));    
  }
})

function buildHTML(res){
  var rowHTML = $(`
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${res.photo}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${res.title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${res.link}">Open the Article</a><div class="right-align"><a data-target="modal1" href='#modal1' class="btn waves-effect waves-light modal-trigger green" data-id=${res._id} id="combutt" >Comment</a> <a href="/delete/${res._id}" class="btn waves-effect waves-light red " id="delbutt" data-id=${res._id}>Delete Article</a></p></div>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${res.title}<i class="material-icons right">close</i></span>
          <p>${res.excerpt}</p>
        </div>
      </div>
        `);
  return rowHTML;
}
$("#artdisplay").on("click", ".modal-trigger", function(){
    console.log("CommButt");
    console.log($(this).attr("data-id"));
    var elems = document.querySelectorAll('.modal');
    var options = {onOpenStart:displayComments($(this).attr("data-id"))};
    var instances = M.Modal.init(elems, options);
    

});

function displayComments(id){
  console.log("display comments triggered")
  console.log("id: ", id);
  $.get(`/comments/${id}`).then(function(results){
    console.log(results);
    $("#modal-body").text(results);
    $("modal-header").text(id);
  })
}

$("#commentform").on("submit", function(event){
  event.preventDefault();
  console.log("add comment");
})
=======
$(".waves-effect").on("click", function(e){
    console.log("clicked for srape");
    $.get("/getArts").then(function(res){
        console.log(res);
    })
})
$.get("/queryArts").then(function(res){
    // console.log(res)
    for(arts in res){
        console.log(res[arts].title)
        // var row = $("<div class='row'>");
        // var col = $("<div class='col s12 m7'>");
        // var h2 = $(`<h2 class='header'>${res[arts].title}</h2>`);
        // var card = $("<div class='card horizontal'>");
        // var cardImage = $("<div class='card-iamge>");
        // var imageURL = $(`<img src="${res[arts].photo}">`);
        // var cardStacked = $("<div class='card-stacked'");
        // var cardContent = $("<div class='card-content'>")
        // var cardP = $(`<p>${res[arts].excerpt}</p>`);
        // var rowHTML =$(`
        //     <div class='row'>
        //     <div class="col s12 m7">
        //     <div class="card horizontal">
        //     <h2 class="header">${res[arts].title}</h2>
        //       <div class="card-image">
        //         <img src="${res[arts].photo}">
        //       </div>
        //       <div class="card-stacked">
        //         <div class="card-content">
        //           <p>${res[arts].excerpt}</p>
        //         </div>
        //         <div class="card-action">
        //           <a href="${res[arts].link}">Open the Article</a>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        // `)

        var rowHTML =$(`
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${res[arts].photo}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${res[arts].title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${res[arts].link}">Open the Article</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${res[arts].title}<i class="material-icons right">close</i></span>
          <p>${res[arts].excerpt}</p>
        </div>
      </div>
        `);
        rowHTML.appendTo($("#artdisplay"));
    }

    ///if res.length > 1 remove get started button
})
>>>>>>> e79a670975ed1ef45e198a265bd676fbeba391ee

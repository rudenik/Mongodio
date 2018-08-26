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

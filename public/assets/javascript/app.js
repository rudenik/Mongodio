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
function buildCommentHTML(comment){
  var commentDiv = $(`
    <div class="row">
      <p>${comment.body}</p>
      <div class="right-align">
        <a id="deletecommentbutton" data-commid="${comment._id}" class="btn waves-effect waves-light red">X</a>
      </div>
    </div>
  `)
  return commentDiv;
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
  // $("modal-header").text(id);
  $("#modal-body").empty();
  $.get(`/comments/${id}`).then(function(results){
    // console.log("comment results: " + JSON.stringify(results.comments[0].body));
    // $("#modal-body").text(JSON.stringify(results.comments[0].body));
    console.log("comment results on modal build: " + JSON.stringify(results));
    for(ele in results.comments){
      console.log(JSON.stringify(results.comments[ele]))
      var comDiv = buildCommentHTML(results.comments[ele]);
      $("#modal-body").append(comDiv);
    }
    $("#commentform").attr("data-artid", id);
    // $("modal-header").text(id);
  })
}

$("#commentform").on("submit", function(event){
  event.preventDefault();
  console.log("add comment");

  console.log($("#body").val());
  var commbody = $("#body").val();
  var artid = $("#commentform").attr("data-artid");

  var sendData = {
    "body" : commbody,
    "id" : artid
  }

  $.ajax({
    method: "POST",
    url: "/addcomment/",
    data: sendData
  }).then(function(res){
    console.log("add comment repsonse: " + JSON.stringify(res));
    // console.log("add comment response.comments: " + res);
    var comDiv = buildCommentHTML(res);
      $("#modal-body").append(comDiv); 
  })

  $("#body").val("")
})
$("#modal-body").on("click", "#deletecommentbutton", function(e){
  console.log("delete comment button hit")
  var commID = $(this).attr("data-commid")
  $.ajax({
    method: "DELETE",
    url: `/deleteComment/${commID}`
  }).then(function(response){
    console.log(JSON.stringify(response));
  })
  $(this).parent().parent().remove()
})


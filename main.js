var col3 = [26, 188, 156];
var col4 = [13,93,77];
var editing = [0];
var div;

var note_b = "<li class='hv'><span class='ion-close-round close'></span><span class='li_text'>";
var note_e = "</span><span class='ion-ios-compose note'></span></li>";

$(function(){
    $("#txt_i").keyup(function(){
      if(editing[0]){
        $("ul li:nth-child(" + editing[1] + ") .li_text").text($("#txt_i").val());
      }
    });
  $('#plus').click(function(){
    if(!editing[0]){
      $("ul").append(note_b + "New Item" + note_e);
      color($("ul li").length, col3, col4);
    }
    else{
      $("ul").append(note_b + "New Note" + note_e);
      color($("ul li").length, col3, col4, editing[1]);
      $("ul li:nth-child(" + $("ul li").length + ") .note").hide();
      $("ul li:nth-child(" + $("ul li").length + ") .close").hide();
    }
  });
  $('body').on("click", ".close",function(){
    $(this).parent().remove();
    color($("ul li").length, col3, col4);
  });
  $('body').on("click", ".note",function(){
    if(!editing[0]){
      div = $(this).prev().text();
      $("#txt_i").val(div);
      $("#edit_cont").show();
      editing[0] = 1;
      editing[1] = $("ul li").index($(this).parent()) + 1;
      color($("ul li").length, col3, col4, editing[1]);
      $(this).parent().css("left", "-25px");
      $(this).parent().css("border","solid 5px white");
      $(this).parent().css("z-index","2");
      $(this).parent().css("box-shadow","0 10px 30px rgba(0,0,0,0.5)");
      $(this).parent().css("padding","10px 65px");
      $(".note").hide();
      $(".close").hide();
      $(this).parent().toggleClass("hv");
    }
  });
  $("#done").click(function(){
    if(editing[0] == 1){
      editing[0] = 0;
      $(".note").show();
      $(".close").show();
      color($("ul li").length, col3, col4);
      $("ul li:nth-child(" + editing[1] + ")").css("padding","10px 45px");
      $("ul li:nth-child(" + editing[1] + ")").css("left","0");
      $("ul li:nth-child(" + editing[1] + ")").css("border","none");
      $("ul li:nth-child(" + editing[1] + ")").css("z-index","0");
      $("ul li:nth-child(" + editing[1] + ")").css("box-shadow","none");
      $("ul li:nth-child(" + editing[1] + ")").toggleClass("hv");
      $("#edit_cont").hide();
    }
  });
});

function color(num, col1, col2, light){
  var ratio = [];
  for(var i = 0; i < 3; i++){
    if(col1[i] > col2[i]){
      ratio.push((col1[i] - col2[i]) / num);
    }
    else{
      ratio.push((col2[i] - col1[i]) / num);
    }
  }
  for(var y = 0; y < num; y++){
    var idek = [];
    for(var x = 0; x < 3; x++){
      if(col1[x] > col2[x]){
        idek.push(col2[x] + (ratio[x] * y));
      }
      else{
        idek.push(col1[x] + (ratio[x] * y));
      }
    }
    for(var z = 0; z < 3; z++){
      idek[z] = Math.floor(idek[z]);
    }
    if(light != undefined){
      if(y+1 ==  light){
        for(var a = 0; a < 3; a++){
          idek[a] += 50;
          if(idek[a] > 255){
            idek[a] = idek[a] - (idek[a] - 255);
          }
        }
      }
    }

    $("ul li:nth-child(" + (y + 1) + ")").css("background", "rgb(" + idek[0] + "," + idek[1] + "," + idek[2] + ")");
    idek = [];
  }
}

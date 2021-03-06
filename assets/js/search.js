//read in from data/oSTEM_search_mapping.json
var search_mapping;
$.getJSON('data/oSTEM_search_mapping.json').done(function(json) {
  search_mapping = json;
})

var datatable;
$.getJSON('data/oSTEM_datatable.json').done(function(json) {
  datatable = json;
})

var indices = [];
var active_buttons = [];

function search(indices){
  if(indices.length > 0){
    $("tr:not(#table-header)").hide();
    for(i in indices){
      $("#"+indices[i]).show();
    }
  } else {
    $("tr:not(#table-header)").show();
    $("#search").val("");
    $(".search-btn").removeClass("active-btn");
    active_buttons = [];
  }
}

function get_indices(term, button=false){
  if(term.length == 0){indices = []; return;}
  term = term.toLowerCase();
  temp_indices = search_mapping[term];
  temp = []
  if(button & indices.length > 0){
    for(i in indices){
      index = temp_indices.indexOf(indices[i]);
      if(index == -1){
        console.log("Non overlapping result");
      } else {temp.push(indices[i])}
    }
    indices = temp;
  } else {
      for(i in temp_indices){
        indices.push(temp_indices[i]);
      }
    }
  }


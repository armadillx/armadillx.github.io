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

    var currKeywords = [];
    var currOrgReturn = [];
    var curretIndex = 0;
    function google(stateWrapper, ready) {
      window.open("https://google.com");
      ready();
    }
    function bing(stateWrapper, ready) {
      window.open("https://bing.com");
      ready();
    }
    var rollbackTo = false;
    var originalState = false;
    function storeState(stateWrapper, ready) {
      rollbackTo = stateWrapper.current;
      console.log("storeState called: ",rollbackTo);
      ready();
    }
    function rollback(stateWrapper, ready) {
      console.log("rollback called: ", rollbackTo, originalState);
      console.log("answers at the time of user input: ", stateWrapper.answers);
      if(rollbackTo!=false) {
        if(originalState==false) {
          originalState = stateWrapper.current.next;
            console.log('stored original state');
        }
        stateWrapper.current.next = rollbackTo;
        console.log('changed current.next to rollbackTo');
      }
      ready();
    }
    function restore(stateWrapper, ready) {
      if(originalState != false) {
        stateWrapper.current.next = originalState;
        console.log('changed current.next to originalState');
      }
      ready();
    }

    function parseKeywords(keywords) {
      window.alert('Fucking work please');
      var words = keywords.split(" ");
      for (var i = 0; i < words.length; i += 1) {
        var foundWord = get_indices(words[i]);
        if (foundWord) {
          currKeywords[currentIndex] = words[i];
          currentIndex += 1;
        }
      }
      ready();
    }

    function findResources(stateWrapper, ready) {
      for (var i = 0; i<currKeywords.length; i+=1) {
        get_indices(currKeywords[i]);
      }
      sessionStorage.setItem("results", currOrgReturn);
    }



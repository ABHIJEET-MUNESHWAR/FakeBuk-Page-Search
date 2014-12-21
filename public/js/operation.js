document.addEventListener("DOMContentLoaded", function(event) { 
	checkLoginState();
	document.getElementById("searchPage").focus();
});

var searchPageBtnFunc = function() {
	var searchPage = document.getElementById("searchPage").value
	document.getElementById("loader").style.display = "block";

	var urlCall = "/search?q=" + searchPage + "&type=page&access_token=";
	FB.api(urlCall, function(response) {
		document.getElementById("loader").style.display = "none";
		var pageTableBody = document.getElementById("pageTableBody");
		pageTableBody.innerHTML = "";
		loadPageResult(response.data);
	});
};

var searchPageFunc = function(e){
	if ((e.keyCode == 13)) {
		searchPageBtnFunc();
	}
};

var loadPageResult = function(response){
	var pgeLength = response.length;
	if(pgeLength == 0) {
		document.getElementById("noResults").style.display = "block";
		document.getElementById("pageTable").style.display = "none";	
		return;
	}
	document.getElementById("noResults").style.display = "none";
	document.getElementById("pageTable").style.display = "block";
	var pageTableRow = "";
	for(var i=0; i<pgeLength; i++) {
		pageTableRow += "<tr>";
		pageTableRow += "<td>" + response[i].name + "</td>";
		pageTableRow += "<td>" + response[i].category + "</td>";
		pageTableRow += "<td>";
		if(typeof(response[i].category_list) !="undefined") {
			var catListSize = response[i].category_list.length;
			if(catListSize>0) {
				for(var j=0; j<catListSize; j++) {
					pageTableRow += response[i].category_list[j].name;
					if(catListSize > 1) {
						pageTableRow += ", ";
					}
				}
			}					
			
		} else {
			pageTableRow += " - ";
		}
		pageTableRow += "</td>"; 
		pageTableRow += "</tr>";	
	}
	var pageTableBody = document.getElementById("pageTableBody");
	pageTableBody.innerHTML = pageTableRow;
};
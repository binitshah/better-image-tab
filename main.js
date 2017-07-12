var app_name = "Better Image Tab";

$(document).ready(function(){
  if (isImagePage(document.location.href)) {
    if (isSimpleImagePage()) {
      setUpEditor();
    }
  }
});

function setUpEditor(tabUrl) {
  tabUrl = String(tabUrl);
  var imageTitle = tabUrl.substring(tabUrl.lastIndexOf("/"));
  
  var the_style = chrome.extension.getURL('css/style.css');
	$('head').append($('<link>')
		.attr("rel","stylesheet")
		.attr("type","text/css")
		.attr("href", the_style));

  var the_bulma = chrome.extension.getURL('css/bulma.css');
	$('head').append($('<link>')
		.attr("rel","stylesheet")
		.attr("type","text/css")
		.attr("href", the_bulma));

  // var the_caman = chrome.extension.getURL('js/caman.min.js');
	// $('head').append($('<script>')
	// 	.attr("type","text/javascript")
	// 	.attr("src", the_caman));

  $('body').load(chrome.extension.getURL('editor.html'), function(response, status, xhr) {
    if (status == "error") {
      console.log(app_name + " was not able to convert the page.");
    }
  });

  console.log("hey");

  Caman("#editor_canvas", document.location.href, function () {
      // manipulate image here
      this.brightness(5).render();
  });
}

function isImagePage(tabUrl) {
  var imageTypes = [".png", ".apng", ".tif", ".tiff", ".gif", ".jpeg", ".jpe", ".jpg", ".jif", ".jfif", ".jfi", ".jp2", ".jpx", ".j2k", ".j2c", ".jpf", ".bmp", ".jxr", ".webp", ".jpm", ".mj2", ".hdp", ".wdp", ".mng", ".svg", ".svgz", ".ico"];
  var isImageTab = false;
  tabUrl = String(tabUrl);

  if (tabUrl.includes("?")) {
    tabUrl = tabUrl.substring(0, tabUrl.indexOf("?"));
  }

  imageTypes.forEach(element => {
    if (tabUrl.endsWith(element)) {
      isImageTab = true;
    }
  });

  return isImageTab;
}

function isSimpleImagePage() {
  var allElements = $("body *");

  if (allElements.length < 3) {
    var containsComplexElements = false;
    var complexTypes = ["input", "table", "script", "frame", "li", "ul", "button"];

    $("body *").each(function(item, index) {
      var str = item + " ";
      complexTypes.forEach(complexElement => {
        if (str.includes(complexElement)) {
          console.log(complexElement + ' | ' + index);
          containsComplexElements = true;
        }
      })
    });

    return !containsComplexElements;
  }

  return false;
}
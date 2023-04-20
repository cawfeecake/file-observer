function codeClicked(elem) {
  var codeId = elem.getAttribute("_code_id");

  // [DEBUG]
  //console.log(codeId);
  //console.log(JSON.stringify(elem, ["id", "className"]));

  var selectColClass = "selectedColLeft";
  document.querySelectorAll(`.${selectColClass}`).forEach((i) => {
    i.classList.remove(selectColClass);
  });
  elem.classList.add(selectColClass);
  //elem.style.color = "red";

  document.querySelectorAll(".fileCode").forEach((i) => {
    i.hidden = true;
  });
  document.getElementById(codeId).hidden = false;
  return false;
}

window.onload = function () {
  document.getElementById("colRight").firstElementChild.hidden = false;
}

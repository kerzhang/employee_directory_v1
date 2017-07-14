let $employeeDirectory = $(".ajax");
let employees = [];

// Get employee data from randomuser.me, parse the string for each required field
function fetchData() {
  $.ajax({
    type: "get",
    url: "https://randomuser.me/api/?results=12&nat=AU,CA,DE,DK,ES,FI,FR,GB,IE,NZ,US",
    data: "data",
    dataType: "json",
    success: function (data) {
      $.each(data.results, function (index, item) {
        //create the employee card. The fields which will be used in modal are hide here.
        let $card = `<li class="card clearfix" onClick="loadModal(${index});">
                          <a href="#" class='image clearfix'>
                            <img src=${item.picture.large}>
                            </a>
                          <ul class="info">
                            <li class="name">${item.name.first} ${item.name.last} </li>
                            <li class="email">${item.email}</li>
                            <li class="location">${item.location.city}, ${item.nat}</li>
                            <li class="username" style="display: none">${item.login.username}</li>
                            <li class="cell" style="display: none">${item.cell}</li>
                            <li class="address" style="display: none">${item.location.street}, ${item.location.postcode}</li>
                            <li class="birth" style="display: none">${item.dob}</li>
                            <li class="sn" style="display: none">${index}</li>
                          </ul>
                        </li>
                      `;
        employees.push(item);
        $employeeDirectory.append($card);
        console.log(item.name.first);
      });
    }
  });
}

//Parse the birthday information.
function parseBirth(birthString) {
  // Don't know why below code doesn't work on Safari...
  // let d = new Date(birthString);
  // return d.toLocaleDateString('en-US');

  //Parse the string then
  let year = birthString.slice(2,4);
  let month = birthString.slice(5,7);
  let d = birthString.slice(8, 10)
  return d + '/' + month + '/' + year;
}

//Modal window creater.
function loadModal(i) {
  $('#myModal').remove();
  if (i>11) {i=0;}
  if (i<0) {i=11;}
  let card = employees[i];
   
  let $modal = `
              <div id="myModal" class="modal" onclick="hideModal(event);">
                <div class="modal-content">
                  <span class="close" onclick="hideModal(event);">&times;</span>
                  <a href="#" class='modal-image clearfix'>
                          <img src=${card.picture.large}>
                          </a>
                  <ul class="modal-info">
                      <li class="modal-name">${card.name.first} ${card.name.last} </li>
                      <li class="modal-email">${card.email}</li>
                      <li class="modal-username">${card.login.username}</li>
                      <hr/>
                      <li class="modal-detail modal-cell">${card.cell}</li>
                      <li class="modal-detail location">${card.location.street}, ${card.location.city}, ${card.nat}, ${card.location.postcode}</li>
                      <li class="modal-detail birth">Birthday: ${parseBirth(card.dob)}</li>
                  </ul>
                    <img class="prev" onclick="loadModal(${i}-1)" src="images/prev.png">
                    <img class="next" onclick="loadModal(${i}+1)" src="images/next.png">
                </div>
              </div>
              `;
  $('.wrapper').append($modal);
  $('.modal').show();
}

//Hide modal window when the mouse click is not on navigator symbol.
function hideModal(e) {
  // console.log(e.target.className);
  if (e.target.className !== 'next' && e.target.className !== 'prev') {
  $('.modal').hide();}
}

//Employee name filter, from either first last name or username.
function filterEmployeesByName() {
  const $cards = $(".card");
  let $matched = 0;
  let $filterInput = $("#filter").val();

  if ($filterInput !== "") {
    $(".card").each(function () {
      let n = $(this).children(".info").children(".name").text();
      let u = $(this).children(".info").children(".username").text();
      if (n.indexOf($filterInput) < 0 && u.indexOf($filterInput) < 0) {
        $(this).hide();
      } else {
        $matched += 1;
        $(this).show();
      }
      if ($matched === 0) {
        $('.main-footer span').text("No matched face...");
      } else {
        $('.main-footer span').text("So many beautiful faces ...");
      }
    });
  } else {
    //show all employees if input field is blank.
    $(".card").show();
  }
}


// Filter employees by name
$(document).ready(function () {

  $("#filter").keyup(function () {
    filterEmployeesByName();
  });

  //this is to handle 'delete' event.
  $("#filter").change(function () {
    filterEmployeesByName();
  });


  $employeeDirectory.children().remove();
  fetchData();


});
let $employeeDirectory = $(".ajax");

function fetchData() {
  $.ajax({
    type: "get",
    url: "https://randomuser.me/api/?results=12",
    data: "data",
    dataType: "json",
    success: function (data) {
      $.each(data.results, function (index, item) {
        let $card = `<li class="card clearfix" onClick="loadModal($(this));">
                          <a href="#" class='image clearfix'>
                            <img src=${item.picture.large}>
                            </a>
                          <ul class="info">
                            <li class="name">${item.name.first} ${item.name.last} </li>
                            <li class="email">${item.email} </li>
                            <li class="location">${item.location.city}, ${item.nat}</li>
                          </ul>
                        </li>
                      `;
        // let $card = '<a href="#" class="image clearfix">' + '<img src="' + item.picture.large + '">';
        $employeeDirectory.append($card);
      });
      // console.log(data);
    }
  });
}

function loadModal(card) {
  console.log(card);
  let image = card.children('.image').children('img').prop('src');
  let name = card.children('.info').children('.name').text();
  let email = card.children('.info').children('.email').text();
  let location = card.children('.info').children('.location').text();
  let $modal = `
              <div id="myModal" class="modal" onclick="hideModal();">
                <div class="modal-content">
                  <span class="close" onclick="hideModal();">&times;</span>
                  <a href="#" class='modal-image clearfix'>
                          <img src=${image}>
                          </a>
                  <ul class="modal-info">
                      <li class="name">${name}</li>
                      <li class="email">${email}</li>
                      <li class="location">${location}</li>
                  </ul>
                </div>
              </div>
              `;
  $('.wrapper').append($modal);
  $('.modal').show();
}

function hideModal() {
  $('.modal').hide();
}

function filterEmployeesByName() {
  const $cards = $(".card");
  let $matched = [];
  let $filterInput = $("#filter").val();

  if ($filterInput !== "") {
    $(".card").each(function () {
      let n = $(this).children(".info").children(".name").text();
      if (n.indexOf($filterInput) < 0) {
        // $matched.push($(this));
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  } else {
    $(".card").show();
  }
}

$(document).ready(function () {

  $("#filter").keyup(function () {
    filterEmployeesByName();
  });

  $("#filter").change(function () {
    filterEmployeesByName();
  });


  $employeeDirectory.children().remove();
  fetchData();


  // When the user clicks on the button, open the modal 
  // $(document).on("click", '.card', function (event) {
  // // $('.card').click(function (event) {
  //   console.log('clicked...')
  //   // let item = event.target;
  //   // let $modal = `
  //   //           <div id="myModal" class="modal" onclick="hideModal();">
  //   //             <div class="modal-content">
  //   //               <span class="close" onclick="hideModal();">&times;</span>
  //   //               <a href="https://randomuser.me/api/portraits/men/83.jpg" class='image clearfix'>
  //   //                       <img src="https://randomuser.me/api/portraits/men/83.jpg">
  //   //                       </a>
  //   //               <ul class="modal-info">
  //   //                   <li class="name">Michael Jackson</li>
  //   //                   <li class="email">nice@ok.com </li>
  //   //                   <li class="location">NL USA</li>
  //   //               </ul>
  //   //             </div>
  //   //           </div>
  //   //           `;
  //   // $('.wrapper').append($modal);
  //   // $('.modal').show();
  //   $card = event.target
  //   console.log($card);
  //   loadModal($card);
  // });


});
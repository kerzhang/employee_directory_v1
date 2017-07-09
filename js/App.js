let $employeeDirectory = $('.ajax');

function fetchData() {
  $.ajax({
    type: "get",
    url: "https://randomuser.me/api/?results=12",
    data: "data",
    dataType: "json",
    success: function(data) {
        $.each(data.results, function (index, item) { 
          let $card = `<li class="card clearfix">
                          <a href='#' class='image clearfix'>
                            <img src=${item.picture.large}>
                            </a>
                          <ul class="info">
                            <li class="name">${item.name.first} ${item.name.last} </li>
                            <li class="email">${item.email} </li>
                            <li class="location">${item.location.city} </li>
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

$employeeDirectory.children().remove();
fetchData();


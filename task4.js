jsonData = null;

function getEvents() {
  let city = $('#citypicker').val("All");
  let month = $('#monthpicker').val("All");
  loadEvents().then(() => {
    findEvents();
  });
}

$(document).ready(function() {
    $('.selectpicker').selectpicker();
});

function loadEvents() {
  return $.getJSON('events.json', function (data) {
    jsonData = data;
    fillEvents(data);       
  });
}
function fillEvents(data) {
  data.forEach(element => {
    $('#events').append(createCard(element))
  });
}

function createCard(cardInfo) {
    let date = cardInfo.date.substring(0,2);
    let div = document.createElement('div');
    div.className = "eventcard";
    div.style.backgroundImage = `url('${cardInfo.image}')`;
    div.innerHTML = `<div class="date">${date}</div>               
    <div class="fav-icon">
        <i class="fa fa-bookmark" aria-hidden="true"></i>
    </div> 
    <label class="card-eventlabel">${cardInfo.name}</label>`;
    return div;
}

function findEvents() {
  let city = $('#citypicker').val();
  let month = $('#monthpicker').val();
  let events = [];
  if (city != 'All' && month != 'All') {
    events = jsonData.filter(element => element.date.substring(3,5) == month && element.city == city);
  } else if(city == 'All' && month !="All") {
    events = jsonData.filter(element => element.date.substring(3,5) == month);
  } else if(city != 'All' && month == "All") {
    events = jsonData.filter(element => element.city == city);
  } else {
    events = jsonData;
  }

  $('#events').empty();
  if (events.length > 0) {
    fillEvents(events);
  } else {
    $('#events').append('<h2>Nothing found:(</h2>')
  }
}

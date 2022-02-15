$( document ).ready(function() {
  console.log( "ready!" );

  let timeStamp = Math.round((new Date()).getTime() / 1000);
  console.log(timeStamp)

// format date to be unserstood by API


  $.ajax({
    url: `https://api.farmsense.net/v1/moonphases/?d=${timeStamp}`,
    type: 'GET',
    dataType: 'json',
    success: function(res) {
      console.log("phase", res[0].Phase)
      console.log(res)
      formatSearch(res);
      choosePicture(res);
    }
  })
});

function choosePicture(res) {
  let picture = $('#picture');

  switch(res[0].Phase) {
    case 'Waxing Gibbous':
      picture.append("<img src='./img/wg.jpeg'></img>");
      break;
    case 'Waxing Crescent':
      picture.append("<img src='./img/waxing-crescent.jpeg'></img>");
      break;
    case 'Waning Crescent':
      picture.append("<img src='./img/waning-crescent.jpeg'></img>");
      break;
    case 'Waning Gibbous':
      picture.append("<img src='./img/waning-gibous.jpeg'></img>");
      break;
    case 'New Moon':
      picture.append("<img src='./img/new-moon.jpeg'></img>");
      break;
    case 'Last Quarter':
      picture.append("<img src='./img/last-quarter.jpeg'></img>");
      break;
    case 'Full Moon':
      picture.append("<img src='./img/full-moon.jpeg'></img>");
      break;
    case 'Third Quarter':
      picture.append("<img src='./img/last-quarter.jpeg'></img>");
      break;
    case 'Dark Moon':
      picture.append("<img src='./img/waning-crescent.jpeg'></img>");
      break;
    default:
      picture.append("<img src='./img/default.jpg'></img>");
  }
}

function formatSearch(jsonObject) {
  let phase = jsonObject[0].Phase
  let illumination = `${(jsonObject[0].Illumination) * 100}%`

  let timeStamp = Math.round((new Date()).getTime() / 1000);
  console.log(timeStamp)
  let milliseconds = timeStamp * 1000;

  const newTime = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(milliseconds)

  console.log(newTime)
  

  $('#date').append(newTime)
  $('#phase').append(`Phase: ${phase}`)
  $('#illumination').append(`Illumination: ${illumination}`)
}


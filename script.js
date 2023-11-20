
// This ensures that the function runs after the HTML and CSS is loaded.
$(document).ready(function () {

  // Grabs the date and time from dayjs and generates in the window.
  function updateDateTime() {
  var currentTime = dayjs()
  $('#currentDay').html(currentTime.format('dddd, MMMM DD YYYY, h:mm:ss A'))

  // Operates through dayjs to update the specific times that have passed, what time it currently is, and what times are available in the future.
  $('.time-block').each(function() {
    var blockHour = dayjs().set('hour', parseInt($(this).attr('id').split('hour-')[1]))

    if (blockHour.isBefore(currentTime, 'hour')) {
      console.log('past')
      $(this).addClass('past').removeClass('present future')
    } else if (blockHour.isSame(currentTime, 'hour')) {
      console.log('present')
      $(this).addClass('present').removeClass('past future')
    } else {
      $(this).addClass('future').removeClass('past present')
      console.log('future')
    }
  })
}
  
updateDateTime()
setInterval(updateDateTime, 1000)
 
 
// Click listener for saveBtn to save to the local storage.
  $('.saveBtn').on('click', function() {
    var text = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');

    localStorage.setItem(time, text);
  })

  // This for loop allows the text that is entered in the description areas to be saved and remain on the scheduler when the page is refreshed.
  for (var i = 9; i <= 17; i++) {
    $('#hour-' + i + ' .description').val(localStorage.getItem('hour-' + i))
  }


});

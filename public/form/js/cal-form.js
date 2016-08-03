var events = [
  { date: '2016-08-10', title: 'Code this Calendar', location: 'Home' },
  { date: '2016-08-10', title: 'Word at Coffee Shop', location: 'Mazarine' },
  { date: '2016-08-10', title: 'Pride Parade', location: 'Castro' },
  { date: '2016-08-09',    title: 'Mike\'s Birthday', location: 'San Francisco' },
  { date: '2017-08-04',    title: 'Emily\'s 22nd Birthday', location: 'Who Knows Where?' }
];
var $cal = $('#calendar').clndr({
  template : $('#calendarTemplate').html(),
  events : events,
  forceSixRows : true
});

var HUMAN_READABLE = 'dddd, MMMM Do YYYY, h:mma'
var time_reg = /\b((0*\d)|(1[0-2]))(:\d\d(pm|am|p|a)*|pm|am|p|a)\b|noon|midnight/ig;
var address_reg = /\bat\s(.*?)(?:(?!(\sat|\sfrom|\son)).)*/ig;
var date_reg = /(\d{1,2}[\/-]\d{1,2}[\/-](\d{4}|\d{2})\b)|(\d{1,2}[\/-]\d{1,2}\b)|today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday/ig;
var repeat_action_reg = /(repeat|rep\.)\s+([MTWRFSN][T]{0,1}[W]{0,1}[R]{0,1}[F]{0,1}[S]{0,1}[N]{0,1}|daily|weekly|monthly|yearly)\b/gi


// $('.form-times').scroll(function() {
//   console.log('here');
//   $(this).html(parseInt($(this).html() + 1));
// })
var startTime = moment()
var endTime = startTime.clone().add(1, 'h');
var dateFormat = 'YYYY<br>ddd, MMM Do';
var timeFormat = 'LT'

var place = "888 North Brannan"


$('.form-times.startDate').mousewheel(function(event) {
  // console.log(event.deltaX, event.deltaY, event.deltaFactor);
  startTime.add(Math.floor(event.deltaY), 'd');
  updateStartTimeDisplay();
});

$('.form-times.endDate').mousewheel(function(event) {
  endTime.add(Math.floor(event.deltaY), 'd')
  updateEndTimeDisplay();
});


$('.form-times.startTime').mousewheel(function(event) {
  startTime.add(Math.floor(event.deltaY), 'm')
  updateStartTimeDisplay();
});

$('.form-times.endTime').mousewheel(function(event) {
  endTime.add(Math.floor(event.deltaY), 'm')
  updateEndTimeDisplay();
});

function updateEndTimeDisplay() {
  checkTimeWarning()
  $('.form-times.endTime').html(endTime.format(timeFormat));
  $('.form-times.endDate').html(endTime.format(dateFormat));
}
function updateStartTimeDisplay() {
  checkTimeWarning()
  $('.form-times.startTime').html(startTime.format(timeFormat));
  $('.form-times.startDate').html(startTime.format(dateFormat));
}

function checkTimeWarning() {
  if (endTime.isBefore(startTime)) {
    $('.form-times.endTime, .form-times.endDate').addClass('warning');
  } else {
    $('.form-times.endTime, .form-times.endDate').removeClass('warning');
  }
}

function generateMapsImage(str) {
  var  a = "url(" + 'http://maps.googleapis.com/maps/api/staticmap?center=' + str.split(new RegExp("\\s+")).join('+') + '&zoom=14&scale=false&size=300x300&maptype=roadmap&format=png' + str.split(new RegExp("\\s+")).join('+') + ')'
  return a
}

function chompLeft(s, prefix) {
  if (s.indexOf(prefix) === 0) {
     s = s.slice(prefix.length);
     return s;
  } else {
    return this;
  }
}

function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

function setCursorPosition(el, pos) {
  el.each(function(index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return el;
};

// http://stackoverflow.com/questions/4767848/get-caret-cursor-position-in-contenteditable-area-containing-html-content
function getCharacterOffsetWithin(range, node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        function(node) {
            var nodeRange = document.createRange();
            nodeRange.selectNode(node);
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0;
    while (treeWalker.nextNode()) {
        charCount += treeWalker.currentNode.length;
    }
    if (range.startContainer.nodeType == 3) {
        charCount += range.startOffset;
    }
    return charCount;
}

function highlight(sentence) {
  var parsed = {};
  var m = moment();
  var address;
  var addressPoss = sentence.match(address_reg);
  if (addressPoss && addressPoss.length) {
    if (addressPoss.length == 1) {
      if (!time_reg.test(addressPoss[0])) address = chompLeft(addressPoss[0], 'at').trim();
    } else{
      for (var i = 0; i < addressPoss.length; i++) {
        if (!time_reg.test(addressPoss[i])) {
          address = chompLeft(addressPoss[i], 'at').trim();
          break;
        }
      }
    }
  }
  var times = sentence.match(time_reg);
  var date = sentence.match(date_reg);
  if (date) {
    parsed.startDate_regex = date[0];
    parsed.endDate_regex = date[1];
  }
  if (times) {
    parsed.startTime_regex = times[0];
    parsed.endTime_regex = times[1];
  }
  parsed.location = address;

  return parsed;
}
$(".what-button-text").on("blur paste input", function(e){
  var $this = $(this);
  // var cursorPos = getCharacterOffsetWithin(window.getSelection().getRangeAt(0), document.getElementById('sentence'));
  // console.log('c:', cursorPos);
 if($this.data("lastval") != $this.text()){
    if ($this.text().trim() != '') {
      $('.cal-form-submit').addClass('active');
    } else {
      $('.cal-form-submit').removeClass('active');
    }
    $this.data("lastval", $this.text());
    //change action
    var ob = highlight($this.text());
    $this.html($this.text());
    if (ob.location) {
      $this.html($this.text().replace(new RegExp(ob.location + '(?![\\s\\S]*' + ob.location + ')'), '<code class="location">$&</code>'))
      $('.where-button').css({
        'background-image' : generateMapsImage(ob.location)
      }).find('.where-button-text').text(ob.location);
    } else {
      $('.where-button').css({
        'background-image' : ''
      }).find('.where-button-text').text('');
    }
    if (ob.startDate_regex) {
      $this.html($this.html().replace(ob.startDate_regex, '<code class="date">' + ob.startDate_regex + '</code>'));
      var t = moment(ob.startDate_regex, ['M/D/YY', 'M/D/YYYY']);
      startTime.date(t.date());
      startTime.month(t.month());
      startTime.year(t.year());
      endTime.date(t.date());
      endTime.month(t.month());
      endTime.year(t.year());
      updateStartTimeDisplay();
    }
    if (ob.endDate_regex) {
      $this.html($this.html().replace(ob.endDate_regex, '<code class="date">' + ob.endDate_regex + '</code>'));
      var t = moment(ob.endDate_regex, ['M/D/YY', 'M/D/YYYY']);
      endTime.date(t.date());
      endTime.month(t.month());
      endTime.year(t.year());
      updateStartTimeDisplay();
    }
    if (ob.startTime_regex) {
      $this.html($this.html().replace(ob.startTime_regex, '<code class="time">' + ob.startTime_regex + '</code>'));
      var t = moment(ob.startTime_regex, 'h:mma');
      startTime.hour(t.hour());
      startTime.minute(t.minute());
      updateStartTimeDisplay();
    }
    if (ob.endTime_regex) {
      $this.html($this.html().replace(ob.endTime_regex, '<code class="time">' + ob.endTime_regex + '</code>'));
      var t = moment(ob.endTime_regex, 'h:mma');
      endTime.hour(t.hour());
      endTime.minute(t.minute());
      updateEndTimeDisplay();
    }
    if (!ob.endTime_regex && !ob.endDate_regex) {
      endTime = startTime.clone().add(1, 'h');
      updateEndTimeDisplay();
    }
    // $this.html($this.html().replace(repeat_action_reg, '<code class="repeat">$&</code>'));
  };
  // TODO fix cursor bug. This is just a hack
  setEndOfContenteditable(document.getElementById('sentence'));
});

var numPeople = 0
$('.with-button').click(function() {
  numPeople++;
  if (numPeople <= 5) {
    var buttonClass = (numPeople >= 5) ? 'more' : 'person';
    var icon = (numPeople >= 5) ? numPeople : '<i class="ion-person"></i></div>'
    $(this).append('<div class="with-button-node ' + buttonClass +'">' + icon + '</div>');
  }
  $('.with-button-node.more').text(numPeople)
});

$('.form-times.startDate').html(startTime.format(dateFormat));
$('.form-times.endDate').html(endTime.format(dateFormat));
$('.form-times.startTime').html(startTime.format(timeFormat));
$('.form-times.endTime').html(endTime.format(timeFormat));

let colors = [
  'rgb(0, 0, 0)',
  'rgb(255, 255, 255)',
  'rgb(229, 231, 233)',
  'rgb(191, 201, 202)',
  'rgb(131, 145, 146)',
  'rgb(93, 109, 126)',
  'rgb(44, 62, 80)',
  'rgb(66, 73, 73)',
  'rgb(0, 0, 153)',
  'rgb(51, 0, 255)',
  'rgb(0, 51, 255)',
  'rgb(0, 102, 153)',
  'rgb(0, 153, 255)',
  'rgb(102, 255, 51)',
  'rgb(51, 255, 102)',
  'rgb(153, 204, 102)',
  'rgb(0, 204, 51)',
  'rgb(51, 153, 0)',
  'rgb(51, 102, 0)',
  'rgb(153, 102, 0)',
  'rgb(102, 51, 0)',
  'rgb(51, 0, 0)',
  'rgb(102, 0, 102)',
  'rgb(153, 0, 102)',
  'rgb(153, 0, 204)',
  'rgb(204, 0, 255)',
  'rgb(255, 153, 255)',
  'rgb(255, 51, 255)',
  'rgb(255, 0, 153)',
  'rgb(204, 0, 51)',
  'rgb(255, 0, 0)',
  'rgb(255, 255, 0)',
  'rgb(255, 204, 0)',
  'rgb(255, 204, 102)',
  'rgb(204, 153, 0)',
  'rgb(255, 153, 0)',
];

// Select the inputs and the table tag
let table = $('#table');
let sizeInput = $('#input_size');
let colorContainer = $('#color-picker');
let methodClickButton = $('.click');
let methodDrawButton = $('.draw');
let refreshButton = $('.refresh');

//default color
let color = colors[0];
let selectedColor;
let drawMethod = 'click';
var tableSize = 600;

// Event handlers
$('#sizePicker').click(e => {
  makeGrid();
});

methodClickButton.click(function() {
  drawMethod = 'click';
  addCellHandles();
});

methodDrawButton.click(function() {
  drawMethod = 'draw';
  addCellHandles();
});

refreshButton.click(function() {
  $('.table-container').addClass('refreshing');
  refreshTable();
  setTimeout(function() {
    $('.table-container').removeClass('refreshing');
  }, 1000);
});

// initialize table with default height + width
init();

function makeGrid() {
  // Get the height and width of table, default size 5
  let sizeVal = sizeInput.val();
  let size = sizeVal > 0 || sizeVal < 71 ? sizeInput.val() : 40;

  // Create the table
  table.empty(); //empty the table of all content before adding other
  table.append(createTable(size));

  // add event hasizedlers to all cells
  addCellHandles();
}

// create table
function createTable(s) {
  var squareSize = tableSize / s - 2;
  console.log(squareSize);
  $('.square').remove();

  for (var i = 0; i < s * s; i++) {
    table.append("<div class='square'></div>");
  }

  $('.square').width(squareSize);
  $('.square').height(squareSize);
}

function addCellHandles() {
  let td = $('.square');
  if (drawMethod === 'click') {
    console.log('change to click');
    td.off('mouseover');
    td.click(function() {
      if ($(this).hasClass('selected')) {
        $(this).css('background-color', 'rgb(232,232,232)');
        $(this).toggleClass('selected');
      } else {
        $(this).css('background-color', color);
        $(this).toggleClass('selected');
      }
    });
  } else {
    console.log('change to mouseover');
    td.off('click');
    td.mouseover(function() {
      $(this).css('background-color', color);
      $(this).toggleClass('selected');
    });
  }
}

function createColorPicker() {
  for (let i = 0; i < colors.length; i++) {
    // create color
    let elem = $("<div class='color-square'></div>")
      .css('background-color', colors[i])
      .click(function(e) {
        // select new color
        $(this).addClass('color-selected');
        // unselect previous color
        selectedColor.removeClass('color-selected');

        selectedColor = $(this);
        color = e.target.style.backgroundColor;
      });

    // default color is fist color in array
    if (i === 0) {
      color = elem.css('background-color');
      selectedColor = elem;
    }
    elem.appendTo(colorContainer);
  }
}

function refreshTable() {
  $('.square').each(function() {
    $(this).css('background-color', 'rgb(232,232,232)');
  });
}

function init() {
  createColorPicker();
  makeGrid();
}

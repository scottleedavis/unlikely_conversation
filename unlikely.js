
const lstm_trump = new ml5.LSTMGenerator('models/trump', modelReadyTrump);
const lstm_darwin = new ml5.LSTMGenerator('models/darwin', modelReadyDarwin);
const lstm_hemingway = new ml5.LSTMGenerator('models/hemingway', modelReadyHemingway);
const lstm_shakespeare = new ml5.LSTMGenerator('models/shakespeare', modelReadyShakespeare);

let textInput;
let tempSlider;
let lengthSlider;


function modelReadyTrump() {
  select('#status-trump').html('Model Loaded');
}

function modelReadyDarwin() {
  select('#status-darwin').html('Model Loaded');
}

function modelReadyHemingway() {
  select('#status-hemingway').html('Model Loaded');
}

function modelReadyShakespeare() {
  select('#status-shakespeare').html('Model Loaded');
}


function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  button = select('#generate');

  // result = select('#result')

  // result.input(generate)

  textInput.keyPressed
  button.mousePressed(generate);

}

let ctr = 0;
function generate() {

  switch(ctr % 4) {
    case 0:
        select('#status-shakespeare').html('Generating...');
        break;
    case 1:
        select('#status-trump').html('Generating...');
        break;
    case 2:
        select('#status-darwin').html('Generating...');
        break;
    case 3:
        select('#status-hemingway').html('Generating...');
        break;
  }

  let original = textInput.value();
  let txt = original.toLowerCase();

  if (txt.length > 0) {
    let data = {
      seed: txt,
      temperature: 0.9, 
      length: Math.min(Math.max(parseInt(txt.length * 2), 50), 250)
    };

    switch( ctr++ % 4) {
      case 0:
    lstm_shakespeare.generate(data, gotDataShakespeare);

    function gotDataShakespeare(result) {
      select('#status-shakespeare').html('Ready!');
      textInput.value(result.generated);
      select('#result').html('<h3>shakespeare</h3>'+result.generated+'<hr>'+select('#result').html());
      setTimeout(function(){
        generate();
      }, 1000);
    }
      break;
      case 1:
    lstm_trump.generate(data, gotDataTrump);

    function gotDataTrump(result) {
      select('#status-trump').html('Ready!');
      textInput.value(result.generated);
      select('#result').html('<h3>trump</h3>'+result.generated+'<hr>'+select('#result').html());
      setTimeout(function(){
        generate();
      }, 1000);
    }
      break;
      case 2:
    lstm_darwin.generate(data, gotDataDarwin);

    function gotDataDarwin(result) {
      select('#status-darwin').html('Ready!');
      textInput.value(result.generated);
      select('#result').html('<h3>darwin</h3>'+result.generated+'<hr>'+select('#result').html());
      setTimeout(function(){
        generate();
      }, 1000);
    }
    break;
    case 3:

    lstm_hemingway.generate(data, gotDataHemingway);

    function gotDataHemingway(result) {
      select('#status-hemingway').html('Ready!');
      textInput.value(result.generated);
      select('#result').html('<h3>hemingway</h3>'+result.generated+'<hr>'+select('#result').html());
      setTimeout(function(){
        generate();
      }, 1000);
    }
    break;
    }
  }


}

function onEnterPressed() {
  let key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    generate();
    return false;
  }
  else {
    return true;
  }
}

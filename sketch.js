F = 15;
A = 45;
input_string = "F[F+F-F]F";
stack = [];
instructions = [];
_x = 550;
_y = 550;
window.onload=function(){
  document.body.addEventListener('click', function (event) {
    _x = event.pageX;
    _y = event.pageY;
    console.log(_x + " " + _y);
    onUserInput();
  });
}



function onUserInput() {
  console.log("In onuserinput");
  F = document.getElementById("length").value;
  A = document.getElementById("angle").value;
  input_string = document.getElementById("rule").value;
  console.log("user input, values : " + F + A + input_string);

  tokens = parse(input_string);
  tokens = apply_pattern(tokens);
  tokens = apply_pattern(tokens);

  interpret(tokens);
  redraw();
}


function parse(input_string) {
  var tokens = input_string.split("");
  console.log("tokens: " + tokens);
  return tokens;
}
function interpret(tokens) {
  var tokens = tokens.reverse();
  while (tokens.length > 0) {
    token = tokens.pop();
    instruction = interpret_token(token);
    instructions.push(instruction);
  }
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(700, 700);
  angleMode(DEGREES);
  //input_string = "F[+F][-F][--F]+F";
  //"F[+F][++F][-F][--F]F";
  tokens = parse(input_string);
  tokens = apply_pattern(tokens);
  tokens = apply_pattern(tokens);

  interpret(tokens);

  noLoop();
}

function draw() {
  background("#e3dddc");
//background(200);
  var x = _x;
  var y = _y;
  var angle = 180;

  for (let i = 0; i <instructions.length; i++) {
    if (angle == undefined) {
    }
    [x, y, angle] = instructions[i](x, y, angle);
  }
}

function apply_pattern(tokens) {
  var result = [];
  for (i=0; i < tokens.length; i++) {

    if (tokens[i] === "F") {
      result = result.concat(tokens);
    } else {
      result.push(tokens[i]);
    }
  }
return result;
}

function interpret_token(token) {
  if (token === "F") {
    return draw_line;
  }
  if (token === "+") {
    return plus_rotate;
  }
  if (token === "-") {
    return minus_rotate;
  }
  if (token === "[") {
    return _push;
  }
  if (token === "]") {
    return _pop;
  }
}

function draw_line(x, y, angle) {
  var new_x = get_new_x(x, angle);
  var new_y = get_new_y(y, angle);
    console.log("F draw line from: " + x + " " + y + " to " + new_x  + " " + new_y);
  line(x, y, new_x, new_y);
  return [new_x, new_y, angle];
}

function get_new_x(x, angle) {
  var sin_of_angle =  Math.sin(toRadians(angle));
  return x + (sin_of_angle * F);
}

function get_new_y(y, angle) {
  var cos_of_angle = Math.cos(toRadians(angle));
  return y + (cos_of_angle * F);
}

function plus_rotate(x, y, angle) {
  var new_angle = angle + A;
    console.log("+ plus rot, old: " + angle + " new: " + new_angle);
  return [x, y, new_angle];
}

function minus_rotate(x, y, angle) {
  var new_angle = angle - A;
  console.log("- minus rot, old: " + angle + " new: " + new_angle);
  return [x, y, new_angle];
}

function _push(x, y, angle) {
  console.log("[ pushing vals to stack: " + x + " " + y+ " " + angle)
  stack.push(x);
  stack.push(y);
  stack.push(angle);
  return [x, y, angle];
}

function _pop(x, y, angle) {
  if (stack.length < 3) {
    console.log("not enough numbers on stack!");
    return [x, y, angle];
  }
  new_angle = stack.pop();
  new_y = stack.pop();
  new_x = stack.pop();
  console.log("] new vals from stack: " + new_x + " " + new_y+ " " + new_angle)
  return [new_x, new_y, new_angle];
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}





function test() {
  var passed = true;
  if (toRadians(360) < 6.28 || toRadians(360) > 6.29) {
    passed = false;
    console.log("FAILED: toRadians(360) < 6.28 || toRadians(360) > 6.29");
  }
  if (get_new_x(50, 0) != 50) {
    passed = false;
    console.log("FAILED: get_new_x(50, 0) != 50");
  }
  if (get_new_y(50, 90) != 50) {
    passed = false;
    console.log("FAILED: get_new_y(50, 90) != 50");
  }

  if (passed) {
    console.log("TESTS ALL PASSED!");
  }
}

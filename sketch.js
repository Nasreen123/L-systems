F = 25;
A = 45;
stack = [];
instructions = [];

function parse(input_string) {
  var tokens = input_string.split("");
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
  //test();
  // setFrameRate(0.1);
  createCanvas(500, 500);
  input_string = "F[+F][-F][--F]+F";
  //"F[+F][++F][-F][--F]F";
  tokens = parse(input_string);
  tokens = apply_pattern(tokens);
  tokens = apply_pattern(tokens);
  tokens = apply_pattern(tokens);


  // tokens = apply_pattern(tokens);
  // tokens = apply_pattern(tokens);
  console.log("tokens: " + tokens);
  interpret(tokens);
}

function draw() {
  background(200);
  angleMode(DEGREES);

  var x = 200;
  var y = 200;
  var angle = 180;

  for (let i = 0; i <instructions.length; i++) {
    console.log("executing instructions, " + instructions[i] + " " + x + " " + y + " " + angle)
    if (angle == undefined) {
      console.log("angle undefined");
    }
    [x, y, angle] = instructions[i](x, y, angle);
    //console.log("EXECUTED " + instructions[i] + " " + x + " " + y + " " + angle);
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
  line(x, y, new_x, new_y);
  //console.log("printing new line from: " + x + y + " to " + new_x + new_y + " angle: " + angle);
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
  console.log("new angle is: " + new_angle);
  return [x, y, new_angle];
}

function minus_rotate(x, y, angle) {
  //console.log("angle is: " + angle);
  var new_angle = angle - A;
  //console.log("new angle is: " + new_angle);
  return [x, y, new_angle];
}

function _push(x, y, angle) {
  stack.push(x);
  stack.push(y);
  stack.push(angle);
  return [x, y, angle];
}

function _pop(x, y, angle) {
  if (stack.length < 2) {
    //console.log("STACK UNDERFLOW!");
    return [x, y, angle];
  }
  new_angle = stack.pop();
  new_y = stack.pop();
  new_x = stack.pop();

  //console.log("in pop, old: " + x + y + " new: " + new_x + new_y);
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

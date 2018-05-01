// $(function() {
//     var canvas = document.getElementById('space'),
//         ctx = canvas.getContext('2d'),
//         color = '#FFFFFF';
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.display = 'block';
//     ctx.fillStyle = color;
//     ctx.lineWidth = .1;
//     ctx.strokeStyle = color;
//     var mousePosition = {
//         x: 30 * canvas.width / 100,
//         y: 30 * canvas.height / 100
//     };
//     var dots = {
//         nb: 50,
//         distance: 80,
//         d_radius: 150,
//         array: []
//     };

//     function Dot() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = -.5 + Math.random();
//         this.vy = -.5 + Math.random();
//         this.radius = 1;
//     }
//     Dot.prototype = {
//         create: function() {
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//             ctx.fill();
//         },
//         animate: function() {
//             for (i = 0; i < dots.nb; i++) {
//                 var dot = dots.array[i];
//                 if (dot.y < 0 || dot.y > canvas.height) {
//                     dot.vx = dot.vx;
//                     dot.vy = -dot.vy;
//                 } else if (dot.x < 0 || dot.x > canvas.width) {
//                     dot.vx = -dot.vx;
//                     dot.vy = dot.vy;
//                 }
//                 dot.x += dot.vx;
//                 dot.y += dot.vy;
//             }
//         },
//         line: function() {
//             for (i = 0; i < dots.nb; i++) {
//                 for (j = 0; j < dots.nb; j++) {
//                     i_dot = dots.array[i];
//                     j_dot = dots.array[j];
//                 }
//             }
//         }
//     };

//     function createDots() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (i = 0; i < dots.nb; i++) {
//             dots.array.push(new Dot());
//             dot = dots.array[i];
//             dot.create();
//         }
//         dot.line();
//         dot.animate();
//     }
//     $('canvas').on('mousemove mouseleave', function(e) {
//         if (e.type == 'mousemove') {
//             mousePosition.x = e.pageX;
//             mousePosition.y = e.pageY;
//         }
//         if (e.type == 'mouseleave') {
//             mousePosition.x = canvas.width / 2;
//             mousePosition.y = canvas.height / 2;
//         }
//     });
//     setInterval(createDots, 1000 / 30);
// });

var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 32;
var numStars = 200;

$('document').ready(function() {
  
  // Calculate the screen size
  screenH = $(window).height();
  screenW = $(window).width();
  
  // Get the canvas
  canvas = $('#space');
  
  // Fill out the canvas
  canvas.attr('height', screenH);
  canvas.attr('width', screenW);
  context = canvas[0].getContext('2d');
  
  // Create all the stars
  for(var i = 0; i < numStars; i++) {
    var x = Math.round(Math.random() * screenW);
    var y = Math.round(Math.random() * screenH);
    var length = 1 + Math.random() * 2;
    var opacity = Math.random();
    
    // Create a new star and draw
    var star = new Star(x, y, length, opacity);
    
    // Add the the stars array
    stars.push(star);
  }
  
  setInterval(animate, 1000 / fps);
});

/**
 * Animate the canvas
 */
function animate() {
  context.clearRect(0, 0, screenW, screenH);
  $.each(stars, function() {
    this.draw(context);
  })
}

/**
 * Star
 * 
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
  this.x = parseInt(x);
  this.y = parseInt(y);
  this.length = parseInt(length);
  this.opacity = opacity;
  this.factor = 1;
  this.increment = Math.random() * 0.03;
}

/**
 * Draw a star
 * 
 * This function draws a start.
 * You need to give the contaxt as a parameter 
 * 
 * @param context
 */
Star.prototype.draw = function() {
  context.rotate((Math.PI * 1 / 10));
  
  // Save the context
  context.save();
  
  // move into the middle of the canvas, just to make room
  context.translate(this.x, this.y);
  
  // Change the opacity
  if(this.opacity > 1) {
    this.factor = -1;
  }
  else if(this.opacity <= 0) {
    this.factor = 1;
    
    // this.x = Math.round(Math.random() * screenW);
    // this.y = Math.round(Math.random() * screenH);
  }
    
  this.opacity += this.increment * this.factor;
  
  context.beginPath()
  for (var i = 5; i--;) {
    context.lineTo(0, this.length);
    context.translate(0, this.length);
    context.rotate((Math.PI * 2 / 10));
    context.lineTo(0, - this.length);
    context.translate(0, - this.length);
    context.rotate(-(Math.PI * 6 / 10));
  }
  context.lineTo(0, this.length);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
  context.shadowBlur = 5;
  context.shadowColor = '#ffff33';
  context.fill();
  
  context.restore();
}







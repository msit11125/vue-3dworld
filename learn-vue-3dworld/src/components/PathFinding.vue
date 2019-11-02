<template>
  <div>
    <canvas id="c" width="400" height="400" />
    <button id="btn">Start</button>
  </div>
</template>
<style scoped>
canvas {
  border: 1px solid black;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // block size`
    var size = 20;

    // get some info about the canvas
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");

    // how many cells fit on the canvas
    var w = ~~(canvas.width / size);
    var h = ~~(canvas.height / size);

    // create empty matrix array
    var matrix = new Array(h);
    for (var y = 0; y < h; ++y) {
      matrix[y] = new Array(w);
    }

    function fill(s, gx, gy) {
      ctx.fillStyle = s;
      ctx.fillRect(gx * size, gy * size, size, size);
    }
    var mouseDown = 0;
    document.body.onmousedown = function() {
      ++mouseDown;
    };
    document.body.onmouseup = function() {
      --mouseDown;
    };
    // click event, using jQuery for cross-browser convenience
    $(canvas).mousemove(function(e) {
      // quick fill function to save repeating myself later
      if (mouseDown == 0) {
        return;
      }
      // get mouse click position
      var mx = e.offsetX;
      var my = e.offsetY;

      // calculate grid square numbers
      var gx = ~~(mx / size);
      var gy = ~~(my / size);

      // make sure we're in bounds
      if (gx < 0 || gx >= w || gy < 0 || gy >= h) {
        return;
      }

      if (matrix[gy][gx]) {
      } else {
        matrix[gy][gx] = 1;
        fill("black", gx, gy);
      }
    });

    $("#btn").click(function(e) {
      var PF = require("pathfinding");
      var grid = new PF.Grid(5, 3);

      var grid = new PF.Grid(matrix);

      var finder = new PF.AStarFinder();

      var path = finder.findPath(0, 0, 19, 19, grid);

      path.forEach(element => {
        fill("lightgray", element[0], element[1]);
      });
      // start
      fill("blue", 0, 0);
      // end
      fill("red", 19, 19);
      console.log(path);
    });

     // start
    fill("blue", 0, 0);
    // end
    fill("red", 19, 19);
  }
};
</script>
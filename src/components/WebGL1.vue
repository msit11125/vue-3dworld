<template>
  <div>
    <canvas width="400" height="400" id="canvas" />

    <script id="shader-fs" type="x-shader/x-fragment">
      // shader program
      precision mediump float;
      uniform vec4 color;
      
      void main(void) {
        gl_FragColor = color;
      }
    </script>

    <script id="shader-vs" type="x-shader/x-vertex">
      // 我們在這裡撰寫 GSGL
      // vec4 代表一個向量，接收四個參數(x,y,z,w)
      // 0,0,0 在 3d 座標中代表中心

      attribute vec4 position;
      attribute float size;

      void main(void) {
        gl_Position = position;
        gl_PointSize = size;
      }
    </script>
  </div>
</template>

<script>

export default {
  data() {
    return {
      POINTS_COUNT: 1000
    };
  },
  methods: {
    initGL() {
      var canvas = document.querySelector("#canvas");
      var gl = canvas.getContext("webgl");

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);

      return gl;
    },

    createShaders(gl, type) {
      var shaderScript = "";
      var shader;

      switch (type) {
        case "fragment":
          shaderScript = document.querySelector("#shader-fs").textContent;
          shader = gl.createShader(gl.FRAGMENT_SHADER);
          break;
        case "vertex":
          shaderScript = document.querySelector("#shader-vs").textContent;
          shader = gl.createShader(gl.VERTEX_SHADER);
          break;
      }

      gl.shaderSource(shader, shaderScript);
      gl.compileShader(shader);
  
      return shader;
    },

    initShaders(gl) {
      var vertexShader = this.createShaders(gl, "vertex");
      var fragmentShader = this.createShaders(gl, "fragment");

      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);

      return shaderProgram;
    },

    times(times) {
      var array = [];
      for (var i = 0; i < times; i++) {
        array.push(null);
      }

      return array;
    },

    createPoints(gl, program) {
      var points = gl.getAttribLocation(program, "position");
      var size = gl.getAttribLocation(program, "size");
      var vertices = [];

      var that = this;
      // 伯朗隨機運動
      // vertices = times(POINTS_COUNT * 2)
      //   .map((val, i) => Math.random() * 2 - 1);
      // 圓形運動
      vertices = this.times(that.POINTS_COUNT * 2).map(
        (val, i) => Math.sin(Math.random()) * -0.01
      );

      var buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      //                 type                    data              usage
      // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.DYNAMIC_DRAW
      );

      // gl.vertexAttrib3f(points, 0.0, 0, 0);
      gl.vertexAttribPointer(points, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(points);

      gl.vertexAttrib1f(size, 2.0);

      var color = gl.getUniformLocation(program, "color");
      gl.uniform4f(color, 0, 0.6, 0.8, 1);

      return vertices;
    },

    draw(gl, vertices) {

      // monitored code goes here
 
      for (var i = 0; i < this.POINTS_COUNT * 2; i += 2) {
        vertices[i] += Math.random() * 0.01 - 0.005;
        vertices[i + 1] += Math.random() * 0.01 - 0.005;
      }

      // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, this.POINTS_COUNT);

      const bindDraw = (gl, vertices) => () => this.draw(gl, vertices);

      
      requestAnimationFrame(bindDraw(gl, vertices));

    }
  },
  mounted() {
    var gl = this.initGL();
    var shaderProgram = this.initShaders(gl);
    var vertices = this.createPoints(gl, shaderProgram);

    this.draw(gl, vertices);
  }
};
</script>
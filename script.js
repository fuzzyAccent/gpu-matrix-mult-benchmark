const mat_size = 2048;
const gpu = new GPU();
const multiplyMatrix = gpu.createKernel(function(a, b) {
  var sum = 0;
  for (var i = 0; i < 2048; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
  }
  return sum;
}).setOutput([2048, 2048]);

let a = new Array(mat_size * mat_size);
let b = new Array(mat_size * mat_size);

a.fill(1);
b.fill(2);

let gpu_a = new GPU.Input(new Float32Array(a), [mat_size, mat_size]);
let gpu_b = new GPU.Input(new Float32Array(b), [mat_size, mat_size]);
let t0 = performance.now();
const c = multiplyMatrix(gpu_a, gpu_b);
let t1 = performance.now();
console.log(t1 - t0);

t0 = performance.now();
let mul = new Array(mat_size);
for (var i = 0; i < mat_size; i++) {
  mul[i] = new Array(mat_size).fill(0);
  for (var j = 0; j < mat_size; j++) {
    for(var k = 0; k < mat_size; k++){
      mul[i][j] += a[i*mat_size + k] * b[k*mat_size + j];
    }
  }
}
t1 = performance.now();
console.log(t1 - t0);

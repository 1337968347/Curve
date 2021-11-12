const canvasEl = document.querySelector('canvas');
const ctx = canvasEl.getContext('2d');

const q = [
  [-2, 2],
  [3, -1],
  [8, 10],
  [15, 10],
];

const calcU = u => {
  return [1 - 3 * u * u + 2 * u * u * u, 3 * u * u - 2 * u * u * u, u - 2 * u * u + u * u * u, -u * u + u * u * u];
};

const mult = (c, m) => {
  let result = [0, 0];
  for (let i = 0; i < c.length; i++) {
    const [x, y] = c[i];
    const k = m[i];
    result = [result[0] + x * k, result[1] + y * k];
  }
  return result;
};

const draw = () => {
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.moveTo(q[0][0] * 20 + 50, q[0][1] * 20 + 50);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 0.5;
  for (let u = 0; u < 1; u += 0.001) {
    const xishu = calcU(u);
    const [x, y] = mult(q, xishu);
    ctx.lineTo(x * 20 + 50, y * 20 + 50);
    ctx.stroke();
  }
};

draw();

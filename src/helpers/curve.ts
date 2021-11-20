import { mat4, vec4 } from './MV';

/**
 * Hermite几何矩阵
 */
// prettier-ignore
export const HERMITE_MATRIX = mat4.create(new Float32Array(
    [
        1,  0,  0,  0,
        0,  0,  1,  0,
        -3, 3, -2,  -1,
        2,- 2,  1,   1
    ]
))

/**
 * 贝塞尔矩阵
 */
// prettier-ignore
export const BEZIER_MATRIX = mat4.create(new Float32Array(
  [
      1,  0,  0,  0,
      -3, 3,  0,  0,
      3,  -6, 3,  0,
      -1, 3,  -3, 1
  ]
))

const getU = u => {
  return new Float32Array([1, u, u * u, u * u * u]);
};

/**
 * f(u) = C0 + uC1 + u*uC2 + u*u*u*C3
 * ∑k(0-3) Ck* u的K次方
 * f(u) = u M P
 * 根据插值矩阵 ，U， 控制点进行插值
 * @param matrix
 * @param u
 * @param controlPoints
 * 控制点 P1 P2 P3 P4
 * 其中P1 P2是插值点， P3 P4是拟合点
 */
export const getCurvePoints = (matrix: Float32Array, N: number, controlPoints: Array<Array<number>>) => {
  // 调和函数
  const harmonicVec4 = vec4.create();

  const points = new Array(N);

  if (controlPoints.length !== harmonicVec4.length) throw new Error('插值点错误');

  let d = 1 / N;
  for (let i = 0; i <= N; i++) {
    const u = i * d;
    const uVec4 = getU(u);
    mat4.multiplyVec4(matrix, uVec4, harmonicVec4);
    points[i] = dot(harmonicVec4, controlPoints);
  }

  return points;
};

// 根据调和函数的值 插值坐标点
const dot = (harmonic: Float32Array, controlPoints: Array<Array<number>>) => {
  if (harmonic.length !== controlPoints.length) throw new Error('向量长度不一致');

  const result = new Array(harmonic.length);

  for (let i = 0; i < harmonic.length; i++) {
    const dimension = controlPoints[i].length;
    result[i] = new Array(dimension);

    for (let j = 0; j < dimension; j++) {
      result[i][j] = controlPoints[i][j] * harmonic[i];
    }
  }
  return result.reduce((pre, cur) => {
    return pre.map((p, index) => {
      return p + cur[index];
    });
  });
};

export const interpolate = (t, degree, points, knots, weights, result) => {
  var i, j, s, l; // function-scoped iteration variables
  var n = points.length; // points count
  var d = points[0].length; // point dimensionality

  if (degree < 1) throw new Error('degree must be at least 1 (linear)');
  if (degree > n - 1) throw new Error('degree must be less than or equal to point count - 1');

  if (!weights) {
    // build weight vector of length [n]
    weights = [];
    for (i = 0; i < n; i++) {
      weights[i] = 1;
    }
  }

  if (!knots) {
    // build knot vector of length [n + degree + 1]
     knots = [];
    for (i = 0; i < n + degree + 1; i++) {
      knots[i] = i;
    }
  } else {
    if (knots.length !== n + degree + 1) throw new Error('bad knot vector length');
  }

  var domain = [degree, knots.length - 1 - degree];

  // remap t to the domain where the spline is defined
  var low = knots[domain[0]];
  var high = knots[domain[1]];
  t = t * (high - low) + low;

  if (t < low || t > high) throw new Error('out of bounds');

  // find s (the spline segment) for the [t] value provided
  for (s = domain[0]; s < domain[1]; s++) {
    if (t >= knots[s] && t <= knots[s + 1]) {
      break;
    }
  }

  // convert points to homogeneous coordinates
  var v = [];
  for (i = 0; i < n; i++) {
    v[i] = [];
    for (j = 0; j < d; j++) {
      v[i][j] = points[i][j] * weights[i];
    }
    v[i][d] = weights[i];
  }

  // l (level) goes from 1 to the curve degree + 1
  var alpha;
  for (l = 1; l <= degree + 1; l++) {
    // build level l of the pyramid
    for (i = s; i > s - degree - 1 + l; i--) {
      alpha = (t - knots[i]) / (knots[i + degree + 1 - l] - knots[i]);

      // interpolate each component
      for (j = 0; j < d + 1; j++) {
        v[i][j] = (1 - alpha) * v[i - 1][j] + alpha * v[i][j];
      }
    }
  }

  // convert back to cartesian and return
  var result = result || [];
  for (i = 0; i < d; i++) {
    result[i] = v[s][i] / v[s][d];
  }

  return result;
};

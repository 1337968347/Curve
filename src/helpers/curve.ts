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

  if (controlPoints.length !== harmonicVec4.length) throw '插值点错误';

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
  if (harmonic.length !== controlPoints.length) throw '向量长度不一致';

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

import { mat4, vec4 } from './MV';

export const makeHermiteLines = (controlPoints: Array<Array<number>>) => {
  /**
   * Hermite几何矩阵
   */
  // prettier-ignore
  const HERMITE_MATRIX = mat4.create(new Float32Array(
    [
        1,  0,  0,  0,
        0,  0,  1,  0,
        -3, 3, -2,  -1,
        2,- 2,  1,   1
    ]
))

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
  const getPosition = (u: number) => {
    // 调和函数
    const harmonicVec4 = vec4.create();
    const uVec4 = vec4.create(new Float32Array([1, u, u * u, u * u * u]));
    mat4.multiplyVec4(HERMITE_MATRIX, uVec4, harmonicVec4);

    if (controlPoints.length !== harmonicVec4.length) throw '插值点错误';

    const result: Array<Array<number>> = Array.from(harmonicVec4).map((harmonicI, index) => {
      const point = controlPoints[index];
      return point.map(coordinate => coordinate * harmonicI);
    });

    return result;
  };

  return { getPosition };
};

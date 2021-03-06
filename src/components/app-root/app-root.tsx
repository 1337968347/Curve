import { Component, Element, h } from '@stencil/core';
import { getCurvePoints, HERMITE_MATRIX, BEZIER_MATRIX } from '../../helpers/curve';
import { makeDivideCurve } from '../../helpers/utah';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Element() el: HTMLElement;

  componentDidLoad() {
    document.querySelector('ion-content').innerHTML = '';
    makeDivideCurve();
    // this.makeHermiteCurve();
    // this.makeBezierCurve();
  }

  /**
   * Hermite曲线
   */
  makeHermiteCurve() {
    const N = 5;
    const controlPoints = [
      [-200, 200],
      [200, -100],
      [200, 200],
      [-150, -200],
    ];

    const points = getCurvePoints(HERMITE_MATRIX, N, controlPoints);
    const coordinateEl = document.createElement('cy-coordinate');
    coordinateEl.width = 600;
    coordinateEl.height = 600;
    coordinateEl.curveTitle = 'Hermite 曲线';
    coordinateEl.setControlPoints(controlPoints);
    coordinateEl.setPoints(points);
    document.querySelector('ion-content').appendChild(coordinateEl);
  }

  /**
   * 贝塞尔曲线
   */
  makeBezierCurve() {
    const N = 5;
    const controlPoints = [
      [0, 0],
      [0, 200],
      [200, 0],
      [200, 200],
    ];

    const points = getCurvePoints(BEZIER_MATRIX, N, controlPoints);
    const coordinateEl = document.createElement('cy-coordinate');
    coordinateEl.width = 600;
    coordinateEl.height = 600;
    coordinateEl.curveTitle = '贝塞尔 曲线';
    coordinateEl.setControlPoints(controlPoints);
    coordinateEl.setPoints(points);
    document.querySelector('ion-content').appendChild(coordinateEl);
  }

  render() {
    return (
      <ion-app>
        <ion-content></ion-content>
      </ion-app>
    );
  }
}

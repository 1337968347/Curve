import { Component, Element, State, h } from '@stencil/core';
import { getCurvePoints, HERMITE_MATRIX } from '../../helpers/curve';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Element() el: HTMLElement;
  @State() hermitePoints: Array<Array<number>> = [];
  @State() hermiteControlPoints: Array<Array<number>> = [];

  componentWillLoad() {
    const N = 30;

    this.hermiteControlPoints = [
      [-200, 200],
      [200, -100],
      [200, 200],
      [150, -200],
    ];

    this.hermitePoints = getCurvePoints(HERMITE_MATRIX, N, this.hermiteControlPoints);
  }

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>曲线</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <cy-coordinate points={this.hermitePoints} controlPoints={this.hermiteControlPoints} width={500} height={500} />
        </ion-content>
      </ion-app>
    );
  }
}

import { Component, Element, State, h } from '@stencil/core';
import { getCurvePoints, HERMITE_MATRIX } from '../../helpers/curve';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Element() el: HTMLElement;
  @State() hermitePoints: Array<Array<number>> = [];

  componentWillLoad() {
    const N = 20;

    const p = [
      [-200, 200],
      [200, -200],
      [200, 200],
      [150, 400],
    ];

    this.hermitePoints = getCurvePoints(HERMITE_MATRIX, N, p);
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
          <cy-coordinate points={this.hermitePoints} />
        </ion-content>
      </ion-app>
    );
  }
}

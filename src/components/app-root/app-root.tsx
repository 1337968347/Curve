import { Component, Element, h } from '@stencil/core';
import { makeHermiteLines } from '../../helpers/curve';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  @Element() el: HTMLElement;
  componentDidLoad() {
    const canvasEl = this.el.querySelector('canvas');
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
          <canvas></canvas>
        </ion-content>
      </ion-app>
    );
  }
}

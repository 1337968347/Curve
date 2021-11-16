import { Component, Prop, Element, h } from '@stencil/core';

@Component({
  tag: 'cy-coordinate',
  styleUrl: 'coordinate.css',
})
export class coordinate {
  @Prop() points: Array<Array<number>>;
  @Element() el: HTMLElement;

  componentDidLoad() {
    this.draw(this.points);
  }

  draw(points: Array<Array<number>>) {
    const canvasEl = this.el.querySelector('canvas');
    const width = 500;
    const height = 500;
    canvasEl.width = width;
    canvasEl.height = height;
    const ctx = canvasEl.getContext('2d');
    this.drawCoordinate(ctx, height, height);
    this.drawPoints(ctx, points, width, height);
  }

  // 绘制坐标系
  drawCoordinate(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
  }

  drawPoints(ctx: CanvasRenderingContext2D, points: Array<Array<number>>, width: number, height: number) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 0.5;
    const center = [width / 2, height / 2];
    ctx.moveTo(points[0][0] + center[0], -points[0][1] + center[1]);
    for (const point of points) {
      ctx.lineTo(point[0] + center[0], -point[1] + center[1]);
      ctx.stroke();
    }
  }

  render() {
    return <canvas></canvas>;
  }
}

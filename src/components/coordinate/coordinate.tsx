import { Component, Prop, Element, h } from '@stencil/core';

@Component({
  tag: 'cy-coordinate',
  styleUrl: 'coordinate.css',
})
export class coordinate {
  @Prop() points: Array<Array<number>> = [];
  @Prop() controlPoints: Array<Array<number>> = [];
  @Prop() width: number = 500;
  @Prop() height: number = 500;
  @Element() el: HTMLElement;

  componentDidLoad() {
    this.draw();
  }

  draw() {
    const canvasEl = this.el.querySelector('canvas');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    const ctx = canvasEl.getContext('2d');
    this.drawCoordinate(ctx);
    this.drawLines(ctx, this.points);
    this.drawPoints(ctx, this.controlPoints);
  }

  // 绘制坐标系
  drawCoordinate(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(0, this.height / 2);
    ctx.lineTo(this.width, this.height / 2);
    ctx.stroke();
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height);
    ctx.stroke();
  }

  drawLines(ctx: CanvasRenderingContext2D, points: Array<Array<number>>) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 0.5;
    const center = [this.width / 2, this.height / 2];
    ctx.moveTo(points[0][0] + center[0], -points[0][1] + center[1]);
    for (const point of points) {
      ctx.lineTo(point[0] + center[0], -point[1] + center[1]);
      ctx.stroke();
    }
  }

  drawPoints(ctx: CanvasRenderingContext2D, points: Array<Array<number>>) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 0.5;

    for (const point of points) {
      const movePoint = this.getCoordinate(point as [number, number]);
      ctx.moveTo(movePoint[0], movePoint[1]);
      ctx.arc(movePoint[0], movePoint[1], 5, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  // 坐标转换
  getCoordinate(point: [number, number]) {
    return [point[0] + this.width / 2, -point[1] + this.height / 2];
  }

  render() {
    return <canvas></canvas>;
  }
}

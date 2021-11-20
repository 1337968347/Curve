import { Component, Prop, Element, Method, h } from '@stencil/core';

@Component({
  tag: 'cy-coordinate',
  styleUrl: 'coordinate.css',
})
export class coordinate {
  @Prop() curveTitle: string = 'Hermite 曲线';
  @Prop() width: number = 500;
  @Prop() height: number = 500;
  @Element() el: HTMLElement;

  points: Array<Array<number>> = [];
  controlPoints: Array<Array<number>> = [];

  ctx: CanvasRenderingContext2D;
  componentDidLoad() {
    const canvasEl = this.el.querySelector('canvas');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.ctx = canvasEl.getContext('2d');
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawCoordinate(this.ctx);
    this.drawLines(this.ctx, this.points);
    this.drawPoints(this.ctx, this.controlPoints);
  }

  @Method()
  async setPoints(points: Array<Array<number>> = []) {
    this.points = points;
    this.draw();
  }

  @Method()
  async setControlPoints(controlPoints: Array<Array<number>> = []) {
    this.controlPoints = controlPoints;
    this.draw();
  }

  // 绘制坐标系
  drawCoordinate(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.moveTo(0, this.height / 2);
    ctx.lineTo(this.width, this.height / 2);
    ctx.stroke();
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height);
    ctx.stroke();
    ctx.restore();
  }

  // 根据顶点绘制折现
  drawLines(ctx: CanvasRenderingContext2D, points: Array<Array<number>>) {
    if (!points[0]) return;
    ctx.save();
    ctx.lineWidth = 1;
    const center = [this.width / 2, this.height / 2];
    ctx.moveTo(points[0][0] + center[0], -points[0][1] + center[1]);
    for (const point of points) {
      ctx.lineTo(point[0] + center[0], -point[1] + center[1]);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 绘制顶点
  drawPoints(ctx: CanvasRenderingContext2D, points: Array<Array<number>>) {
    ctx.save();
    ctx.lineWidth = 0.5;
    for (const point of points) {
      ctx.beginPath();
      const movePoint = this.getCoordinate(point as [number, number]);
      ctx.moveTo(movePoint[0], movePoint[1]);
      ctx.arc(movePoint[0], movePoint[1], 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeText(`(${point[0]} , ${point[1]})`, movePoint[0] - this.width / 25, movePoint[1] + this.height / 25);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 坐标转换
  getCoordinate(point: [number, number]) {
    return [point[0] + this.width / 2, -point[1] + this.height / 2];
  }

  render() {
    return (
      <div class="curve-box">
        <h3>{this.curveTitle}</h3>
        <canvas></canvas>
      </div>
    );
  }
}

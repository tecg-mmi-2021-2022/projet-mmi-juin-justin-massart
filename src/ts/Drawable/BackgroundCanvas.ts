import {Canvas} from "./Canvas";
import {settings} from "../settings";

export class BackgroundCanvas extends Canvas {
    protected gradient: CanvasGradient;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
        this.resize();
        this.draw();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.draw();
        })

    }

    override draw() {
        this.gradient = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);
        for (let i = 0; i < settings.sky.gradient.length; i++) {
            this.gradient.addColorStop(i * (1 / (settings.sky.gradient.length - 1)), settings.sky.gradient[i])
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.fillStyle = settings.grass.color;
        this.ctx.rect(0, this.canvas.height / 4, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.fillStyle = settings.road.color;
        this.ctx.rect(0, (this.canvas.height / 4 + settings.road.freeSpace), this.canvas.width, (this.canvas.height - this.canvas.height / 4 - settings.road.freeSpace * 2));
        this.ctx.fill();
        this.ctx.closePath();
    }
}
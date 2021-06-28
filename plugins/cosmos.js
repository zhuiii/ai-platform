
/* 
依赖jquery
返回destroyTimer
*/
export const generateCosmos = (id, starscolor, starsamount, starsradius, movrange, speed, trailing, resizeDomSelector = 'body') => {
    //宇宙特效
    var canvas = document.getElementById(id),
        ctx = canvas.getContext('2d'),
        resizeDom = document.querySelector(resizeDomSelector),
        w = canvas.width = resizeDom.clientWidth,
        h = canvas.height = resizeDom.clientHeight,

        hue = starscolor,//230
        stars = [],
        count = 0,
        maxStars = starsamount;//星星数量

    var canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / movrange;
        //星星移动范围，值越大范围越小，
    }

    var Star = function () {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(starsradius, this.orbitRadius) / 8;
        //星星半径大小
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / speed;
        //星星移动速度
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    }

    Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
        new Star();
    }

    createStars();

    function createStars() {
        stars = [];
        count = 0;
        for (var i = 0; i < maxStars; i++) {
            new Star();
        }
    }

    function animation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = trailing; //尾巴
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        };

        window.requestAnimationFrame(animation);
    }

    resize();
    animation();

    // 改变父容器尺寸相关
    let resizeTimer = setInterval(() => {
        resize()
    }, 60)

    function resize() {
        if (resizeDom.clientWidth === w && resizeDom.clientHeight === h) return;
        if (resizeDom.clientHeight !== h) {
            h = canvas.height = resizeDom.clientHeight;
        }
        // 解决出现滚动条页面闪烁问题
        if (Math.abs(resizeDom.clientWidth - w) <= 17) return;
        if (resizeDom.clientWidth !== w) {
            w = canvas.width = resizeDom.clientWidth;
        }
        createStars();
    }

    const destroyTimer = () => {
        if (resizeTimer) clearInterval(resizeTimer)
    }

    return destroyTimer
}
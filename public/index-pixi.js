
const canvas = document.getElementById("mycanvas");

const app = new PIXI.Application({
    antialias: true,
    view: canvas,
    width: 800,
    height: 600,
});

// const renderer = PIXI.autoDetectRenderer();

function makeArrowGeometry() {
    const arrow = new PIXI.Graphics();

    arrow.beginFill(0x000088);
    arrow.lineStyle(4, 0xaaaaff, 1);

    arrow.moveTo(0, -50);
    arrow.lineTo(40, 50);
    arrow.lineTo(0, 30);
    arrow.lineTo(-40, 50);
    arrow.closePath();
    // arrow.pivot.set(100, 150);
    // arrow.position.set(100, 100);
    // arrow.scale.set(0.1);
    arrow.endFill();
    return arrow.geometry;
}

function makeArrowTexture() {
    const arrow = new PIXI.Graphics();

    arrow.beginFill(0x000088);
    arrow.lineStyle(4, 0xaaaaff, 1);

    arrow.moveTo(100, 100);
    arrow.lineTo(140, 200);
    arrow.lineTo(100, 180);
    arrow.lineTo(60, 200);
    arrow.closePath();
    // arrow.pivot.x = 100;
    // arrow.pivot.y = 150
    // arrow.position.x = 100;
    // arrow.position.y = 100;
    // arrow.scale.x = 0.1;
    // arrow.scale.y = 0.1;
    arrow.endFill();

    const texture = app.renderer.generateTexture(arrow);
    console.info(texture);
    arrow.destroy();
    return texture;
}

function runGraphics() {
    const geometry = makeArrowGeometry();

    const arrows = [];
    for (let i = 0; i < 40000; i++) {
        const arrow = new PIXI.Graphics(geometry);
        arrow.position.set(Math.random() * 800, Math.random() * 600);
        arrow.angle = Math.random() * 360;
        arrow.scale.set(0.2);
        app.stage.addChild(arrow);
        arrows.push(arrow);
    }

    // app.ticker.add(() => {
    //     for (const arrow of arrows) {
    //         arrow.angle += 1;
    //     }
    // });
    setInterval(() => {
        for (const arrow of arrows) {
            arrow.angle += 10;
        }
        // app.renderer.render(app.stage);
    }, 1000);
}

function run() {
    const texture = makeArrowTexture();
    // const texture = PIXI.Texture.from("logo192.png");

    const arrows = [];
    for (let i = 0; i < 10000; i++) {
        const arrow = new PIXI.Sprite(texture);
        arrow.roundPixels = true;
        arrow.anchor.set(0.5);
        arrow.position.set(Math.random() * 800, Math.random() * 600);
        arrow.angle = Math.random() * 360;
        arrow.scale.set(0.2);
        app.stage.addChild(arrow);
        arrows.push(arrow);
    }

    let nextRenderTime = performance.now() + 1000;
    let previourRenderStart = null;
    app.ticker.add(() => {
        const now = performance.now();
        if (previourRenderStart) {
            console.info(`Elapsed: ${now - previourRenderStart}`);
            previourRenderStart = null;
        }
        if (now < nextRenderTime) {
            return;
        }
        previourRenderStart = now;
        for (const arrow of arrows) {
            arrow.angle += 10;
        }
        nextRenderTime = now + 1000;
    });
    // setInterval(() => {
    //     for (const arrow of arrows) {
    //         arrow.angle += 10;
    //     }
    // }, 1000);
}

app.loader.load(run);

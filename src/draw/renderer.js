var stage, renderer;
stage = new PIXI.Stage(0x0000ff, true);
stage.setInteractive(true);
renderer = PIXI.autoDetectRenderer(320, 480, myCanvas);

var myContainer = new PIXI.DisplayObjectContainer();

r1 = new PIXI.Graphics();

r1.beginFill(0x00FF00);
r1.drawRect(10, 10, 20, 20);
r1.endFill();

r1.beginFill(0xFFFF00);
r1.drawRect(30, 10, 20, 20);
r1.endFill();

myContainer.addChild(r1);

var texture = new PIXI.RenderTexture();
texture.render(myContainer);
var background = new PIXI.Sprite(texture);

stage.addChild(background);

requestAnimFrame(animate);

function animate() {
    requestAnimFrame(animate);
    background.position.x += 0.1;
    renderer.render(stage);
}
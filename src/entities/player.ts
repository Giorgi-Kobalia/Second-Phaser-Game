import { Entity } from "./entity";

export class Player extends Entity {
  textureKey: string;
  private goSpeed: number;
  private runSpeed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    const anims = this.scene.anims;
    this.textureKey = texture;
    this.goSpeed = 6;
    this.runSpeed = 18;

    anims.create({
      key: "idle",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 30,
        end: 35,
      }),
      frameRate: 6,
      repeat: 1,
    });

    anims.create({
      key: "go",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 50,
        end: 59,
      }),
      frameRate: 10,
      repeat: 1,
    });

    anims.create({
      key: "run",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 40,
        end: 49,
      }),
      frameRate: 10,
      repeat: 1,
    });

    anims.create({
      key: "attack",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: 1,
    });

    anims.create({
      key: "death",
      frames: anims.generateFrameNumbers(this.textureKey, {
        start: 10,
        end: 13,
      }),
      frameRate: 8,
      repeat: 0,
    });
    
  }

  update(delta: number) {
    const key = this.scene.input.keyboard?.createCursorKeys();

    const onlySpacePressed =
      key?.space.isDown &&
      !key?.left.isDown &&
      !key?.right.isDown &&
      !key?.shift.isDown;

    if (key?.left.isDown && !key?.shift.isDown) {
      this.play("go", true);
      this.setVelocity(-delta * this.goSpeed, 0);
      this.setFlipX(true);
    } else if (key?.right.isDown && !key?.shift.isDown) {
      this.play("go", true);
      this.setFlipX(false);
      this.setVelocity(delta * this.goSpeed, 0);
    } else if (key?.left.isDown && key?.shift.isDown) {
      this.play("run", true);
      this.setVelocity(-delta * this.runSpeed, 0);
      this.setFlipX(true);
    } else if (key?.right.isDown && key?.shift.isDown) {
      this.play("run", true);
      this.setFlipX(false);
      this.setVelocity(delta * this.runSpeed, 0);
    } else if (onlySpacePressed) {
      this.setVelocity(0, 0);
      this.play("attack", true);
    } else {
      this.play("idle", true);
      this.setVelocity(0, 0);
    }
  }
}

import { Player } from "../entities/player";
import { SCENES } from "../utils/scene_constants";

export class Terrace extends Phaser.Scene {
  private player?: Player;
  constructor() {
    super("Terrace");
  }

  preload() {
    this.load.image(SCENES.TERRACE, "/assets/bacgrounds/terrace.png");
    this.load.spritesheet("player", "/assets/player/Player.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const bcg = this.add.sprite(centerX, centerY, SCENES.TERRACE);
    bcg.displayWidth = this.cameras.main.width;
    bcg.displayHeight = this.cameras.main.height;

    this.player = new Player(this, centerX, centerY, "player");
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
  }

  update(_: number, delta: number) {
    this.player?.update(delta);

    if (this.player) {
      const playerBounds = this.player.getBounds();
      const worldBounds = this.physics.world.bounds;

      if ((playerBounds.left === worldBounds.left)) {
        this.scene.start("DeadForest", {
          x: this.player?.x,
          y: this.player?.y,
        });
      }

      if ((playerBounds.right === worldBounds.right)) {
        this.scene.start("ThroneRoom", {
          x: this.player?.x,
          y: this.player?.y,
        });
      }
    }
  }
}

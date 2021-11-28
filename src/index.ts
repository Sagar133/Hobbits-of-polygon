import { Game, Scale, Types, WEBGL } from 'phaser';

import { Level1, LoadingScene, UIScene } from './scenes';
import { LevelForest } from './scenes/level-1/forestMap';
import { LevelIce } from './scenes/level-1/iceMap';

// type GameConfigExtended = Types.Core.GameConfig & {
//   winScore: number;
// };

export const gameConfig = {
  title: 'Collectable Quest',
  type: WEBGL,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    mode: Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, Level1, UIScene, LevelForest, LevelIce],
  winScore: 100,
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);

      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);

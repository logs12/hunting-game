import Phaser from 'phaser';
import { ANIMALS } from '../constants';
import { Animal } from './Animal';

const WEIGHTS: Record<string, number> = {
  // Tier 1
  rabbit: 30, fox: 25, pheasant: 25, sparrow: 28, mouse: 30, frog: 22,
  // Tier 2
  deer: 20, eagle: 20, duck: 22, crow: 22, hare: 24, raccoon: 18,
  boar: 15, snake: 15, turkey: 16, badger: 14,
  // Tier 3
  wolf: 14, moose: 8, lynx: 12, hawk: 14, coyote: 14, goose: 16,
  bear: 5, porcupine: 10, wolverine: 10, owl: 14, ram: 10,
  // Tier 4
  tiger: 6, bison: 5, condor: 8, panther: 6, elk: 7, vulture: 8, alligator: 5,
  // Tier 5
  rhino: 3, hippo: 2, gorilla: 3, golden_eagle: 4, mammoth: 2, dragon: 2,
};

const BOSS_RULES: Record<string, (w: number) => boolean> = {
  bear: (w) => w % 5 === 0,
  mammoth: (w) => w >= 12 && w % 8 === 0,
  dragon: (w) => w >= 15 && w % 10 === 0,
};

export class AnimalTypes {
  static getAvailableTypes(waveNum: number): string[] {
    return Object.entries(ANIMALS)
      .filter(([, cfg]) => waveNum >= cfg.minWave)
      .filter(([key]) => {
        const rule = BOSS_RULES[key];
        if (rule) return rule(waveNum);
        return true;
      })
      .map(([key]) => key);
  }

  static getWeightedRandom(waveNum: number): string {
    const types = this.getAvailableTypes(waveNum);
    if (types.length === 0) return 'rabbit';

    const available = types.map((t) => ({ type: t, weight: WEIGHTS[t] || 10 }));
    const totalWeight = available.reduce((sum, a) => sum + a.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const a of available) {
      rand -= a.weight;
      if (rand <= 0) return a.type;
    }

    return available[available.length - 1].type;
  }

  static spawn(scene: Phaser.Scene, waveNum: number): Animal {
    const type = this.getWeightedRandom(waveNum);
    return new Animal(scene, type, waveNum);
  }
}

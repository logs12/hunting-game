import { ANIMALS } from '../constants.js';
import { Animal } from './Animal.js';

export class AnimalTypes {
  static getAvailableTypes(waveNum) {
    return Object.entries(ANIMALS)
      .filter(([, cfg]) => waveNum >= cfg.minWave)
      .filter(([key]) => {
        // Bear only every 5 waves
        if (key === 'bear') return waveNum % 5 === 0;
        return true;
      })
      .map(([key]) => key);
  }

  static getWeightedRandom(waveNum) {
    const types = this.getAvailableTypes(waveNum);
    if (types.length === 0) return 'rabbit';

    const weights = {
      rabbit: 30,
      fox: 25,
      deer: 20,
      boar: 15,
      wolf: 20,
      bear: 5,
    };

    const available = types.map((t) => ({ type: t, weight: weights[t] || 10 }));
    const totalWeight = available.reduce((sum, a) => sum + a.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const a of available) {
      rand -= a.weight;
      if (rand <= 0) return a.type;
    }

    return available[available.length - 1].type;
  }

  static spawn(scene, waveNum) {
    const type = this.getWeightedRandom(waveNum);
    return new Animal(scene, type, waveNum);
  }
}

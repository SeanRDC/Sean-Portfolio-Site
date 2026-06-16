import * as THREE from "three";

export const designConfig = {
  hero: {
    shader: {
      fluidIntensity: 0.35,
      noiseIntensity: 0.12,
      barrelIntensity: 0.25,
      uvScale: 1.0,
      pulseMult: 0.05,
      colorBeige: new THREE.Color("#F4F1EA"),
    }
  },
  mosaic: {
    shader: {
      barrelMultiplier: 0.18,
      barrelMultiplierMobile: 0.08,
      fadeDivisor: 0.15,
      velocityLerp: 0.085,
    },
    parallax: {
      delayFactor: 0.035,
      positionYLerp: 0.075,
      rotationLerp: 0.06,
      scrollIntensity: 1.4,
      mobileSpreadFactor: 0.65,
    },
    fog: {
      near: 45,
      far: 85,
    }
  },
  worldwide: {
    repulsion: {
      divisorBase: 2.2,
      divisorFactor: 35.0,
      pointerMultiplier: 1.6,
      targetMultiplier: 0.8,
      lerpFactor: 0.055,
    },
    reveal: {
      progressNorm: 0.45,
      bgNorm: 0.6,
      bgSmoothStart: 0.1,
      bgSmoothEnd: 0.9,
    }
  },
  // Exact coordinate nodes from the source for background vector parallax layers
  squareAssets: [
    { x: 4.0, y: 3.0, parallax: 2.5 },
    { x: 3.5, y: 1.0, parallax: 1.2 },
    { x: 5.0, y: -1.0, parallax: -1.8 },
    { x: 4.0, y: -2.0, parallax: 3.0 },
    { x: -2.5, y: -1.0, parallax: -1.4 },
    { x: -3.5, y: -2.5, parallax: 2.8 },
    { x: -6.5, y: 0.0, parallax: -2.0 }
  ],
  // Exact micro-pixel coordinate matrix for the UI view toggle animation button
  buttonPixelMatrix: [
    { x: 10.0435, y: 3.04321, opacity: 1 }, { x: 11.5654, y: 1.52197, opacity: 1 },
    { x: 14.6089, y: 1.52197, opacity: 1 }, { x: 17.6523, y: 1.52197, opacity: 1 },
    { x: 13.0869, y: 3.04321, opacity: 1 }, { x: 16.1304, y: 3.04321, opacity: 1 },
    { x: 10.0435, y: 0, opacity: 1 },        { x: 13.0869, y: 0, opacity: 1 },
    { x: 16.1304, y: 0, opacity: 1 },        { x: 0, y: 3.04321, opacity: 1 },
    { x: 1.52197, y: 1.52197, opacity: 1 },  { x: 3.04346, y: 3.04321, opacity: 1 },
    { x: 0, y: 0, opacity: 1 },              { x: 3.04346, y: 0, opacity: 1 },
    { x: 19.1738, y: 3.04321, opacity: 1 },  { x: 20.6958, y: 1.52197, opacity: 1 },
    { x: 23.7393, y: 1.52197, opacity: 1 },  { x: 26.7827, y: 1.52197, opacity: 1 },
    { x: 22.2173, y: 3.04321, opacity: 1 },  { x: 25.2607, y: 3.04321, opacity: 1 },
    { x: 19.1738, y: 0, opacity: 1 },        { x: 22.2173, y: 0, opacity: 1 },
    { x: 25.2607, y: 0, opacity: 1 }
  ]
};
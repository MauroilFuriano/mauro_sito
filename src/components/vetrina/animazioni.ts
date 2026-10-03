import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const conMovimento = (condizione: string) => `${condizione} and (prefers-reduced-motion: no-preference)`;

export { gsap, ScrollTrigger };

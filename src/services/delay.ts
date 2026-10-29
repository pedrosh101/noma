/** Simulaçãoda latência de rede enquanto os dados são mockados. */
export const wait = (ms = 450) => new Promise<void>((resolve) => setTimeout(resolve, ms));

import { Plugin } from 'obsidian';

/** Stage 0: lifecycle only. No product UI, commands or input interception. */
export default class CanvasMindmap extends Plugin {
  readonly implementationStage = 0;

  async onload(): Promise<void> {
    // Product behavior starts only after the corresponding design review.
  }
}

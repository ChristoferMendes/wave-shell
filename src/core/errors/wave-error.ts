export class WaveError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'WaveError';
    }
}
export class WaveProgressBar {
    readonly DEFAULT_CHAR: string = '=';
    readonly EMPTY_CHAR: string = ' ';

    progress: number = 0;
    max: number;
    step: number;
    char: string;

    constructor(max: number = 100, step: number = 1, char?: string) {
        this.max = max;
        this.step = step;
        this.char = char ?? this.DEFAULT_CHAR;
    }

    init() {
        this.progress = 0;
        this.render();
    }

    advance() {
        if (this.progress + this.step <= this.max) {
            this.progress += this.step;
        } else {
            this.progress = this.max;
        }

        this.render();
    }

    finish() {
        this.progress = this.max;
        this.render();
        process.stdout.write("\n");
    }

    private render() {
        const progress = this.char.repeat(this.progress);
        const empty = this.EMPTY_CHAR.repeat(this.max - this.progress);
        const percent = ((this.progress / this.max) * 100).toFixed(2) + '%';
        const rendered = `[${progress}${empty}] ${percent}`;

        process.stdout.clearLine(-1)
        process.stdout.cursorTo(0);
        process.stdout.write('\r' + rendered);
    }
}
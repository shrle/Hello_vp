
export default class KeybordState {

    private static self?: KeybordState = undefined;

    readonly keyState: boolean[];
    public static readonly keycode: { readonly [s: string]: number } = {
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        Number0: 48,
        Number1: 49,
        Number2: 50,
        Number3: 51,
        Number4: 52,
        Number5: 53,
        Number6: 54,
        Number7: 55,
        Number8: 56,
        Number9: 57,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
    };


    private constructor() {
        this.keyState = Array(256).fill(false);
        document.onkeydown = e => {
            this.keyState[e.keyCode] = true;
        };

        document.onkeyup = e => {
            this.keyState[e.keyCode] = false;
        };
    }

    public static getInstance(): KeybordState {
        if (!KeybordState.self) {
            KeybordState.self = new KeybordState();
        }
        return KeybordState.self;
    }
}
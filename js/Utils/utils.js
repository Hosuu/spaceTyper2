import words from '../Engine/Constants/words.js';
export function styledNumber(text) {
    const parts = String(text)
        .split('')
        .reverse()
        .join('')
        .match(/.{1,3}/g);
    return parts
        .reverse()
        .map((part) => part.split('').reverse().join(''))
        .join(',');
}
export function randomWord() {
    const amount = words.length - 1;
    return words[Math.floor(Math.random() * amount)];
}
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function millisToMinutesAndSeconds(time) {
    const s = Math.floor(time / 1000) % 60;
    const min = Math.floor(time / 60000);
    return `${('00' + min).substr(-2)}:${('00' + s).substr(-2)}`;
}
export function checkCollision(a, b, padding) {
    const x = a.left - padding < b.right + padding && a.right + padding > b.left - padding;
    const y = a.top - padding < b.bottom + padding && a.bottom + padding > b.top - padding;
    return x && y;
}
//# sourceMappingURL=utils.js.map
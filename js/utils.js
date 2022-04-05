import words from './Engine/Constants/words.js';
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
//# sourceMappingURL=utils.js.map
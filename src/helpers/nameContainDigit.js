export default function containsDigit(text) {
    const digitRegex = /\d/;
    return digitRegex.test(text);
};
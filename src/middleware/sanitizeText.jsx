export function sanitizeText(input) {
    const temp = document.createElement("div");
    temp.textContent = input;
    return temp.innerHTML;
}

const cleanText = (text) => text.replace(/\uFFFD/g, " "); // Bersihkan karakter tidak dikenal

export default cleanText;

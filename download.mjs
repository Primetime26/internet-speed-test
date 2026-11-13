
const url = process.argv[2];

if (!url) {
    console.error("Ошибка: необходимо указать URL");
    console.error("Пример: node download.mjs https://example.com");
    process.exit(1);
}

try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:") {
        throw new Error("Разрешены только HTTP и HTTPS");
    }

} catch (error) {
    console.error("Некорректный URL:", error.message);
    process.exit(1);
}



let totalTime = 0;
let totalBytes = 0;


try {
    for (let i = 1; i <= 10; i++) {
        const start = performance.now();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const data = await response.arrayBuffer();

        const end = performance.now();
        const duration = end - start;

        totalTime += duration;
        totalBytes += data.byteLength;

        console.log(
            `Запрос ${i}: ${duration.toFixed(2)} мс`
        );
    }
} catch (error) {
    console.error("Ошибка при скачивании:", error.message);
    process.exit(1);
}


const averageTime = totalTime / 10;

const totalSeconds = totalTime / 1000;

const speedBytes = totalBytes / totalSeconds;

const speedMB = speedBytes / 1000000;

const speedMbps = speedMB * 8;


console.log("------------------------");
console.log("Среднее время:", averageTime.toFixed(2), "мс");
console.log("Всего скачано:", totalBytes, "байт");

console.log("Скорость:", speedMB.toFixed(4), "МБ/с");
console.log("Скорость:", speedMbps.toFixed(4), "Мбит/с");

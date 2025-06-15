// main.js
import { NearestScanner, Cube } from "https://unpkg.com/@toio/sdk?module";

document.getElementById("connect").addEventListener("click", async () => {
  try {
    const scanner = new NearestScanner();
    const cube = await scanner.start();

    alert("toio と接続成功！");

    // LEDを光らせる（赤）
    await cube.turnOnLight({ red: 255, green: 0, blue: 0 });

    // 2秒後に消灯
    setTimeout(() => cube.turnOffLight(), 2000);
  } catch (e) {
    console.error("接続エラー:", e);
    alert("接続失敗: " + e.message);
  }
});

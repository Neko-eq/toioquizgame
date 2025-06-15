console.log("main.js読み込み完了");

document.getElementById("connect").addEventListener("click", async () => {
  try {
    console.log("接続開始...");

   const device = await navigator.bluetooth.requestDevice({
  filters: [{ namePrefix: 'toio Core Cube' }],
  optionalServices: [] // UUID指定なしで全サービスを確認
});
const server = await device.gatt.connect();
const services = await server.getPrimaryServices();

for (const service of services) {
  console.log('Service UUID:', service.uuid);
}

    alert("toioと接続成功しました！");
    console.log("toioと接続できました！");
    
    // 必要ならここでLEDや振動制御を追加

  } catch (error) {
    console.error("接続エラー:", error);
    alert("toioとの接続に失敗しました: " + error.message);
  }
});

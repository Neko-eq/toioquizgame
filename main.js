console.log("main.js読み込み完了");

document.getElementById("connect").addEventListener("click", async () => {
  try {
    console.log("接続開始...");

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'toio Core Cube' }],
      optionalServices: ['000010b0-0000-1000-8000-00805f9b34fb']  // ← UUIDは128bit形式で指定
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('000010b0-0000-1000-8000-00805f9b34fb');

    alert("toioと接続成功しました！");
    console.log("toioと接続できました！");
    
    // 必要ならここでLEDや振動制御を追加

  } catch (error) {
    console.error("接続エラー:", error);
    alert("toioとの接続に失敗しました: " + error.message);
  }
});

console.log("main.js読み込み完了");

document.getElementById("connect").addEventListener("click", async () => {
  try {
    console.log("接続開始...");

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'toio Core Cube' }],
      optionalServices: ['000010b0-0000-1000-8000-00805f9b34fb']
    });

    const server = await device.gatt.connect();
    await new Promise(resolve => setTimeout(resolve, 500)); // 少し待機

    const services = await server.getPrimaryServices();

    if (services.length === 0) {
      throw new Error("サービスが見つかりませんでした");
    }

    console.log("取得したサービス一覧:");
    for (const service of services) {
      console.log(`Service UUID: ${service.uuid}`);
    }

    alert("toioと接続成功しました！");
    console.log("toioと接続できました！");

  } catch (error) {
    console.error("接続エラー:", error);
    alert("toioとの接続に失敗しました: " + error.message);
  }
});

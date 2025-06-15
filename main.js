console.log("main.js読み込み完了");

document.getElementById("connect").addEventListener("click", async () => {
  try {
    console.log("接続開始...");

    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true, // namePrefixは一旦使わない
      optionalServices: []    // 全サービスを許可
    });

    const server = await device.gatt.connect();
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機

    const services = await server.getPrimaryServices();

    console.log("取得したサービス一覧:");
    for (const service of services) {
      console.log(`Service UUID: ${service.uuid}`);
    }

    alert("接続成功！サービスUUIDをコンソールで確認してください");

  } catch (error) {
    console.error("接続エラー:", error);
    alert("接続失敗: " + error.message);
  }
});

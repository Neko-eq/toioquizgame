console.log("main.js読み込み完了");

document.getElementById("connect").addEventListener("click", async () => {
  try {
    console.log("接続開始...");

    const device = await navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: ['0000fd6f-0000-1000-8000-00805f9b34fb']
});


    const server = await device.gatt.connect();
    await new Promise(resolve => setTimeout(resolve, 1000)); // 少し待つ

    const services = await server.getPrimaryServices();

    if (services.length === 0) {
      throw new Error("サービスが取得できませんでした");
    }

    console.log("取得したサービス一覧:");
    for (const service of services) {
      console.log(`Service UUID: ${service.uuid}`);
    }

    alert("接続成功！toio制御サービスが表示されているか確認してください");

  } catch (error) {
    console.error("接続エラー:", error);
    alert("接続失敗: " + error.message);
  }
});

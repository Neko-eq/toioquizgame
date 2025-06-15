// main.js

let cube = null;

document.getElementById("connect").addEventListener("click", async () => {
  try {
    // Bluetoothデバイス検索
    const device = await navigator.bluetooth.requestDevice({
  filters: [{ namePrefix: 'toio Core Cube' }],
  optionalServices: ['000010b0-0000-1000-8000-00805f9b34fb']
});

const server = await device.gatt.connect();
const service = await server.getPrimaryService('000010b0-0000-1000-8000-00805f9b34fb');


    // Motor制御用キャラクタリスティック取得
    const motorChar = await service.getCharacteristic(0x02);

    // LED制御用キャラクタリスティック取得
    const lightChar = await service.getCharacteristic(0x03);

    // 接続成功アラート
    alert("toioに接続しました！");

    // LEDを緑に1秒点灯（確認用）
    const ledData = new Uint8Array([3, 1, 0, 255, 0, 0, 10]); // mode=3, duration=1, RGB(0,255,0), id=10
    await lightChar.writeValue(ledData);

    // 軽く振動（確認用）
    const motorData = new Uint8Array([
      1, // motor control by target speed
      1, 30, // left: mode 1, speed 30
      1, 30, // right: mode 1, speed 30
      50 // duration ms
    ]);
    await motorChar.writeValue(motorData);

    // 情報を保持
    cube = { device, server, service, motorChar, lightChar };

  } catch (error) {
    console.error("接続エラー:", error);
    alert("toioとの接続に失敗しました");
  }
  
});

let virtualX = 180;
let virtualY = 180;

const toioElem = document.getElementById("toio");
const connectBtn = document.getElementById("connect");

function updateToioIcon() {
  toioElem.style.left = virtualX + "px";
  toioElem.style.top = virtualY + "px";
}

connectBtn.addEventListener("click", async () => {
  const cube = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "toio Core Cube" }],
    optionalServices: [0x10b0]
  });

  const server = await cube.gatt.connect();
  const service = await server.getPrimaryService(0x10b0);
  const charButton = await service.getCharacteristic(0x10b1);

  await charButton.startNotifications();
  charButton.addEventListener("characteristicvaluechanged", (event) => {
    const value = event.target.value;
    const buttonPressed = value.getUint8(0);

    if (buttonPressed === 1) {
      // ボタンが押されたら仮想toioを上に10px動かす
      virtualY -= 10;
      if (virtualY < 0) virtualY = 0;
      updateToioIcon();
    }
  });

  alert("toioに接続しました。ボタンを押すと動きます！");
});

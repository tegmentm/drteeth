

// Lang Switcher START
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("langSwitch");
  if (!toggle) return;

  const getPath = () => window.location.pathname.replace(/\/+$/, "") || "/"; // son slash temiz
  let currentPath = getPath();
  const query = window.location.search || "";
  const hash = window.location.hash || "";

  // toggle pozisyonunu set et (EN dizini mi?)
  if (currentPath.startsWith("/EN") || currentPath === "/EN") {
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }

  // click/change handler
  toggle.addEventListener("change", function () {
    currentPath = getPath();

    let targetPath = null;

    // 1) mapping içinde birebir eşleşme var mı?
    if (langMap[currentPath]) {
      targetPath = langMap[currentPath];
    } else {
      // 2) eğer EN dizinli değilse ve EN'ye basıldıysa -> /EN + currentPath
      if (this.checked) {
        // TR -> EN
        // özel durum: root ("/") -> "/EN/"
        if (currentPath === "/") targetPath = "/EN/";
        else targetPath = "/EN" + (currentPath === "/" ? "" : currentPath);
      } else {
        // EN -> TR dönüş
        if (currentPath.startsWith("/EN")) {
          targetPath = currentPath.replace(/^\/EN/, "") || "/";
        }
      }
    }

    // fallback (sağlam olsun)
    if (!targetPath) targetPath = this.checked ? "/EN/" : "/";

    // query ve hash koruması (isteğe bağlı)
    const finalUrl = targetPath + query + hash;
    window.location.href = finalUrl;
  });
});
// Lang Switcher END
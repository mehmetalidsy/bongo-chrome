document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-cat');

    // Kayıtlı durumu yükle
    chrome.storage.sync.get('enabled', (data) => {
        toggle.checked = data.enabled !== false;
    });

    // Durum değişince kaydet ve haber ver
    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.sync.set({ enabled: isEnabled });

        // Mevcut sayfadaki kediye "gizlen/göster" emri gönder
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggle", state: isEnabled });
        });
    });
});
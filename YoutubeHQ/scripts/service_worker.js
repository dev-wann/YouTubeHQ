let isExtensionOn = true;

// Listen for when extension on/off
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message === 'ythq_on') {
        isExtensionOn = true;
        (async () => {
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            chrome.tabs.sendMessage(tab.id, 'ythq_on');
        })();
    } else if (message === 'ythq_off') {
        isExtensionOn = false;
    } else if (message === 'is_ythq_on') {
        sendResponse(`ythq_${isExtensionOn ? 'on' : 'off'}`);
        return true;
    }
});

// Listen for when a Tab changes state
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo && changeInfo.status == "complete"){
        chrome.tabs.sendMessage(tabId, `ythq_${isExtensionOn ? 'on' : 'off'}`);
    }
});
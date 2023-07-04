// on URL change
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (
        message === 'ythq_on'
        && window.location.href.includes('youtube.com/watch?')
    ) {
        setTimeout(() => { selectHQ(0, 0) }, 200);
    // } else if (message === 'ythq_off') {
    //     console.log('Youtube HQ is off')
    }
});
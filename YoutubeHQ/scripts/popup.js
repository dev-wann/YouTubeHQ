const toggleSwitch = document.getElementById('ythq_switch');

// initial on/off setting
(async () => {
    const response = await chrome.runtime.sendMessage('is_ythq_on');
    if (response === 'ythq_on') {
        toggleSwitch.checked = true;
    } else {
        toggleSwitch.checked = false;
    }
})();

// control on/off when toggled
toggleSwitch.addEventListener('change', () => {
    // send message
    if (toggleSwitch.checked) {
        chrome.runtime.sendMessage('ythq_on');
    } else {
        chrome.runtime.sendMessage('ythq_off');
    }
});
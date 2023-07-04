// mode 0: find settings button and click
// mode 1: find Quality menu from settings and click
// mode 2: find highest quality and click
function selectHQ(mode, count) {
    // constraint of the recursive function
    if (count >= 20) {
        // console.log(`Failed to find ${mode === 0 ? 'settings' : mode === 1 ? 'quality menu' : 'highest quality'}`);
        return;
    }
    const target = mode === 0
        ? document.getElementsByClassName('ytp-settings-button')[0]
        : mode === 1
            ? document.getElementById('ytp-id-18')?.lastChild?.lastChild?.lastChild
            : document.getElementById('ytp-id-18')?.firstChild?.firstChild?.nextSibling?.firstChild;
    if (validateTarget(mode, target)) {
        // found
        target.click();
        if (mode !== 2) setTimeout(() => {selectHQ(mode + 1, 0)}, 200);
        // else console.log('Success');
    } else  {
        // cannot find (maybe loading the HTML data)
        setTimeout(() => {selectHQ(mode, count + 1)}, 100);
    }
}

function validateTarget(mode, target) {
    if (target == null) return false;
    if (mode === 1) {
        //debug for the case when quality menu is already selected (Don't know the exact reason)
        let box = document.getElementById('ytp-id-18')?.firstChild?.firstChild?.firstChild?.nextSibling
        let text = box?.textContent;
        if (text === '화질' || text === 'Quality') {
            box.click();
            return false;
        }

        // debug for the case when the last child of setting menu is not quality (loading HTML)
        box = target.firstChild?.nextSibling;
        text = box?.textContent;
        if (text !== "화질" && text !== "Quality") return false;
    }
    return true;
}
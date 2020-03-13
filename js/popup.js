document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('invertButton').addEventListener('click', onclick, false)
    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            if (!document.getElementById('mainTextarea').value) {
                chrome.tabs.sendMessage(tabs[0].id, 'Выделенный текст изменен!')
            }
            else {
                chrome.tabs.sendMessage(tabs[0].id, document.getElementById('mainTextarea').value);
                chrome.runtime.onMessage.addListener(
                    function(request) {
                        document.getElementById('mainTextarea').value = request
                    }
                )
            }
        });
        document.getElementById('popupArrows').classList.add('rotate-js')
    };
    document.getElementById('copyButton').addEventListener('click', function() {
        document.getElementById('popup').classList.toggle('opened-js')
    });
}, false)
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('invertButton').addEventListener('click', onclick, false)
    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {

            // Пользователь запускает скрипт в контексте открытой страницы, если поле в попапе пустое  
            if (!document.getElementById('mainTextarea').value) {
                chrome.tabs.sendMessage(tabs[0].id, 'Выделенный текст изменен!')
            }

            // Пользователь запускает скрипт в контексте попапа
            else {
                chrome.tabs.sendMessage(tabs[0].id, document.getElementById('mainTextarea').value);
                chrome.runtime.onMessage.addListener(
                    function(request) {
                        document.getElementById('mainTextarea').value = request
                    }
                )
            }
        });
        var popupArrows = document.getElementById('popupArrows');
        popupArrows.classList.add('rotate-js');
        setTimeout (function() {
            popupArrows.classList.remove('rotate-js');
        }, 1000);
    };
    document.getElementById('copyButton').addEventListener('click', function() {
        document.getElementById('popup').classList.toggle('opened-js');
        document.getElementById('mainTextarea').value = '';
    });
}, false)
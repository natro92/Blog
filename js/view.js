let cards = '';
let backToTopBtn = '';
// 等待页面加载完成
window.addEventListener('load', () => {
    /*
    * 渲染点东西
     */

    /*
    * 主页卡牌进入进出动画
    */
    // 主页卡牌进入进出动画
    cards = document.querySelectorAll("#index-post-show")
    checkCardVisibility();

    // * 返回顶部按钮和监听
    backToTopBtn = document.querySelector('.backToTopBtn');
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /*
    * 修改代码块内容 添加行号 修改代码块样式 添加语言标签 添加复制按钮
    */
    Array.from(document.querySelectorAll("article pre[class^='language-']")).forEach(function (preBlock) {
        //添加行号
        preBlock.classList.add("mockup-code")
        let index = 1;
        // preBlock.innerHTML = "<pre data-prefix=\"" + index.toString() + "\">" + preBlock.innerHTML.replace(/\n/g, function (match) {
        //     var replacement = "\n</pre><pre data-prefix=\"" + (index + 1) + "\">";
        //     index++;
        //     return replacement;
        // }) + "\n</pre>";
        const newInnerHTML = "<pre data-prefix=\"" + index.toString() + "\">" + preBlock.innerHTML.replace(/\n/g, function (match) {
            var replacement = "\n</pre><pre data-prefix=\"" + (index + 1) + "\">";
            index++;
            return replacement;
        }) + "\n</pre>";
        const newDiv = document.createElement("div");
        newDiv.classList.add("code-block");
        newDiv.innerHTML = newInnerHTML;
        let article = preBlock.parentNode;
        preBlock.innerHTML = "";
        preBlock.appendChild(newDiv);

        // 外部控件
        let codeBlockContainer = document.createElement("div");
        codeBlockContainer.classList.add("code-block-container");
        preBlock.insertBefore(codeBlockContainer, preBlock.firstChild);
        //添加复制按钮
        let copyButton = document.createElement("button");
        copyButton.classList.add("copy-button");
        copyButton.innerText = 'Copy';
        codeBlockContainer.appendChild(copyButton);
        //添加语言标签
        let lang = preBlock.className.split(" ")[0];
        lang = lang.replace("language-", "");
        let langLabel = document.createElement("div");
        langLabel.classList.add("language-label");
        langLabel.innerText = lang;
        codeBlockContainer.appendChild(langLabel);
        //优化滑动条位置

    });

    /*
    * 获取wakatime数据
     */
    // 判断是否是about页面
    if (window.location.pathname === '/about/') {
        if (!document.querySelector('.wakatime')) return;
        let wakatimeItem = document.querySelector('.wakatime .wakatime-item');
        // 显示加载符号
        $.ajax({
            type: 'GET',
            url: 'https://wakatime.com/share/@018cf36f-a636-4c5c-bbb2-16631abf4f94/c2fdcd91-d7b3-4745-a732-64289e48384e.json',
            dataType: 'jsonp',
            success: function (response) {
                if (response.data.length === 0) return;
                // 为元素赋值
                let wakatimeLanguageName = document.querySelectorAll('.wakatime-block-language-name');
                let wakatimeLanguagePercent = document.querySelectorAll('.wakatime-block-language-percentage');
                let wakatimeLanguageTime = document.querySelectorAll('.wakatime-block-language-time');
                let wakatimeLanguageBar = document.querySelectorAll('.wakatime-block-language-progress');
                for (let i = 0; i < response.data.length && i <= 4; i++) {
                    if (wakatimeLanguageName[i]) {
                        wakatimeLanguageName[i].innerText = response.data[i].name;
                    }
                    if (wakatimeLanguagePercent[i]) {
                        wakatimeLanguagePercent[i].innerText = response.data[i].percent + " %";
                    }
                    if (wakatimeLanguageTime[i]) {
                        let time = '';
                        if (response.data[i].hours !== 0) {
                            console.log(response.data[i].hours);
                            time += response.data[i].hours;
                            time += ' hrs ';
                        }
                        time += response.data[i].minutes;
                        time += ' mins';
                        wakatimeLanguageTime[i].innerText = time;
                    }
                    if (wakatimeLanguageBar[i]) {
                        wakatimeLanguageBar[i].value = response.data[i].percent;
                    }
                }
                // 隐藏加载符号
                hideWakaTimeLoadingSpinner();
            },
            error: function (xhr, status, error) {
                console.log('请求失败:', error);
                // 隐藏加载符号
                hideWakaTimeLoadingSpinner();
            }
        });

    }

});

// 获取wakatime数据
function fetchWakaTimeData() {
    if (window.location.pathname !== '/about/') return;

    const wakatimeBlock = document.querySelector('.wakatime');
    if (!wakatimeBlock) return;

    const wakatimeUrl = 'https://wakatime.com/share/@018cf36f-a636-4c5c-bbb2-16631abf4f94/c2fdcd91-d7b3-4745-a732-64289e48384e.json';

    const wakatimeLanguageName = document.querySelectorAll('.wakatime-block-language-name');
    const wakatimeLanguagePercent = document.querySelectorAll('.wakatime-block-language-percentage');
    const wakatimeLanguageTime = document.querySelectorAll('.wakatime-block-language-time');
    const wakatimeLanguageBar = document.querySelectorAll('.wakatime-block-language-progress');

    // 显示加载符号
    $.ajax({
        type: 'GET',
        url: wakatimeUrl,
        dataType: 'jsonp',
        success: function (response) {
            if (response.data.length === 0) return;

            for (let i = 0; i < response.data.length && i <= 4; i++) {
                if (wakatimeLanguageName[i]) {
                    wakatimeLanguageName[i].innerText = response.data[i].name;
                }
                if (wakatimeLanguagePercent[i]) {
                    wakatimeLanguagePercent[i].innerText = response.data[i].percent + " %";
                }
                if (wakatimeLanguageTime[i]) {
                    let time = '';
                    if (response.data[i].hours !== 0) {
                        time += response.data[i].hours + ' hrs ';
                    }
                    time += response.data[i].minutes + ' mins';
                    wakatimeLanguageTime[i].innerText = time;
                }
                if (wakatimeLanguageBar[i]) {
                    wakatimeLanguageBar[i].value = response.data[i].percent;
                }
            }

            // 隐藏加载符号
            hideWakaTimeLoadingSpinner();
        },
        error: function (xhr, status, error) {
            console.log('请求失败:', error);
            // 隐藏加载符号
            hideWakaTimeLoadingSpinner();
        }
    });
}

function checkCardVisibility() {
    const triggerBottom = window.innerHeight * 4 / 5;
    // 添加cards是否存在
    if (!cards) return;
    // 如果是手机端访问
    // if (window.innerWidth < 1768) {
    //     cards.forEach(card => {
    //         card.classList.add('show');
    //     });
    //     return;
    // }

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.classList.add('show');
        } else {
            card.classList.remove('show');
        }
    });
}

// 滑动条监听
window.addEventListener('scroll', () => {
    // 显示卡片
    checkCardVisibility();
    // 返回顶部按钮
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// 代码块复制按钮监听
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('copy-button')) {
        let codeBlock = e.target.parentNode.parentNode;
        let code = codeBlock.innerText;
        // 删除前两行
        let lines = code.split('\n');
        let result = lines.slice(2).join('\n').replaceAll("\n\n", "\n");
        let textArea = document.createElement("textarea");
        textArea.value = result;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        e.target.innerText = "Copied!";
        setTimeout(function () {
            e.target.innerText = "Copy";
        }, 2000);
    }
});



// 隐藏wakatime加载符号 并显示内容
function hideWakaTimeLoadingSpinner() {
    let loadingSpinner = document.querySelector(".wakatimeLoading");
    loadingSpinner.remove();
    let wakatimeItem = document.querySelectorAll('.wakatime-items');
    console.log(wakatimeItem);
    for (let i = 0; i < wakatimeItem.length; i++) {
        wakatimeItem[i].classList.remove("invisible");
    }
}



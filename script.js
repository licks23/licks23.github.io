// H5互动广告脚本

// 页面元素
const pages = document.querySelectorAll('.page');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const dots = document.querySelectorAll('.dot');
const options = document.querySelectorAll('.option');

let currentPage = 0;

// 初始化
function init() {
    // 添加按钮事件监听
    nextBtns.forEach(btn => {
        btn.addEventListener('click', goToNextPage);
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', goToPrevPage);
    });
    
    // 添加页码指示器事件监听
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToPage(index));
    });
    
    // 添加选项点击事件
    options.forEach(option => {
        option.addEventListener('click', toggleOption);
    });
    
    // 添加滑动手势支持
    addSwipeSupport();
}

// 切换到下一页
function goToNextPage() {
    if (currentPage < pages.length - 1) {
        goToPage(currentPage + 1);
    }
}

// 切换到上一页
function goToPrevPage() {
    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }
}

// 切换到指定页面
function goToPage(pageIndex) {
    // 移除当前页面的active类
    pages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');
    
    // 更新当前页码
    currentPage = pageIndex;
    
    // 添加新页面的active类
    pages[currentPage].classList.add('active');
    dots[currentPage].classList.add('active');
    
    // 特殊处理第7页的返回首页按钮
    if (currentPage === 6) {
        const prevBtn = pages[currentPage].querySelector('.prev-btn');
        prevBtn.addEventListener('click', () => goToPage(0));
    }
}

// 切换选项选择状态
function toggleOption(e) {
    // 移除所有选项的selected类
    options.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 为当前点击的选项添加selected类
    e.target.classList.add('selected');
    
    // 获取选择的值
    const selectedValue = e.target.dataset.value;
    const selectedText = e.target.textContent;
    
    // 显示结果
    showResult(selectedValue, selectedText);
    
    // 记录用户选择
    console.log('用户选择了：', selectedText);
}

// 显示选择结果
function showResult(value, text) {
    const resultDiv = document.getElementById('result');
    let resultText = '';
    
    // 根据选择显示不同的结果分析
    switch(value) {
        case 'creative':
            resultText = `"${text}"是当前工业遗产改造的热门方向！它能有效结合文化创意产业，创造就业机会，提升城市文化品位，具有良好的市场前景和社会影响力。`;
            break;
        case 'museum':
            resultText = `"${text}"有助于保护工业文化遗产，传承工业精神，同时可以发展文化旅游，吸引游客，促进地方经济发展。`;
            break;
        case 'commercial':
            resultText = `"${text}"可以充分利用工业遗产的空间资源，引入商业业态，提升区域活力，实现经济效益与文化保护的双赢。`;
            break;
        case 'ecological':
            resultText = `"${text}"符合可持续发展理念，将工业遗址改造为绿色空间，改善城市生态环境，提升居民生活质量。`;
            break;
        default:
            resultText = `感谢你的参与！"${text}"是一个不错的选择。`;
    }
    
    // 更新结果内容并显示
    resultDiv.textContent = resultText;
    resultDiv.classList.add('show');
}

// 添加滑动手势支持
function addSwipeSupport() {
    let startX, startY;
    let container = document.querySelector('.container');
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    container.addEventListener('touchend', (e) => {
        if (!startX || !startY) {
            return;
        }
        
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        
        let diffX = startX - endX;
        let diffY = startY - endY;
        
        // 判断滑动方向，水平滑动幅度大于垂直滑动幅度时才切换页面
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                // 向左滑动，下一页
                goToNextPage();
            } else if (diffX < -50) {
                // 向右滑动，上一页
                goToPrevPage();
            }
        }
        
        // 重置起始坐标
        startX = null;
        startY = null;
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 工业遗产分类信息
const heritageInfo = {
    building: {
        title: '建筑物类',
        content: '鞍山钢铁厂房是典型的工业建筑物遗产，见证了新中国钢铁工业的发展历程。这些厂房不仅具有历史价值，还展现了特定时期的建筑技术和美学风格。'
    },
    machine: {
        title: '机械设施类',
        content: '沈阳机床厂1953年生产的第一台普通车床，现藏于中国工业博物馆。这台机床标志着中国机床工业的起步，具有重要的技术价值和历史意义。'
    },
    site: {
        title: '场地类',
        content: '抚顺西露天矿是亚洲规模最大的露天煤矿，开采历史超百年。矿坑最大深度400米，展现了人类工业活动对自然环境的改造，具有重要的科研价值。'
    },
    transport: {
        title: '交通设施类',
        content: '老工业铁路轨道是工业遗产的重要组成部分，它们曾是连接各个工业设施的生命线，见证了工业物流的发展变迁。'
    }
};

// 显示工业遗产分类信息
function showHeritageInfo(type) {
    const popup = document.getElementById('knowledgePopup');
    const title = document.getElementById('popupTitle');
    const body = document.getElementById('popupBody');
    
    if (heritageInfo[type]) {
        title.textContent = heritageInfo[type].title;
        body.innerHTML = `<p>${heritageInfo[type].content}</p>`;
    } else {
        title.textContent = '小知识';
        body.innerHTML = '<p>点击分类卡片查看详细信息</p>';
    }
    
    popup.classList.add('active');
}

// 关闭工业遗产分类信息
function closeHeritageInfo() {
    const popup = document.getElementById('knowledgePopup');
    popup.classList.remove('active');
}

// 切换历史故事卡片显示状态
function toggleStory(card) {
    card.classList.toggle('active');
}

// 显示城市工业遗产故事
function showHeritageStory(city) {
    // 根据城市名称滚动到对应的工业遗产项目
    const heritageItems = document.querySelectorAll('.heritage-item h5');
    let targetItem = null;
    
    heritageItems.forEach(item => {
        if (item.textContent.includes(city === 'anshan' ? '鞍山' : 
                                     city === 'shenyang' ? '沈阳' : 
                                     city === 'dalian' ? '大连' : '抚顺')) {
            targetItem = item.closest('.heritage-item');
        }
    });
    
    if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 高亮显示目标项目
        targetItem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        setTimeout(() => {
            targetItem.style.backgroundColor = '';
        }, 2000);
    }
}

// 价值转盘结果数据
const wheelResults = {
    '社会价值': '沈阳红梅文创园改造后，周边社区就业率提升15%，成为居民周末休闲的"家门口公园"。',
    '经济价值': '鞍山钢铁工业旅游区年接待游客超30万人次，带动周边餐饮、住宿消费超5000万元。',
    '生态价值': '抚顺西露天矿通过覆土绿化、水体修复，已种植乔木1.2万棵，成为"城市绿肺"，PM2.5浓度较改造前下降20%。',
    '历史价值': '沈阳机床厂老车间改造为工业博物馆，收藏了从1953年至今的各类机床设备，成为青少年工业历史教育基地。'
};

// 旋转价值转盘
function spinWheel() {
    const wheel = document.querySelector('.value-wheel');
    const resultDiv = document.getElementById('wheelResult');
    
    // 添加旋转动画
    wheel.classList.add('spinning');
    
    // 随机选择一个结果
    const values = Object.keys(wheelResults);
    const randomValue = values[Math.floor(Math.random() * values.length)];
    
    // 3秒后显示结果
    setTimeout(() => {
        wheel.classList.remove('spinning');
        resultDiv.innerHTML = `<p><strong>${randomValue}：</strong>${wheelResults[randomValue]}</p>`;
    }, 3000);
}

// 投票功能
let selectedOption = null;

// 初始化投票选项事件监听
document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.voting-options .option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // 移除所有选项的selected类
            options.forEach(opt => opt.classList.remove('selected'));
            // 为当前点击的选项添加selected类
            option.classList.add('selected');
            // 记录选中的选项
            selectedOption = option.dataset.value;
        });
    });
});

// 提交投票
function submitVote() {
    const reasonInput = document.getElementById('reasonInput');
    const imageUpload = document.getElementById('imageUpload');
    
    if (!selectedOption) {
        alert('请先选择一个改造方式！');
        return;
    }
    
    if (!reasonInput.value.trim()) {
        alert('请输入投票理由！');
        return;
    }
    
    // 模拟提交投票
    alert('投票成功！感谢您的参与！');
    
    // 重置表单
    reasonInput.value = '';
    imageUpload.value = '';
    selectedOption = null;
    document.querySelectorAll('.voting-options .option').forEach(opt => opt.classList.remove('selected'));
}

// 生成海报
function generatePoster() {
    alert('海报生成功能开发中，敬请期待！');
    // 实际项目中，这里可以调用Canvas API生成海报
}

// 音频控制
let isAudioPlaying = true;

function toggleAudio() {
    const audioBtn = document.querySelector('.audio-btn');
    isAudioPlaying = !isAudioPlaying;
    audioBtn.textContent = isAudioPlaying ? '🔊' : '🔇';
    // 实际项目中，这里可以控制背景音乐的播放/暂停
    alert(isAudioPlaying ? '背景音乐已开启' : '背景音乐已关闭');
}

// 打开工业遗产打卡地图
function openMap() {
    alert('工业遗产打卡地图功能开发中，敬请期待！');
    // 实际项目中，这里可以跳转到地图页面或打开地图应用
}

// 提交改造建议
function submitIdea() {
    alert('改造建议提交功能开发中，敬请期待！');
    // 实际项目中，这里可以打开表单页面或弹窗
}

// 分享H5
function shareH5() {
    alert('分享功能开发中，敬请期待！');
    // 实际项目中，这里可以调用分享API或生成分享链接
}

// 添加页面切换动画效果
function addPageTransition() {
    pages.forEach(page => {
        page.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity') {
                // 可以在这里添加额外的动画逻辑
            }
        });
    });
}

// 修改页面滚动监听，允许垂直滚动，只阻止水平滑动时的默认行为
window.addEventListener('touchmove', (e) => {
    // 不阻止垂直滚动，只处理水平滑动切换页面
}, { passive: true });

// 添加键盘导航支持（用于测试）
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        goToNextPage();
    } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
    }
});
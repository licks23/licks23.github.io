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

// 添加页面滚动监听，防止页面上下滚动
window.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// 添加键盘导航支持（用于测试）
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        goToNextPage();
    } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
    }
});
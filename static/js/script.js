function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function setCookie(name, value, days) {
    var expires = days ? "; expires=" + (new Date(Date.now() + days * 24 * 60 * 60 * 1000)).toUTCString() : "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const projectItemRightimg = document.querySelector('.projectItemRightimg');
    const buttons = document.querySelectorAll('.projectItem');
    
    // 只有在元素存在时才添加事件监听
    if (projectItemRightimg) {
        const firstImg = projectItemRightimg.firstElementChild;
        if (firstImg) {
            const clonedImg = firstImg.cloneNode(true);
            projectItemRightimg.appendChild(clonedImg);
        }

        projectItemRightimg.addEventListener('mousedown', handleMouseDown);
        projectItemRightimg.addEventListener('touchstart', handleTouchStart);
        projectItemRightimg.addEventListener('touchmove', handleTouchMove);
        
        // 开始自动滑动
        startAutoScroll();
    }

    // 为按钮添加事件监听
    if (buttons) {
        buttons.forEach(function(button) {
            button.addEventListener('mousedown', handlePress);
            button.addEventListener('mouseup', handleRelease);
            button.addEventListener('mouseleave', handleCancel);
            button.addEventListener('touchstart', handlePress);
            button.addEventListener('touchend', handleRelease);
            button.addEventListener('touchcancel', handleCancel);
        });
    }

    // 初始化主题
    const html = document.querySelector('html');
    const Checkbox = document.getElementById('myonoffswitch');
    if (html && Checkbox) {
        const themeState = getCookie("themeState") || "Light";
        
        function changeTheme(theme) {
            html.dataset.theme = theme;
            setCookie("themeState", theme, 365);
        }

        Checkbox.addEventListener('change', function() {
            changeTheme(Checkbox.checked ? "Dark" : "Light");
        });

        if (themeState === "Dark") {
            Checkbox.checked = true;
        }
        
        changeTheme(themeState);
    }

    // 初始化懒加载
    lazyLoad();

    // 分类导航系统
    const categoryContainers = document.querySelectorAll('.category-container');
    
    categoryContainers.forEach(container => {
        const subCategoryBtns = container.querySelectorAll('.sub-category-btn');
        const siteItems = container.querySelectorAll('.site-items');
        
        // 存储每个子分类的内容
        const contentMap = new Map();
        
        // 初始化内容映射
        subCategoryBtns.forEach((btn, index) => {
            const category = btn.textContent.trim();
            // 克隆第一组内容作为模板
            const template = siteItems[0].cloneNode(true);
            contentMap.set(category, template);
        });
        
        // 为每个子分类按钮添加点击事件
        subCategoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有按钮的active类
                subCategoryBtns.forEach(b => b.classList.remove('active'));
                // 给当前点击的按钮添加active类
                btn.classList.add('active');
                
                // 获取当前子分类名称
                const category = btn.textContent.trim();
                
                // 更新显示的内容
                const siteList = container.querySelector('.site-list');
                const currentSiteItems = siteList.querySelector('.site-items');
                
                // 根据子分类更新内容
                switch(category) {
                    case 'Web项目':
                        updateSiteItems(currentSiteItems, [
                            {title: '个人博客', desc: '基于Hexo的静态博客', icon: 'i16.png'},
                            {title: '在线相册', desc: 'Web图片管理系统', icon: 'i17.png'},
                            {title: '任务管理', desc: 'Web待办事项管理', icon: 'i31.png'},
                            {title: '文件分享', desc: 'Web文件共享平台', icon: 'i21.png'}
                        ]);
                        break;
                    case 'Vue项目':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Vue商城', desc: '电商网站项目', icon: 'i16.png'},
                            {title: '后台管理', desc: 'Vue管理系统', icon: 'i17.png'},
                            {title: '音乐播放器', desc: 'Vue音乐应用', icon: 'i31.png'},
                            {title: '社交应用', desc: 'Vue社交平台', icon: 'i21.png'}
                        ]);
                        break;
                    case 'boot项目':
                        updateSiteItems(currentSiteItems, [
                            {title: '博客系统', desc: 'SpringBoot博客', icon: 'i16.png'},
                            {title: '商城后端', desc: 'Boot电商接口', icon: 'i17.png'},
                            {title: '权限管理', desc: 'Boot权限系统', icon: 'i31.png'},
                            {title: '内容管理', desc: 'Boot CMS系统', icon: 'i21.png'}
                        ]);
                        break;
                    case '开发工具':
                        updateSiteItems(currentSiteItems, [
                            {title: 'VS Code', desc: '强大的代码编辑器', icon: 'i8.png'},
                            {title: 'JetBrains', desc: '专业IDE工具集', icon: 'i15.png'},
                            {title: 'Git', desc: '版本控制工具', icon: 'i37.png'},
                            {title: 'Postman', desc: 'API开发测试工具', icon: 'i14.png'}
                        ]);
                        break;
                    case '设计资源':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Figma', desc: 'UI设计工具', icon: 'i10.png'},
                            {title: 'Sketch', desc: '矢量设计工具', icon: 'i11.png'},
                            {title: 'IconFont', desc: '图标资源库', icon: 'i12.png'},
                            {title: 'Dribbble', desc: '设计灵感社区', icon: 'i13.png'}
                        ]);
                        break;
                    case '官方文档':
                        updateSiteItems(currentSiteItems, [
                            {title: 'MDN', desc: 'Web开发文档', icon: 'i14.png'},
                            {title: 'Vue.js', desc: 'Vue官方文档', icon: 'i15.png'},
                            {title: 'React', desc: 'React官方文档', icon: 'i16.png'},
                            {title: 'Spring', desc: 'Spring官方文档', icon: 'i17.png'}
                        ]);
                        break;
                    case '在线课程平台':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Coursera', desc: '全球知名在线教育平台', icon: 'i1.png'},
                            {title: 'Udemy', desc: '实用技能学习平台', icon: 'i2.png'},
                            {title: 'edX', desc: '免费大学课程平台', icon: 'i3.png'},
                            {title: 'Codecademy', desc: '交互式编程学习', icon: 'i4.png'}
                        ]);
                        break;
                    case '学术文献资源':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Google Scholar', desc: '谷歌学术搜索', icon: 'i5.png'},
                            {title: 'SCI-Hub', desc: '文献下载平台', icon: 'i6.png'},
                            {title: 'CNKI', desc: '中国知网', icon: 'i7.png'},
                            {title: 'ResearchGate', desc: '学术社交网络', icon: 'i8.png'}
                        ]);
                        break;
                    case '语言学习工具':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Duolingo', desc: '趣味语言学习', icon: 'i9.png'},
                            {title: 'Memrise', desc: '记忆词汇工具', icon: 'i10.png'},
                            {title: 'Busuu', desc: '社交语言学习', icon: 'i11.png'},
                            {title: 'HelloTalk', desc: '语言交换平台', icon: 'i12.png'}
                        ]);
                        break;
                    case '知识社区':
                        updateSiteItems(currentSiteItems, [
                            {title: '知乎', desc: '中文问答社区', icon: 'i13.png'},
                            {title: 'Quora', desc: '国际问答平台', icon: 'i14.png'},
                            {title: 'Medium', desc: '优质博客平台', icon: 'i15.png'},
                            {title: 'Stack Exchange', desc: '专业知识社区', icon: 'i16.png'}
                        ]);
                        break;
                    case '游戏平台':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Steam', desc: '全球最大游戏平台', icon: 'i5.png'},
                            {title: 'Epic Games', desc: '免费游戏资源', icon: 'i6.png'},
                            {title: 'GOG', desc: '怀旧游戏平台', icon: 'i7.png'},
                            {title: 'Unity', desc: '游戏开发引擎', icon: 'i8.png'}
                        ]);
                        break;
                    case '攻略资源':
                        updateSiteItems(currentSiteItems, [
                            {title: 'IGN', desc: '游戏资讯攻略', icon: 'i9.png'},
                            {title: 'GameFAQs', desc: '游戏攻略库', icon: 'i10.png'},
                            {title: '游民星空', desc: '中文游戏资讯', icon: 'i11.png'},
                            {title: '3DM', desc: '游戏资源网站', icon: 'i12.png'}
                        ]);
                        break;
                    case '联机工具':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Discord', desc: '游戏语音聊天', icon: 'i13.png'},
                            {title: 'Parsec', desc: '远程游戏工具', icon: 'i14.png'},
                            {title: 'Hamachi', desc: '虚拟局域网', icon: 'i15.png'},
                            {title: 'TeamSpeak', desc: '团队语音工具', icon: 'i16.png'}
                        ]);
                        break;
                    case '游戏开发':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Unity', desc: '游戏开发引擎', icon: 'i17.png'},
                            {title: 'Unreal', desc: '虚幻引擎', icon: 'i18.png'},
                            {title: 'Godot', desc: '开源游戏引擎', icon: 'i19.png'},
                            {title: 'GameMaker', desc: '2D游戏开发', icon: 'i20.png'}
                        ]);
                        break;
                    case '编程开发':
                        updateSiteItems(currentSiteItems, [
                            {title: 'GitHub', desc: '代码托管平台', icon: 'i9.png'},
                            {title: 'GitLab', desc: '自托管Git服务', icon: 'i10.png'},
                            {title: 'CodePen', desc: '前端代码分享', icon: 'i11.png'},
                            {title: 'Replit', desc: '在线编程平台', icon: 'i12.png'}
                        ]);
                        break;
                    case '设计协作':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Figma', desc: 'UI设计工具', icon: 'i10.png'},
                            {title: 'Adobe XD', desc: '界面设计工具', icon: 'i11.png'},
                            {title: 'Sketch', desc: 'Mac设计软件', icon: 'i12.png'},
                            {title: 'Zeplin', desc: '设计交付平台', icon: 'i13.png'}
                        ]);
                        break;
                    case '运维测试':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Docker', desc: '容器化平台', icon: 'i11.png'},
                            {title: 'Jenkins', desc: '持续集成工具', icon: 'i12.png'},
                            {title: 'Kubernetes', desc: '容器编排工具', icon: 'i13.png'},
                            {title: 'Selenium', desc: '自动化测试', icon: 'i14.png'}
                        ]);
                        break;
                    case '开发社区':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Stack Overflow', desc: '开发者问答社区', icon: 'i12.png'},
                            {title: 'GitHub', desc: '开源代码社区', icon: 'i9.png'},
                            {title: 'DEV', desc: '开发者博客', icon: 'i13.png'},
                            {title: 'V2EX', desc: '程序员社区', icon: 'i14.png'}
                        ]);
                        break;
                    case '视频平台':
                        updateSiteItems(currentSiteItems, [
                            {title: '哔哩哔哩', desc: '视频弹幕网站', icon: 'i13.png'},
                            {title: 'YouTube', desc: '全球视频平台', icon: 'i14.png'},
                            {title: '爱奇艺', desc: '在线视频网站', icon: 'i15.png'},
                            {title: '腾讯视频', desc: '视频streaming', icon: 'i16.png'}
                        ]);
                        break;
                    case '音乐播客':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Spotify', desc: '音乐流媒体服务', icon: 'i15.png'},
                            {title: '网易云音乐', desc: '音乐社交平台', icon: 'i16.png'},
                            {title: 'Apple Music', desc: '苹果音乐服务', icon: 'i17.png'},
                            {title: 'SoundCloud', desc: '音乐分享平台', icon: 'i18.png'}
                        ]);
                        break;
                    case '直播社区':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Twitch', desc: '直播平台', icon: 'i16.png'},
                            {title: '斗鱼', desc: '游戏直播平台', icon: 'i17.png'},
                            {title: '虎牙', desc: '直播互动平台', icon: 'i18.png'},
                            {title: 'TikTok', desc: '短视频平台', icon: 'i19.png'}
                        ]);
                        break;
                    case '动漫二次元':
                        updateSiteItems(currentSiteItems, [
                            {title: '番组计划', desc: '动漫更新时间表', icon: 'i17.png'},
                            {title: '萌娘百科', desc: '二次元百科', icon: 'i18.png'},
                            {title: 'AcFun', desc: 'A站', icon: 'i19.png'},
                            {title: 'pixiv', desc: '插画分享平台', icon: 'i20.png'}
                        ]);
                        break;
                    case '办公协作':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Notion', desc: '协作笔记工具', icon: 'i17.png'},
                            {title: 'Trello', desc: '项目管理工具', icon: 'i18.png'},
                            {title: 'Slack', desc: '团队沟通工具', icon: 'i19.png'},
                            {title: 'Asana', desc: '任务管理平台', icon: 'i20.png'}
                        ]);
                        break;
                    case '设计辅助':
                        updateSiteItems(currentSiteItems, [
                            {title: 'Canva', desc: '在线设计平台', icon: 'i18.png'},
                            {title: 'Photopea', desc: '在线图片编辑', icon: 'i19.png'},
                            {title: 'Remove.bg', desc: '在线抠图工具', icon: 'i20.png'},
                            {title: 'Coolors', desc: '配色方案生成', icon: 'i21.png'}
                        ]);
                        break;
                    case '生活工具':
                        updateSiteItems(currentSiteItems, [
                            {title: '印象笔记', desc: '笔记管理工具', icon: 'i19.png'},
                            {title: 'Todoist', desc: '待办事项管理', icon: 'i20.png'},
                            {title: 'Forest', desc: '专注时间管理', icon: 'i21.png'},
                            {title: 'IFTTT', desc: '自动化工具', icon: 'i22.png'}
                        ]);
                        break;
                    case '文件处理':
                        updateSiteItems(currentSiteItems, [
                            {title: 'XMind', desc: '思维导图工具', icon: 'i20.png'},
                            {title: 'PDF24', desc: 'PDF处理工具', icon: 'i21.png'},
                            {title: '幕布', desc: '大纲笔记工具', icon: 'i22.png'},
                            {title: '石墨文档', desc: '在线协作文档', icon: 'i23.png'}
                        ]);
                        break;
                    case 'RSS相关':
                        updateSiteItems(currentSiteItems, [
                            {title: 'RSS阅读器', desc: '聚合RSS阅读页面', icon: 'i38.png'},
                            {title: 'RSShub实例', desc: '基于fly.io部署的RSShub', icon: 'i39.png'},
                            {title: 'Feedly', desc: 'RSS阅读器', icon: 'i37.png'},
                            {title: 'Inoreader', desc: 'RSS订阅工具', icon: 'i36.png'}
                        ]);
                        break;
                    case '博客站点':
                        updateSiteItems(currentSiteItems, [
                            {title: '个人博客', desc: '技术分享与生活记录', icon: 'i37.png'},
                            {title: '技术专栏', desc: '编程技术文章', icon: 'i36.png'},
                            {title: '生活随笔', desc: '日常生活记录', icon: 'i35.png'},
                            {title: '学习笔记', desc: '知识积累分享', icon: 'i34.png'}
                        ]);
                        break;
                    case '其他工具':
                        updateSiteItems(currentSiteItems, [
                            {title: '工具集合', desc: '常用在线工具导航', icon: 'i14.png'},
                            {title: '资源导航', desc: '优质资源汇总', icon: 'i13.png'},
                            {title: '效率工具', desc: '提升工作效率', icon: 'i12.png'},
                            {title: '实用软件', desc: '常用软件推荐', icon: 'i11.png'}
                        ]);
                        break;
                }
            });
        });
    });

    // 获取微博热搜数据
    fetchWeiboHot();
    initWeiboHot();

    // 获取一言句子
    fetchHitokoto();
    initHitokoto();

    // 初始化摸鱼人日历
    initMoyuCalendar();

    // 初始化书摘图片
    initArtText();
});

// 更新网站项目列表的辅助函数
function updateSiteItems(container, items) {
    container.innerHTML = items.map(item => `
        <a class="site-item" href="https://" target="_blank">
            <div class="site-info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
            <div class="site-icon">
                <img src="./static/img/${item.icon}" alt="${item.title}">
            </div>
        </a>
    `).join('');
}

const projectItemRightimg = document.querySelector('.projectItemRightimg');
const img = document.getElementById('img-1');

let startX = 0;
let scrollLeft = 0;
let autoScrollInterval = null;
const autoScrollSpeed = 0.5; // 调整自动滑动的速度，值越小滑动越慢

function handleMouseDown(e) {
    e.preventDefault();
    startX = e.pageX - projectItemRightimg.offsetLeft;
    scrollLeft = projectItemRightimg.scrollLeft;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    stopAutoScroll(); // 当用户开始手动滑动时，停止自动滑动
}

function handleMouseMove(e) {
    const x = e.pageX - projectItemRightimg.offsetLeft;
    const walk = (x - startX) * 3; // 滑动速度
    projectItemRightimg.scrollLeft = scrollLeft - walk;
}

function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);
    startAutoScroll(); // 当用户停止手动滑动时，重新开始自动滑动
}

function handleTouchStart(e) {
    startX = e.touches[0].pageX - projectItemRightimg.offsetLeft;
    scrollLeft = projectItemRightimg.scrollLeft;
    stopAutoScroll(); // 当用户开始触摸滑动时，停止自动滑动
}

function handleTouchMove(e) {
    e.preventDefault();
    const x = e.touches[0].pageX - projectItemRightimg.offsetLeft;
    const walk = (x - startX) * 3; // 滑动速度
    projectItemRightimg.scrollLeft = scrollLeft - walk;
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        projectItemRightimg.scrollLeft += autoScrollSpeed;
        // 检查是否滚动到了克隆的图片区域，这里减去2是位移的缓冲
        if (projectItemRightimg.scrollLeft >= projectItemRightimg.scrollWidth - projectItemRightimg.clientWidth - 2) {
            // 如果滚动到了克隆的图片，立即返回到正确的位置
            projectItemRightimg.scrollLeft = 0;
        }
    }, 16); //大约每秒60帧
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// 懒加载功能
function lazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                self.unobserve(img);
            }
        });
    }, config);

    lazyImages.forEach(image => {
        observer.observe(image);
    });
}

// 图片弹出监听
function pop(imgPath) {
    document.getElementById('popupImage').src = imgPath;
    document.getElementById('imagePopup').style.display = 'block';
    document.getElementById('imagePopup').addEventListener('click', closePopup);
}

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.getElementById('imagePopup').removeEventListener('click', closePopup);
}

//手机左侧弹出
document.addEventListener('DOMContentLoaded', function() {
    var mobileNavButton = document.querySelector('.mobile-nav-button');
    var noiseLeft = document.querySelector('.noise-left');
    if (mobileNavButton && noiseLeft) {
        mobileNavButton.addEventListener('click', function() {
            if (noiseLeft.style.display === 'block') {
                noiseLeft.style.display = 'none';
            } else {
                noiseLeft.style.display = 'block';
            }
        });
    }
});

// 获取微博热搜数据
async function fetchWeiboHot() {
    try {
        const response = await fetch('https://api.vvhan.com/api/hotlist/wbHot');
        const data = await response.json();
        
        if (data.success && data.data) {
            const weiboList = document.getElementById('weiboHotList');
            weiboList.innerHTML = '';
            
            data.data.forEach((item, index) => {
                const listItem = document.createElement('div');
                listItem.className = 'weibo-item';
                
                const rank = document.createElement('span');
                rank.className = `weibo-rank ${index < 3 ? 'top-' + (index + 1) : ''}`;
                rank.textContent = index + 1;
                
                const title = document.createElement('a');
                title.className = 'weibo-title-text';
                title.href = item.url;
                title.target = '_blank';
                title.textContent = item.title;
                
                const hot = document.createElement('span');
                hot.className = 'weibo-hot-value';
                hot.textContent = formatHotValue(item.hot);
                
                listItem.appendChild(rank);
                listItem.appendChild(title);
                listItem.appendChild(hot);
                weiboList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('获取微博热搜失败:', error);
        const weiboList = document.getElementById('weiboHotList');
        weiboList.innerHTML = '<div style="color: #ff8200; text-align: center; padding: 10px;">获取数据失败，请稍后重试</div>';
    }
}

// 格式化热度值
function formatHotValue(hot) {
    if (hot >= 10000) {
        return (hot / 10000).toFixed(1) + 'w';
    }
    return hot;
}

// 定时刷新微博热搜
function initWeiboHot() {
    fetchWeiboHot();
    setInterval(fetchWeiboHot, 5 * 60 * 1000); // 每5分钟刷新一次
}

// 获取一言句子
async function fetchHitokoto() {
    try {
        const response = await fetch('https://api.vvhan.com/api/ian/rand?type=json');
        const data = await response.json();
        
        if (data.success) {
            const content = document.getElementById('hitokoto-content');
            const from = document.getElementById('hitokoto-from');
            const creator = document.getElementById('hitokoto-creator');
            
            content.textContent = data.data.content;
            from.textContent = `《${data.data.form}》`;
            creator.textContent = data.data.creator ? `- ${data.data.creator}` : '';
            
            // 添加淡入动画效果
            content.style.opacity = '0';
            from.style.opacity = '0';
            creator.style.opacity = '0';
            
            setTimeout(() => {
                content.style.transition = 'opacity 0.5s ease-in';
                from.style.transition = 'opacity 0.5s ease-in';
                creator.style.transition = 'opacity 0.5s ease-in';
                content.style.opacity = '1';
                from.style.opacity = '1';
                creator.style.opacity = '1';
            }, 100);
        }
    } catch (error) {
        console.error('获取一言句子失败:', error);
        document.getElementById('hitokoto-content').textContent = '获取一言句子失败，请稍后再试';
    }
}

// 初始化一言功能
function initHitokoto() {
    fetchHitokoto();
    // 每30秒更新一次
    setInterval(fetchHitokoto, 30000);
}

// 初始化摸鱼人日历
function initMoyuCalendar() {
    const moyuImage = document.getElementById('moyuImage');
    
    async function fetchMoyuCalendar() {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`https://api.vvhan.com/api/moyu?t=${timestamp}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            moyuImage.src = response.url;
            moyuImage.onerror = () => {
                moyuImage.alt = '图片加载失败，请刷新重试';
                console.error('Failed to load moyu calendar image');
            };
        } catch (error) {
            console.error('获取摸鱼人日历失败:', error);
            if (moyuImage) {
                moyuImage.alt = '获取失败，请稍后重试';
            }
        }
    }
    
    // 初始加载
    fetchMoyuCalendar();
    
    // 设置定时刷新
    setInterval(fetchMoyuCalendar, 30 * 60 * 1000); // 每30分钟刷新一次
}

// 初始化书摘图片
function initArtText() {
    const artTextImage = document.getElementById('artTextImage');
    if (!artTextImage) {
        console.warn('Art text image element not found');
        return;
    }

    // 书摘文本
    const text = "大胆去做，不要怕，\n没有人在乎，\n就算有人在乎\n人又算什么东西。";
    const author = "毛姆《刀锋》";
    const color = "ffffff"; // 白色文字
    const bgcolor = "000000"; // 黑色背景
    
    // 构建API URL
    const apiUrl = `https://api.vvhan.com/api/artText?text=${encodeURIComponent(text)}&auther=${encodeURIComponent(author)}&color=${color}&bgcolor=${bgcolor}`;
    
    // 设置加载状态
    artTextImage.style.opacity = '0.6';
    
    // 加载图片
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.url;
        })
        .then(imageUrl => {
            // 预加载图片
            const img = new Image();
            img.onload = () => {
                artTextImage.src = imageUrl;
                artTextImage.style.opacity = '1';
            };
            img.onerror = () => {
                throw new Error('Failed to load art text image');
            };
            img.src = imageUrl;
        })
        .catch(error => {
            console.error('书摘图片加载失败:', error);
            artTextImage.alt = '获取失败，请稍后再试';
            artTextImage.style.opacity = '1';
        });
}

// 使用 fetch API 请求指定的 URL
function fetchContent() {
    const contentDiv = document.querySelector('.content');
    if (!contentDiv) {
        console.warn('Content container not found');
        return;
    }

    fetch('https://www.wudada.online/Api/ScD')
        .then(response => response.json())
        .then(data => {
            // 清空现有内容
            contentDiv.innerHTML = '';
            
            // 检查data是否为null
            if (data === null) {
                const p = document.createElement('p');
                p.textContent = '请求失败，没有返回有效信息';
                contentDiv.appendChild(p);
                return;
            }

            // 如果data不是null，检查code字段
            if (data.code === '200' && data.data && data.data.content) {
                data.data.content.forEach(item => {
                    if (item && item.content) {
                        const p = document.createElement('p');
                        p.textContent = item.content;
                        contentDiv.appendChild(p);
                    }
                });
            } else {
                const p = document.createElement('p');
                p.textContent = data.msg || '请求失败，没有返回有效信息';
                contentDiv.appendChild(p);
            }
        })
        .catch(error => {
            console.error('请求出错:', error);
            if (contentDiv) {
                contentDiv.innerHTML = '<p>获取数据失败，请稍后重试</p>';
            }
        });
}

// 当文档加载完毕时执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取摸鱼日历API的URL
    const moyuImage = document.getElementById('moyuImage');
    if (!moyuImage) {
        console.warn('Moyu calendar image element not found');
        return;
    }

    async function fetchMoyuCalendar() {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`https://api.vvhan.com/api/moyu?t=${timestamp}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            moyuImage.src = response.url;
            moyuImage.onerror = () => {
                moyuImage.alt = '图片加载失败，请刷新重试';
                console.error('Failed to load moyu calendar image');
            };
        } catch (error) {
            console.error('获取摸鱼人日历失败:', error);
            if (moyuImage) {
                moyuImage.alt = '获取失败，请稍后重试';
            }
        }
    }

    // 初始化功能
    fetchContent();
    fetchMoyuCalendar();
    
    // 设置定时刷新
    setInterval(fetchMoyuCalendar, 30 * 60 * 1000); // 每30分钟刷新一次
});
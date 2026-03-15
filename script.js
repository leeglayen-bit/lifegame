(function () {
  "use strict";

  var state = {
    day: 1,
    money: 100,
    energy: 100,
    mood: 80,
    fans: 0,
    started: false
  };

  var BAR_MAX = { money: 400, energy: 100, mood: 100, fans: 200 };

  var events = [
    {
      text: "早上闹钟响了，你困得睁不开眼。今天有一节英语早八精读课，教授喜欢点名，你还想着昨晚直播的数据。",
      choices: [
        { label: "爬起来去上课", money: -10, energy: -25, mood: -5, fans: 0 },
        { label: "翘课补觉", money: 0, energy: 15, mood: 5, fans: 0 },
        { label: "点外卖边吃边刷手机", money: -25, energy: -10, mood: 10, fans: 2 },
        { label: "去图书馆自习", money: -5, energy: -20, mood: 0, fans: 0 }
      ]
    },
    {
      text: "室友邀请你一起拍一条宿舍搞笑短视频，说不定能火，还提议用你的英语配音做反差感。",
      choices: [
        { label: "全力配合拍一条", money: 0, energy: -20, mood: 15, fans: 8 },
        { label: "随便应付一下", money: 0, energy: -10, mood: 0, fans: 2 },
        { label: "拒绝，我要学习", money: 0, energy: -15, mood: -10, fans: 0 },
        { label: "我出钱买道具一起搞", money: -30, energy: -25, mood: 20, fans: 12 }
      ]
    },
    {
      text: "食堂阿姨多给你打了一勺菜，你心情不错。下午有一场社团招新。",
      choices: [
        { label: "加入摄影社", money: -20, energy: -15, mood: 10, fans: 3 },
        { label: "加入舞蹈社", money: -15, energy: -30, mood: 20, fans: 5 },
        { label: "不参加，回宿舍剪视频", money: 0, energy: -25, mood: 5, fans: 10 },
        { label: "随便逛逛就回", money: 0, energy: -5, mood: 0, fans: 0 }
      ]
    },
    {
      text: "你发的一条英语口语日常 vlog 突然有了不少点赞，评论区有人催更。",
      choices: [
        { label: "立刻再拍一条", money: 0, energy: -30, mood: 15, fans: 15 },
        { label: "明天再说，先休息", money: 0, energy: 20, mood: 5, fans: 0 },
        { label: "买点设备升级画质", money: -50, energy: -10, mood: 10, fans: 8 },
        { label: "开直播聊聊天", money: 10, energy: -25, mood: 5, fans: 12 }
      ]
    },
    {
      text: "月底了，生活费见底。有人私信找你接一条小广告。",
      choices: [
        { label: "接，赚点零花钱", money: 80, energy: -15, mood: 5, fans: -3 },
        { label: "不接，怕掉粉", money: 0, energy: 0, mood: 5, fans: 2 },
        { label: "讨价还价再接", money: 120, energy: -20, mood: 0, fans: -5 },
        { label: "先学习，以后再接", money: 0, energy: -10, mood: -5, fans: 0 }
      ]
    },
    {
      text: "期中英语考试临近，你还没怎么背单词和刷题，粉丝却在催更。",
      choices: [
        { label: "停更一周专心复习", money: 0, energy: -35, mood: -10, fans: -8 },
        { label: "边复习边发短视频", money: 0, energy: -40, mood: -5, fans: 5 },
        { label: "先拍完再复习", money: 0, energy: -30, mood: 10, fans: 12 },
        { label: "摆烂，不复习也不更", money: 0, energy: 10, mood: -20, fans: -15 }
      ]
    },
    {
      text: "有个小品牌方发来商单，想和你长期合作，让你做英语学习相关内容，但要求每周至少两条视频。",
      choices: [
        { label: "签！赚钱重要", money: 150, energy: -30, mood: -5, fans: 5 },
        { label: "拒绝，太累了", money: 0, energy: 10, mood: 10, fans: 0 },
        { label: "先试一个月", money: 80, energy: -25, mood: 0, fans: 8 },
        { label: "只接单条，不签长期", money: 40, energy: -15, mood: 5, fans: 3 }
      ]
    },
    {
      text: "你在食堂吃饭时被路人认出来，问能不能合影。",
      choices: [
        { label: "开心合影", money: 0, energy: -5, mood: 15, fans: 5 },
        { label: "委婉拒绝", money: 0, energy: 0, mood: -5, fans: -2 },
        { label: "合影并邀请关注", money: 0, energy: -5, mood: 10, fans: 10 },
        { label: "假装不是本人", money: 0, energy: 0, mood: -10, fans: -5 }
      ]
    },
    {
      text: "为了赶一个英语口语挑战的热点，你熬夜剪视频剪到凌晨三点，明天还有早八精读。",
      choices: [
        { label: "硬撑去上课", money: 0, energy: -35, mood: -15, fans: 0 },
        { label: "翘课睡觉", money: 0, energy: 20, mood: 0, fans: 0 },
        { label: "喝咖啡撑住", money: -15, energy: -15, mood: -5, fans: 0 },
        { label: "请病假休息", money: 0, energy: 25, mood: 5, fans: 0 }
      ]
    },
    {
      text: "有一条视频被大 V 转发了，粉丝涨得很快。",
      choices: [
        { label: "趁热打铁连更", money: 0, energy: -35, mood: 20, fans: 25 },
        { label: "感谢大家，休息一天", money: 0, energy: 15, mood: 15, fans: 5 },
        { label: "开个直播感谢", money: 30, energy: -25, mood: 15, fans: 20 },
        { label: "接广告变现", money: 100, energy: -20, mood: 5, fans: 0 }
      ]
    },
    {
      text: "室友觉得你天天拍视频影响休息，有点不满。",
      choices: [
        { label: "道歉并减少在宿舍拍", money: 0, energy: 5, mood: -5, fans: -3 },
        { label: "请室友吃饭缓和", money: -40, energy: 0, mood: 15, fans: 0 },
        { label: "我行我素", money: 0, energy: 0, mood: -20, fans: 0 },
        { label: "搬出去住", money: -200, energy: 10, mood: 10, fans: 0 }
      ]
    },
    {
      text: "平台给你发了「潜力创作者」的认证邀请。",
      choices: [
        { label: "立刻申请", money: 0, energy: -10, mood: 15, fans: 10 },
        { label: "再等等，粉丝再多点", money: 0, energy: 0, mood: 0, fans: 0 },
        { label: "不感兴趣", money: 0, energy: 0, mood: -5, fans: 0 },
        { label: "申请并策划新系列", money: -30, energy: -25, mood: 20, fans: 15 }
      ]
    },
    {
      text: "期末考试和平台活动档期撞了，两边都要时间。",
      choices: [
        { label: "优先考试", money: 0, energy: -30, mood: -5, fans: -10 },
        { label: "优先活动", money: 50, energy: -35, mood: 5, fans: 15 },
        { label: "两边都硬扛", money: 30, energy: -50, mood: -15, fans: 8 },
        { label: "放弃活动", money: 0, energy: -25, mood: -10, fans: -5 }
      ]
    },
    {
      text: "今晚你开直播，状态爆棚，弹幕刷屏，礼物不断。",
      choices: [
        { label: "多播一小时感谢大家", money: 40, energy: -30, mood: 25, fans: 18 },
        { label: "按时下播，保持节奏", money: 20, energy: -20, mood: 15, fans: 10 },
        { label: "趁热发一条短视频引流", money: 10, energy: -25, mood: 20, fans: 15 },
        { label: "下播后立刻剪精彩片段", money: 0, energy: -35, mood: 10, fans: 12 }
      ]
    },
    {
      text: "你精心剪了一天的英语学习 vlog 发出去，播放量惨淡，数据曲线一片惨绿。",
      choices: [
        { label: "分析数据，下次改进", money: 0, energy: -5, mood: -10, fans: 0 },
        { label: "删掉重来", money: 0, energy: -20, mood: -15, fans: -3 },
        { label: "发条动态求三连", money: 0, energy: -5, mood: -5, fans: 2 },
        { label: "先休息，明天再想", money: 0, energy: 15, mood: -5, fans: 0 }
      ]
    },
    {
      text: "你暗恋很久的 crush 突然回你消息了，还夸了你最近那条英语 vlog 的发音很好听。",
      choices: [
        { label: "开心到飞起，立刻回复", money: 0, energy: 5, mood: 30, fans: 0 },
        { label: "冷静一下再回", money: 0, energy: 0, mood: 20, fans: 0 },
        { label: "趁机约 ta 出镜拍一条", money: -20, energy: -15, mood: 25, fans: 15 },
        { label: "发条动态纪念一下", money: 0, energy: -10, mood: 20, fans: 5 }
      ]
    },
    {
      text: "室友喊你：「别剪了，走，出去吃饭，我请。」",
      choices: [
        { label: "走！立刻关电脑", money: 0, energy: 15, mood: 20, fans: 0 },
        { label: "等我剪完这一刀", money: 0, energy: -15, mood: 5, fans: 3 },
        { label: "不去了，我要赶更", money: 0, energy: -10, mood: -10, fans: 5 },
        { label: "一起去，但 AA", money: -25, energy: 10, mood: 15, fans: 0 }
      ]
    },
    {
      text: "品牌方发来一条商单：拍一条软广，报价不错，但产品你不太熟。",
      choices: [
        { label: "接，认真试用再拍", money: 100, energy: -25, mood: 5, fans: -2 },
        { label: "接，按脚本快速拍完", money: 120, energy: -15, mood: -5, fans: -5 },
        { label: "婉拒，等更合适的", money: 0, energy: 0, mood: 10, fans: 2 },
        { label: "讨价还价后接", money: 150, energy: -20, mood: 0, fans: -3 }
      ]
    },
    {
      text: "上午的课老师突然点名，你昨晚剪视频没去，被记缺勤了。",
      choices: [
        { label: "找老师说明情况", money: 0, energy: -10, mood: -15, fans: 0 },
        { label: "认了，下次注意", money: 0, energy: 0, mood: -10, fans: 0 },
        { label: "以后少熬夜，优先上课", money: 0, energy: 10, mood: -5, fans: 0 },
        { label: "用请假条补一下", money: 0, energy: -5, mood: -5, fans: 0 }
      ]
    },
    {
      text: "你的一条校园 vlog 被学校官号转发，评论区好多校友来关注。",
      choices: [
        { label: "趁势做一期校园专题", money: 0, energy: -30, mood: 20, fans: 22 },
        { label: "感谢官号，保持更新", money: 0, energy: -15, mood: 15, fans: 12 },
        { label: "开直播和校友聊天", money: 25, energy: -25, mood: 18, fans: 15 },
        { label: "低调一点，怕被熟人吐槽", money: 0, energy: 0, mood: 5, fans: 5 }
      ]
    },
    {
      text: "有 MCN 私信想签你，承诺资源扶持，但要分成且约束较多。",
      choices: [
        { label: "先聊聊看", money: 0, energy: -10, mood: 5, fans: 0 },
        { label: "拒绝，想自己搞", money: 0, energy: 0, mood: 10, fans: 0 },
        { label: "签！要流量", money: 50, energy: -20, mood: 0, fans: 15 },
        { label: "再涨点粉再说", money: 0, energy: 0, mood: 5, fans: 0 }
      ]
    },
    {
      text: "寒假快到了，你打算怎么安排？",
      choices: [
        { label: "回家休息", money: 0, energy: 30, mood: 20, fans: -5 },
        { label: "留校做内容", money: 0, energy: -20, mood: 0, fans: 15 },
        { label: "接商单赚学费", money: 120, energy: -25, mood: 0, fans: 5 },
        { label: "旅行拍 vlog", money: -80, energy: -15, mood: 25, fans: 20 }
      ]
    }
  ];

  var startStory = "你是英语专业的大一新生，一边上课背单词，一边在平台上做英语口语、自习 vlog。你既在意GPA，也盯着每一条视频的数据曲线。今天是你开学的第一天，接下来会发生什么呢？";

  function getStatHint() {
    var hints = [];
    if (state.energy <= 0) return "精力耗尽……你急需休息。";
    if (state.mood <= 0) return "心情跌到谷底……先照顾好自己。";
    if (state.energy <= 20) hints.push("精力不足，上课和直播要二选一了");
    else if (state.energy >= 80) hints.push("精力充沛，可以安排一点创作");
    if (state.mood <= 20) hints.push("心情很差，crush、流量和熬夜都在消耗你");
    else if (state.mood >= 80) hints.push("心情不错，适合写脚本和拍片");
    if (state.money <= 30) hints.push("钱包见底了，看到商单会有点心动");
    else if (state.money >= 200) hints.push("小金库充裕，可以安心专注内容质量");
    if (state.fans <= 10 && state.fans >= 0) hints.push("粉丝还在起步阶段，数据先别太在意");
    else if (state.fans >= 80) hints.push("小有人气，直播、上课、商单要好好平衡");
    return hints.length ? hints.join(" · ") : "一切正常，可以在上课、直播和商单之间慢慢摸索自己的节奏。";
  }

  function getRandomEvent() {
    return events[Math.floor(Math.random() * events.length)];
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  function showDelta(key, delta) {
    if (!delta) return;
    var el = document.getElementById("delta-" + key);
    if (!el) return;
    el.textContent = (delta > 0 ? "+" : "") + delta;
    el.classList.remove("positive", "negative", "visible");
    el.classList.add(delta > 0 ? "positive" : "negative");
    // 强制重绘以重置动画
    void el.offsetWidth;
    el.classList.add("visible");
    setTimeout(function () {
      el.classList.remove("visible");
    }, 800);
  }

  function applyChoice(choice) {
    var moneyDelta = choice.money || 0;
    var rawEnergyDelta = choice.energy || 0;
    var energyDelta = rawEnergyDelta;
    if (energyDelta < 0) {
      energyDelta = Math.round(energyDelta * 0.7);
    }
    var moodDelta = choice.mood || 0;
    var fansDelta = choice.fans || 0;

    state.money = clamp(state.money + moneyDelta, 0, 9999);
    state.energy = clamp(state.energy + energyDelta, 0, 100);
    state.mood = clamp(state.mood + moodDelta, 0, 100);
    state.fans = clamp(state.fans + fansDelta, 0, 9999);

    showDelta("money", moneyDelta);
    showDelta("energy", energyDelta);
    showDelta("mood", moodDelta);
    showDelta("fans", fansDelta);
  }

  function getBarPercent(statName) {
    var val = state[statName];
    var max = BAR_MAX[statName];
    return Math.min(100, Math.round((val / max) * 100));
  }

  function updateUI() {
    document.getElementById("stat-money").textContent = state.money;
    document.getElementById("stat-energy").textContent = state.energy;
    document.getElementById("stat-mood").textContent = state.mood;
    document.getElementById("stat-fans").textContent = state.fans;
    document.getElementById("day-num").textContent = state.day;

    document.getElementById("fill-money").style.width = getBarPercent("money") + "%";
    document.getElementById("fill-energy").style.width = getBarPercent("energy") + "%";
    document.getElementById("fill-mood").style.width = getBarPercent("mood") + "%";
    document.getElementById("fill-fans").style.width = getBarPercent("fans") + "%";

    document.getElementById("stat-hint").textContent = getStatHint();

    var energyEl = document.querySelector('.stat[data-stat="energy"]');
    var moodEl = document.querySelector('.stat[data-stat="mood"]');
    var moneyEl = document.querySelector('.stat[data-stat="money"]');
    var fansEl = document.querySelector('.stat[data-stat="fans"]');
    [energyEl, moodEl, moneyEl, fansEl].forEach(function (el) { el.classList.remove("low", "danger", "high"); });
    if (state.energy <= 20) energyEl.classList.add(state.energy <= 0 ? "danger" : "low");
    else if (state.energy >= 80) energyEl.classList.add("high");
    if (state.mood <= 20) moodEl.classList.add(state.mood <= 0 ? "danger" : "low");
    else if (state.mood >= 80) moodEl.classList.add("high");
    if (state.money >= 200) moneyEl.classList.add("high");
    if (state.fans >= 80) fansEl.classList.add("high");
  }

  function showEvent(ev) {
    document.getElementById("story-text").textContent = ev.text;
    var buttons = ["choice-1", "choice-2", "choice-3", "choice-4"];
    ev.choices.forEach(function (c, i) {
      var btn = document.getElementById(buttons[i]);
      btn.textContent = c.label;
      btn.disabled = false;
    });
  }

  function showOverlay(title, text) {
    var overlay = document.getElementById("game-overlay");
    document.getElementById("overlay-title").textContent = title;
    document.getElementById("overlay-text").textContent = text;
    overlay.hidden = false;
  }

  function hideOverlay() {
    document.getElementById("game-overlay").hidden = true;
  }

  function getEnding() {
    if (state.fans >= 100 && state.money >= 200) {
      return { title: "🎉 完美结局：人气与财富兼得", text: "你既积累了可观的粉丝，又赚到了不少钱。大学生网红之路，你走得稳稳当当！" };
    }
    if (state.fans >= 80) {
      return { title: "🌟 网红新星", text: "虽然钱包不算鼓，但你已经是个小有名气的校园网红了。坚持下去，未来可期！" };
    }
    if (state.money >= 250) {
      return { title: "💰 商业小能手", text: "你更擅长把流量变现，赚了不少零花钱。粉丝可以慢慢涨，钱先落袋为安！" };
    }
    if (state.fans >= 30 && state.money >= 100) {
      return { title: "📱 平稳度过", text: "你平衡了学业和副业，既没饿着也没累垮。大学生活和网红初体验，都算及格了。" };
    }
    if (state.fans >= 20) {
      return { title: "🌱 小透明起步", text: "粉丝不多，但你在尝试。至少你迈出了第一步，以后还有机会。" };
    }
    return { title: "📚 佛系大学生", text: "你更像普通学生，没在网红路上花太多精力。平平淡淡也是一种选择。" };
  }

  function checkGameOver() {
    if (state.energy <= 0) {
      showOverlay("游戏结束", "你精力耗尽，累倒在宿舍里……好好休息，下次再战吧！");
      return true;
    }
    if (state.mood <= 0) {
      showOverlay("游戏结束", "你心情跌到谷底，再也提不起劲拍视频了……照顾好心情很重要哦。");
      return true;
    }
    return false;
  }

  function nextDay(choiceIndex) {
    var ev = currentEvent;
    var choice = ev.choices[choiceIndex];
    applyChoice(choice);
    updateUI();

    if (checkGameOver()) return;

    if (state.day >= 15) {
      var ending = getEnding();
      showOverlay(ending.title, ending.text);
      return;
    }

    state.day += 1;
    currentEvent = getRandomEvent();
    showEvent(currentEvent);
    updateUI();
  }

  function init() {
    state.day = 1;
    state.money = 100;
    state.energy = 100;
    state.mood = 80;
    state.fans = 0;
    state.started = false;

    document.getElementById("story-text").textContent = startStory;
    document.getElementById("choice-1").textContent = "开始游戏";
    document.getElementById("choice-2").textContent = "";
    document.getElementById("choice-3").textContent = "";
    document.getElementById("choice-4").textContent = "";
    document.getElementById("choice-2").disabled = true;
    document.getElementById("choice-3").disabled = true;
    document.getElementById("choice-4").disabled = true;
    updateUI();
    hideOverlay();
    currentEvent = null;

    var container = document.getElementById("game-container");
    if (container) {
      container.classList.add("is-not-started");
      container.classList.remove("is-started");
    }
  }

  var currentEvent = null;

  document.getElementById("choice-1").addEventListener("click", function () {
    if (state.day === 1 && !currentEvent) {
      state.started = true;
      var container = document.getElementById("game-container");
      if (container) {
        container.classList.remove("is-not-started");
        container.classList.add("is-started");
      }
      currentEvent = getRandomEvent();
      showEvent(currentEvent);
      state.day = 1;
      updateUI();
      return;
    }
    nextDay(0);
  });

  document.getElementById("choice-2").addEventListener("click", function () { nextDay(1); });
  document.getElementById("choice-3").addEventListener("click", function () { nextDay(2); });
  document.getElementById("choice-4").addEventListener("click", function () { nextDay(3); });

  document.getElementById("restart-btn").addEventListener("click", init);
  document.getElementById("restart-btn-top").addEventListener("click", init);

  init();
})();

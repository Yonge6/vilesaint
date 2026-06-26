(() => {
  "use strict";

  const TILE = 40;
  const COLS = 18;
  const ROWS = 12;
  const MAX = 100;

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const $ = (id) => document.getElementById(id);

  const dom = {
    tagline: $("tagline"),
    langZh: $("langZh"),
    langEn: $("langEn"),
    restartBtn: $("restartBtn"),
    overlay: $("overlay"),
    overlayEyebrow: $("overlayEyebrow"),
    overlayTitle: $("overlayTitle"),
    overlayBody: $("overlayBody"),
    startBtn: $("startBtn"),
    levelLabel: $("levelLabel"),
    levelTitle: $("levelTitle"),
    levelIntro: $("levelIntro"),
    objectiveCaption: $("objectiveCaption"),
    objectiveText: $("objectiveText"),
    message: $("message"),
    fearLabel: $("fearLabel"),
    kindLabel: $("kindLabel"),
    trustLabel: $("trustLabel"),
    curseLabel: $("curseLabel"),
    shadowLabel: $("shadowLabel"),
    fearBar: $("fearBar"),
    kindBar: $("kindBar"),
    trustBar: $("trustBar"),
    curseBar: $("curseBar"),
    energyBar: $("energyBar"),
    fearValue: $("fearValue"),
    kindValue: $("kindValue"),
    trustValue: $("trustValue"),
    curseValue: $("curseValue"),
    energyValue: $("energyValue"),
    howToTitle: $("howToTitle"),
    howToText: $("howToText"),
    legendWall: $("legendWall"),
    legendShadow: $("legendShadow"),
    legendExit: $("legendExit"),
    legendVision: $("legendVision"),
    footerText: $("footerText"),
    mobileInteract: $("mobileInteract"),
    mobileCloak: $("mobileCloak")
  };

  const TEXT = {
    zh: {
      tagline: "他们叫你怪物。你仍然选择拯救他们。",
      overlayEyebrow: "温柔暗黑童话小游戏",
      title: "Vile Saint",
      startBody:
        "你看起来像恶魔，所以没人相信你是好人。夜晚回到村庄，避开目光，偷偷完成善事。",
      start: "开始游戏",
      continue: "继续",
      restart: "重开",
      restartLevel: "重试本夜",
      levelNight: (n) => `第 ${n} 夜`,
      objective: "目标",
      stats: {
        fear: "恐惧",
        kindness: "善意",
        trust: "信任",
        curse: "诅咒",
        shadow: "影力"
      },
      howToTitle: "操作",
      howToText: "移动到目标旁边按“互动”。站在阴影格或使用“影幕”时，村民看不见你。",
      legend: {
        wall: "墙/树",
        shadow: "阴影",
        exit: "月门",
        vision: "视线"
      },
      footer: "Look evil. Do good.",
      ready: "方向键 / WASD / 屏幕按钮移动，空格或“互动”帮忙，E 或“影幕”隐藏。",
      bump: "这里被树根和石墙挡住了。",
      villagerBlock: "你差点撞上村民！他看见了你的角。",
      seen: "村民看见了你，恐惧正在上升。",
      hidden: "阴影盖住了你的轮廓，村民只看见一阵风。",
      noObject: "附近没有可以帮助的目标。",
      needObjectives: "还不能离开。今晚仍有善事没完成。",
      exitLockedHint: "月门在闪烁，但它在等待你完成今晚的善意。",
      cloakOn: "影幕展开。接下来的几步里，你会被黑暗保护。",
      cloakLow: "影力不足。站到阴影里恢复力量。",
      alreadyDone: "这里已经被你悄悄处理好了。",
      levelClear: "天亮前，你离开了。村民只发现了被修好的东西。",
      panicTitle: "村庄陷入恐慌",
      panicBody: "他们还没有准备好理解你。夜色把你带走，等下一次机会。",
      finalEyebrow: "结局",
      finalButton: "再玩一次",
      mobileInteract: "互动",
      mobileCloak: "影幕",
      endings: {
        accepted: {
          title: "被接纳的怪物圣徒",
          body:
            "天亮时，村民终于看见你把最后一缕诅咒握在手心。有人仍然害怕你的角，但孩子们已经开始向你挥手。"
        },
        unseen: {
          title: "无名守护者",
          body:
            "没人知道是谁救了村庄。每当夜里钟声响起，人们只会说：怪物又来了，可我们安全了。"
        },
        martyr: {
          title: "被误解的圣徒",
          body:
            "恐惧仍然比真相跑得更快。你离开了这个村庄，把善意留在门口，把孤独带去下一片黑夜。"
        },
        wanderer: {
          title: "黑夜里的小光",
          body:
            "你没有成为传说，也没有得到拥抱。但诅咒变轻了，井水变清了，村庄又多活过一个春天。"
        }
      }
    },
    en: {
      tagline: "They call you a monster. You save them anyway.",
      overlayEyebrow: "A gentle dark-fairy-tale mini game",
      title: "Vile Saint",
      startBody:
        "You look like a demon, so no one believes you are kind. Return to the village at night, avoid their eyes, and do good in secret.",
      start: "Start Game",
      continue: "Continue",
      restart: "Restart",
      restartLevel: "Retry Night",
      levelNight: (n) => `Night ${n}`,
      objective: "Objective",
      stats: {
        fear: "Fear",
        kindness: "Kindness",
        trust: "Trust",
        curse: "Curse",
        shadow: "Shadow"
      },
      howToTitle: "Controls",
      howToText: "Move next to a target and press Help. Villagers cannot see you on shadow tiles or while Shadow Veil is active.",
      legend: {
        wall: "Wall/tree",
        shadow: "Shadow",
        exit: "Moon gate",
        vision: "Vision"
      },
      footer: "Look evil. Do good.",
      ready: "Move with keys or buttons. Space / Help to act. E / Veil to hide.",
      bump: "Roots and old stone block the way.",
      villagerBlock: "You almost run into a villager. He sees your horns.",
      seen: "A villager spots you. Fear rises.",
      hidden: "The shadow hides your shape. The villager only sees a passing wind.",
      noObject: "There is no one nearby to help.",
      needObjectives: "You cannot leave yet. There is still kindness to do tonight.",
      exitLockedHint: "The moon gate flickers, waiting for tonight's kindness to be done.",
      cloakOn: "Shadow Veil opens. Darkness will protect you for the next few steps.",
      cloakLow: "Not enough shadow power. Stand in a shadow tile to recover.",
      alreadyDone: "You have already fixed this in secret.",
      levelClear: "Before dawn, you leave. The villagers only find what has been repaired.",
      panicTitle: "The Village Panicked",
      panicBody: "They are not ready to understand you. Night carries you away until another chance comes.",
      finalEyebrow: "Ending",
      finalButton: "Play Again",
      mobileInteract: "Help",
      mobileCloak: "Veil",
      endings: {
        accepted: {
          title: "The Accepted Monster Saint",
          body:
            "At dawn, the villagers finally see the last thread of curse resting in your palm. Some still fear your horns, but the children have begun to wave."
        },
        unseen: {
          title: "The Nameless Guardian",
          body:
            "No one learns who saved the village. When the bell rings at night, people only say: the monster came again, and we are safe."
        },
        martyr: {
          title: "The Misunderstood Saint",
          body:
            "Fear still outruns truth. You leave the village, placing kindness at their doors and carrying loneliness into the next dark road."
        },
        wanderer: {
          title: "A Small Light in the Dark",
          body:
            "You did not become a legend, and no one embraced you. But the curse is lighter, the well is clear, and the village survives another spring."
        }
      }
    }
  };

  const OBJECT_COPY = {
    zh: {
      child: {
        label: "迷路的小孩",
        done: "你没有靠得太近，只用小灯照出回家的路。小孩停下哭声，沿着光走向村口。"
      },
      fire: {
        label: "燃烧的谷仓",
        done: "你用黑翼压住火焰，只留下几片焦黑羽毛。谷仓保住了。"
      },
      well: {
        label: "被诅咒的井",
        done: "你把井底的黑泥握进胸口。水面第一次映出了月亮。"
      },
      bridge: {
        label: "断裂的桥",
        done: "你用爪子把木梁重新扣紧，又把自己的影子留在缝隙里当钉子。"
      },
      sheep: {
        label: "受惊的羊",
        done: "你蹲得很低，把羊群慢慢赶回围栏。它们不再发抖。"
      },
      wolf: {
        label: "真正的狼怪",
        done: "你张开黑翼，狼怪终于明白谁才该害怕，夹着尾巴逃进森林。"
      },
      bell: {
        label: "沉默的钟",
        done: "你修好了钟绳。钟声穿过清晨，像一个没有署名的祝福。"
      }
    },
    en: {
      child: {
        label: "lost child",
        done: "You do not step too close. You only lift your small lantern and draw a path home. The child stops crying and follows the light."
      },
      fire: {
        label: "burning barn",
        done: "You smother the flames with your dark wings, leaving only a few scorched feathers. The barn survives."
      },
      well: {
        label: "cursed well",
        done: "You pull the black mud from the well into your chest. For the first time, the water reflects the moon."
      },
      bridge: {
        label: "broken bridge",
        done: "You lock the beams together with your claws, then leave your own shadow in the cracks like nails."
      },
      sheep: {
        label: "frightened sheep",
        done: "You crouch low and guide the sheep back into the pen. They stop trembling."
      },
      wolf: {
        label: "true wolf-fiend",
        done: "You open your black wings. The wolf-fiend finally learns who should be afraid and flees into the forest."
      },
      bell: {
        label: "silent bell",
        done: "You repair the bell rope. The sound crosses the morning like an unsigned blessing."
      }
    }
  };

  const OBJECT_META = {
    c: { type: "child", kindness: 18, trust: 10, curse: 10 },
    f: { type: "fire", kindness: 17, trust: 7, curse: 12 },
    w: { type: "well", kindness: 16, trust: 8, curse: 18 },
    b: { type: "bridge", kindness: 14, trust: 6, curse: 9 },
    s: { type: "sheep", kindness: 12, trust: 5, curse: 7 },
    m: { type: "wolf", kindness: 13, trust: 7, curse: 8 },
    t: { type: "bell", kindness: 20, trust: 12, curse: 16 }
  };

  const LEVELS = [
    {
      zh: {
        title: "迷路的小孩",
        intro: "村里人说森林里有怪物。今晚，一个小孩真的迷路了。",
        objective: "找到小孩，帮他回家，然后从月门离开。"
      },
      en: {
        title: "The Lost Child",
        intro: "The villagers say a monster lives in the woods. Tonight, a child truly is lost.",
        objective: "Find the child, help them home, then leave through the moon gate."
      },
      map: [
        "##################",
        "#P..H......#....E#",
        "#.####.###.#.##..#",
        "#......#...#..#..#",
        "#..>...#......#..#",
        "#......#.####.#..#",
        "#..c...#....#.#..#",
        "#......####.#.#..#",
        "#..H........#....#",
        "#......#######.H.#",
        "#................#",
        "##################"
      ]
    },
    {
      zh: {
        title: "燃烧的谷仓",
        intro: "火光把夜色染红。村民以为是你放的火，但真正的火正在吞掉粮食。",
        objective: "绕开守夜人，扑灭谷仓的火。"
      },
      en: {
        title: "The Burning Barn",
        intro: "Fire stains the night red. The villagers think you caused it, but the real flames are eating their grain.",
        objective: "Avoid the night watch and smother the barn fire."
      },
      map: [
        "##################",
        "#P.....H.....#..E#",
        "#.####.#####.#.#.#",
        "#....#.....#.#.#.#",
        "#.##.#.###.#.#.#.#",
        "#....#...#...#...#",
        "###.###.#.#####.##",
        "#f..#...#.....#..#",
        "#...#.<.#.###.#..#",
        "#.H.....#...#....#",
        "#......H....#....#",
        "##################"
      ]
    },
    {
      zh: {
        title: "井底的诅咒",
        intro: "井水变黑，孩子们开始发烧。只有你能触碰那种污秽。",
        objective: "净化井底的诅咒，然后离开。"
      },
      en: {
        title: "The Curse Below the Well",
        intro: "The well turns black, and children fall feverish. Only you can touch that filth.",
        objective: "Cleanse the curse below the well, then leave."
      },
      map: [
        "##################",
        "#P..H....#......E#",
        "#.#####..#.#####.#",
        "#.....#..#.....#.#",
        "#.###.#..###.#.#.#",
        "#...#.#..w...#...#",
        "###.#.####.#####.#",
        "#...#......#.....#",
        "#.>.#####..#.<...#",
        "#.......#..#.....#",
        "#..H....#..#..H..#",
        "##################"
      ]
    },
    {
      zh: {
        title: "羊圈外的狼",
        intro: "人们害怕你的爪子，却没有听见真正的狼怪已经靠近羊圈。",
        objective: "赶走狼怪，安抚羊群。"
      },
      en: {
        title: "Wolves Outside the Pen",
        intro: "People fear your claws, but they do not hear the real wolf-fiends nearing the pen.",
        objective: "Drive away the wolf-fiends and calm the sheep."
      },
      map: [
        "##################",
        "#P..H.........#E.#",
        "#.######.####.#..#",
        "#......#....#.#..#",
        "#.##...#.^..#....#",
        "#..m...#....####.#",
        "#......####......#",
        "###.######..m....#",
        "#...s....#..###..#",
        "#.H......#....H..#",
        "#................#",
        "##################"
      ]
    },
    {
      zh: {
        title: "沉默的钟",
        intro: "教堂钟坏了。没有钟声，清晨的结界就不会升起。",
        objective: "修好断桥和教堂钟，让村庄在日出前得到保护。"
      },
      en: {
        title: "The Silent Bell",
        intro: "The church bell is broken. Without it, the morning ward will not rise.",
        objective: "Repair the bridge and the church bell before sunrise protects the village."
      },
      map: [
        "##################",
        "#P..H......#....E#",
        "#.####.##..#.###.#",
        "#....#..#..#...#.#",
        "#.##.#..#..###.#.#",
        "#..b.#..#....#...#",
        "###.##..####.###.#",
        "#......<.........#",
        "#.#######.######.#",
        "#...H....t....H..#",
        "#................#",
        "##################"
      ]
    }
  ];

  let lang = localStorage.getItem("vileSaintLang") || "zh";
  let mode = "title";
  let levelIndex = 0;
  let current = null;
  let player = { x: 1, y: 1 };
  let stats = freshStats();
  let checkpointStats = freshStats();
  let cloakTurns = 0;
  let messageTimer = 0;
  let animationTime = 0;
  let successPulse = 0;
  let rewardText = "";
  let rewardTimer = 0;
  let particles = [];

  function freshStats() {
    return {
      fear: 0,
      kindness: 0,
      trust: 0,
      curse: 100,
      energy: 100,
      steps: 0
    };
  }

  function clamp(value, min = 0, max = MAX) {
    return Math.max(min, Math.min(max, value));
  }

  function t() {
    return TEXT[lang];
  }

  function localize(record) {
    return record[lang] || record.zh || record.en;
  }

  function setLang(nextLang) {
    lang = nextLang;
    localStorage.setItem("vileSaintLang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    dom.langZh.classList.toggle("active", lang === "zh");
    dom.langEn.classList.toggle("active", lang === "en");
    applyStaticText();
    updateUI();
    render();
  }

  function applyStaticText() {
    const copy = t();
    dom.tagline.textContent = copy.tagline;
    dom.restartBtn.textContent = copy.restart;
    dom.startBtn.textContent = mode === "ending" ? copy.finalButton : copy.start;
    dom.objectiveCaption.textContent = copy.objective;
    dom.fearLabel.textContent = copy.stats.fear;
    dom.kindLabel.textContent = copy.stats.kindness;
    dom.trustLabel.textContent = copy.stats.trust;
    dom.curseLabel.textContent = copy.stats.curse;
    dom.shadowLabel.textContent = copy.stats.shadow;
    dom.howToTitle.textContent = copy.howToTitle;
    dom.howToText.textContent = copy.howToText;
    dom.legendWall.textContent = copy.legend.wall;
    dom.legendShadow.textContent = copy.legend.shadow;
    dom.legendExit.textContent = copy.legend.exit;
    dom.legendVision.textContent = copy.legend.vision;
    dom.footerText.textContent = copy.footer;
    dom.mobileInteract.textContent = copy.mobileInteract;
    dom.mobileCloak.textContent = copy.mobileCloak;

    if (mode === "title") {
      dom.overlayEyebrow.textContent = copy.overlayEyebrow;
      dom.overlayTitle.textContent = copy.title;
      dom.overlayBody.textContent = copy.startBody;
      dom.startBtn.textContent = copy.start;
    }
  }

  function parseLevel(index) {
    const source = LEVELS[index];
    const grid = [];
    const villagers = [];
    const objects = [];
    let start = { x: 1, y: 1 };

    source.map.forEach((row, y) => {
      const chars = row.split("");
      if (chars.length !== COLS) {
        throw new Error(`Level ${index + 1}, row ${y + 1} must be ${COLS} columns, got ${chars.length}.`);
      }

      chars.forEach((char, x) => {
        if (char === "P") {
          start = { x, y };
          chars[x] = ".";
        }

        if ("^>v<".includes(char)) {
          villagers.push({ x, y, dir: char, range: 5 });
          chars[x] = ".";
        }

        if (OBJECT_META[char]) {
          objects.push({
            x,
            y,
            code: char,
            type: OBJECT_META[char].type,
            done: false
          });
          chars[x] = ".";
        }
      });

      grid.push(chars);
    });

    return {
      source,
      grid,
      villagers,
      objects,
      start
    };
  }

  function startGame() {
    stats = freshStats();
    checkpointStats = { ...stats };
    levelIndex = 0;
    mode = "playing";
    rewardTimer = 0;
    particles = [];
    successPulse = 0;
    dom.overlay.classList.add("hidden");
    loadLevel(levelIndex, true);
    canvas.focus();
  }

  function loadLevel(index, useCheckpoint = false) {
    current = parseLevel(index);
    player = { ...current.start };
    cloakTurns = 0;
    if (!useCheckpoint) {
      stats.fear = clamp(stats.fear - 14);
      checkpointStats = { ...stats };
    } else {
      checkpointStats = { ...stats };
    }
    showMessage(t().ready);
    updateUI();
    render();
  }

  function resetGame() {
    startGame();
  }

  function resetLevelAfterPanic() {
    mode = "playing";
    stats = { ...checkpointStats };
    current = parseLevel(levelIndex);
    player = { ...current.start };
    cloakTurns = 0;
    dom.overlay.classList.add("hidden");
    showMessage(t().ready);
    updateUI();
    render();
    canvas.focus();
  }

  function updateUI() {
    const copy = t();
    if (current && mode !== "ending") {
      const levelCopy = localize(current.source);
      dom.levelLabel.textContent = copy.levelNight(levelIndex + 1);
      dom.levelTitle.textContent = levelCopy.title;
      dom.levelIntro.textContent = levelCopy.intro;
      dom.objectiveText.textContent = levelCopy.objective;
    }

    dom.fearValue.textContent = Math.round(stats.fear);
    dom.kindValue.textContent = Math.round(stats.kindness);
    dom.trustValue.textContent = Math.round(stats.trust);
    dom.curseValue.textContent = Math.round(stats.curse);
    dom.energyValue.textContent = Math.round(stats.energy);

    dom.fearBar.style.width = `${clamp(stats.fear)}%`;
    dom.kindBar.style.width = `${clamp(stats.kindness)}%`;
    dom.trustBar.style.width = `${clamp(stats.trust)}%`;
    dom.curseBar.style.width = `${clamp(stats.curse)}%`;
    dom.energyBar.style.width = `${clamp(stats.energy)}%`;

    if (messageTimer > 0) {
      messageTimer -= 1;
    }
  }

  function showMessage(text, tone = "normal") {
    dom.message.textContent = text;
    dom.message.classList.toggle("success", tone === "success");
    messageTimer = 120;
  }

  function burstAt(x, y) {
    successPulse = 24;
    for (let i = 0; i < 28; i += 1) {
      const angle = (Math.PI * 2 * i) / 28;
      const speed = 1.4 + (i % 5) * 0.22;
      particles.push({
        x: x * TILE + TILE / 2,
        y: y * TILE + TILE / 2,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 28 + (i % 7),
        color: i % 3 === 0 ? "#ffcf7d" : i % 3 === 1 ? "#91b9c9" : "#9cc7a7"
      });
    }
  }

  function showReward(kindness) {
    rewardText = lang === "zh" ? `善意 +${kindness}` : `GRACE +${kindness}`;
    rewardTimer = 44;
  }

  function inBounds(x, y) {
    return x >= 0 && y >= 0 && x < COLS && y < ROWS;
  }

  function tileAt(x, y) {
    if (!inBounds(x, y)) return "#";
    return current.grid[y][x];
  }

  function isWall(x, y) {
    return tileAt(x, y) === "#";
  }

  function isShadow(x, y) {
    return tileAt(x, y) === "H";
  }

  function villagerAt(x, y) {
    return current.villagers.find((villager) => villager.x === x && villager.y === y);
  }

  function objectAt(x, y) {
    return current.objects.find((object) => object.x === x && object.y === y && !object.done);
  }

  function allObjectivesDone() {
    return current.objects.every((object) => object.done);
  }

  function isHidden() {
    return cloakTurns > 0 || isShadow(player.x, player.y);
  }

  function tryMove(dx, dy) {
    if (mode !== "playing") return;

    const nx = player.x + dx;
    const ny = player.y + dy;

    if (isWall(nx, ny)) {
      showMessage(t().bump);
      render();
      return;
    }

    if (villagerAt(nx, ny)) {
      stats.fear = clamp(stats.fear + 38);
      showMessage(t().villagerBlock);
      checkPanic();
      updateUI();
      render();
      return;
    }

    player.x = nx;
    player.y = ny;
    stats.steps += 1;

    if (cloakTurns > 0) cloakTurns -= 1;

    if (isShadow(player.x, player.y)) {
      stats.energy = clamp(stats.energy + 12);
    } else {
      stats.energy = clamp(stats.energy + 2);
    }

    if (objectAt(player.x, player.y)) {
      const object = objectAt(player.x, player.y);
      const copy = OBJECT_COPY[lang][object.type];
      showMessage(lang === "zh" ? `你靠近了${copy.label}。按空格帮忙。` : `You are near the ${copy.label}. Press Space to help.`);
    }

    if (tileAt(player.x, player.y) === "E") {
      handleExit();
    } else {
      checkVision();
    }

    updateUI();
    render();
  }

  function handleExit() {
    if (!allObjectivesDone()) {
      showMessage(t().needObjectives);
      checkVision();
      return;
    }

    stats.trust = clamp(stats.trust + 3);
    showMessage(t().levelClear);

    if (levelIndex >= LEVELS.length - 1) {
      finishGame();
      return;
    }

    levelIndex += 1;
    setTimeout(() => {
      if (mode === "playing") loadLevel(levelIndex, false);
    }, 550);
  }

  function interact() {
    if (mode !== "playing") return;

    const nearby = current.objects
      .filter((object) => !object.done)
      .map((object) => ({
        object,
        distance: Math.abs(object.x - player.x) + Math.abs(object.y - player.y)
      }))
      .filter((item) => item.distance <= 1)
      .sort((a, b) => a.distance - b.distance)[0];

    if (!nearby) {
      showMessage(t().noObject);
      checkVision();
      updateUI();
      render();
      return;
    }

    completeObject(nearby.object);
    checkVision();
    updateUI();
    render();
  }

  function completeObject(object) {
    if (object.done) {
      showMessage(t().alreadyDone);
      return;
    }

    object.done = true;
    const meta = OBJECT_META[object.code];
    stats.kindness = clamp(stats.kindness + meta.kindness);
    stats.trust = clamp(stats.trust + meta.trust);
    stats.curse = clamp(stats.curse - meta.curse);
    stats.energy = clamp(stats.energy - 8);
    stats.fear = clamp(stats.fear - 6);
    showMessage(OBJECT_COPY[lang][object.type].done, "success");
    burstAt(object.x, object.y);
    showReward(meta.kindness);

    if (allObjectivesDone()) {
      setTimeout(() => {
        if (mode === "playing") showMessage(lang === "zh" ? "今晚的善意完成了。去月门离开吧。" : "Tonight's kindness is done. Leave through the moon gate.");
      }, 850);
    }
  }

  function useCloak() {
    if (mode !== "playing") return;

    if (stats.energy < 30) {
      showMessage(t().cloakLow);
      render();
      return;
    }

    stats.energy = clamp(stats.energy - 30);
    cloakTurns = 4;
    showMessage(t().cloakOn);
    updateUI();
    render();
  }

  function checkVision() {
    const seen = current.villagers.some((villager) => canSee(villager, player.x, player.y));

    if (seen && !isHidden()) {
      stats.fear = clamp(stats.fear + 16);
      stats.trust = clamp(stats.trust - 3);
      showMessage(t().seen);
      checkPanic();
    } else if (seen && isHidden()) {
      showMessage(t().hidden);
    } else if (tileAt(player.x, player.y) === "E" && !allObjectivesDone()) {
      showMessage(t().exitLockedHint);
    } else {
      stats.fear = clamp(stats.fear - 1);
    }
  }

  function checkPanic() {
    if (stats.fear < 100) return;
    mode = "panic";
    dom.overlay.classList.remove("hidden");
    dom.overlayEyebrow.textContent = t().panicTitle;
    dom.overlayTitle.textContent = t().panicTitle;
    dom.overlayBody.textContent = t().panicBody;
    dom.startBtn.textContent = t().restartLevel;
  }

  function canSee(villager, tx, ty) {
    const seenTiles = visionTilesFor(villager);
    return seenTiles.some((tile) => tile.x === tx && tile.y === ty);
  }

  function directionVector(dir) {
    switch (dir) {
      case "^":
        return { dx: 0, dy: -1, px: 1, py: 0 };
      case "v":
        return { dx: 0, dy: 1, px: 1, py: 0 };
      case "<":
        return { dx: -1, dy: 0, px: 0, py: 1 };
      case ">":
      default:
        return { dx: 1, dy: 0, px: 0, py: 1 };
    }
  }

  function visionTilesFor(villager) {
    const vector = directionVector(villager.dir);
    const tiles = [];
    for (let step = 1; step <= villager.range; step += 1) {
      const spread = step <= 2 ? 0 : step <= 4 ? 1 : 2;
      for (let offset = -spread; offset <= spread; offset += 1) {
        const x = villager.x + vector.dx * step + vector.px * offset;
        const y = villager.y + vector.dy * step + vector.py * offset;
        if (!inBounds(x, y) || isWall(x, y)) continue;
        if (lineClear(villager.x, villager.y, x, y)) {
          tiles.push({ x, y });
        }
      }
    }
    return dedupeTiles(tiles);
  }

  function dedupeTiles(tiles) {
    const seen = new Set();
    return tiles.filter((tile) => {
      const key = `${tile.x},${tile.y}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function lineClear(x0, y0, x1, y1) {
    const points = bresenham(x0, y0, x1, y1);
    for (let i = 1; i < points.length - 1; i += 1) {
      if (isWall(points[i].x, points[i].y)) return false;
    }
    return true;
  }

  function bresenham(x0, y0, x1, y1) {
    const points = [];
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let x = x0;
    let y = y0;

    while (true) {
      points.push({ x, y });
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y += sy;
      }
    }

    return points;
  }

  function finishGame() {
    mode = "ending";
    let key = "wanderer";

    if (stats.trust >= 45 && stats.fear < 45) {
      key = "accepted";
    } else if (stats.kindness >= 70 && stats.curse <= 35) {
      key = "unseen";
    } else if (stats.fear >= 75) {
      key = "martyr";
    }

    const ending = t().endings[key];
    dom.overlay.classList.remove("hidden");
    dom.overlayEyebrow.textContent = t().finalEyebrow;
    dom.overlayTitle.textContent = ending.title;
    dom.overlayBody.textContent = ending.body;
    dom.startBtn.textContent = t().finalButton;
    updateUI();
    render();
  }

  function roundedRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function drawTile(x, y, tile) {
    const px = x * TILE;
    const py = y * TILE;

    if (tile === "#") {
      const gradient = ctx.createLinearGradient(px, py, px + TILE, py + TILE);
      gradient.addColorStop(0, "#2c2930");
      gradient.addColorStop(1, "#151319");
      ctx.fillStyle = gradient;
      roundedRect(ctx, px + 2, py + 2, TILE - 4, TILE - 4, 5);
      ctx.fill();
      ctx.fillStyle = "rgba(255,239,210,0.06)";
      ctx.fillRect(px + 8, py + 9, 12, 3);
      ctx.fillRect(px + 22, py + 24, 10, 3);
      return;
    }

    if (tile === "H") {
      ctx.fillStyle = "#121724";
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = "rgba(145,185,201,0.18)";
      ctx.beginPath();
      ctx.arc(px + 20, py + 22, 12 + Math.sin(animationTime / 20 + x) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(216,173,98,0.08)";
      ctx.strokeRect(px + 6, py + 6, TILE - 12, TILE - 12);
      return;
    }

    if (tile === "E") {
      ctx.fillStyle = "#101018";
      ctx.fillRect(px, py, TILE, TILE);
      const pulse = 0.55 + Math.sin(animationTime / 16) * 0.18;
      ctx.strokeStyle = `rgba(216,173,98,${pulse})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px + 20, py + 20, 13, Math.PI * 0.2, Math.PI * 1.8);
      ctx.stroke();
      ctx.fillStyle = "rgba(145,185,201,0.16)";
      ctx.beginPath();
      ctx.arc(px + 20, py + 20, 9, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    ctx.fillStyle = (x + y) % 2 === 0 ? "#141116" : "#100e13";
    ctx.fillRect(px, py, TILE, TILE);
    ctx.fillStyle = "rgba(255,239,210,0.024)";
    ctx.fillRect(px + 4, py + 4, 3, 3);
  }

  function drawGrid() {
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        drawTile(x, y, tileAt(x, y));
      }
    }

    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x += 1) {
      ctx.beginPath();
      ctx.moveTo(x * TILE, 0);
      ctx.lineTo(x * TILE, ROWS * TILE);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y += 1) {
      ctx.beginPath();
      ctx.moveTo(0, y * TILE);
      ctx.lineTo(COLS * TILE, y * TILE);
      ctx.stroke();
    }
  }

  function drawVision() {
    if (!current) return;
    ctx.save();
    ctx.fillStyle = "rgba(184, 62, 81, 0.16)";
    current.villagers.forEach((villager) => {
      visionTilesFor(villager).forEach((tile) => {
        ctx.fillRect(tile.x * TILE + 2, tile.y * TILE + 2, TILE - 4, TILE - 4);
      });
    });
    ctx.restore();
  }

  function drawCheckMark(px, py) {
    ctx.strokeStyle = "#9cc7a7";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(px - 8, py + 1);
    ctx.lineTo(px - 2, py + 8);
    ctx.lineTo(px + 10, py - 9);
    ctx.stroke();
  }

  function drawObjectArt(object, px, py) {
    ctx.save();
    ctx.translate(px, py);
    ctx.strokeStyle = "#d8ad62";
    ctx.fillStyle = "#d8ad62";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (object.type === "child") {
      ctx.fillStyle = "#d1b88d";
      ctx.beginPath();
      ctx.arc(0, -8, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#6f5961";
      roundedRect(ctx, -6, -1, 12, 17, 5);
      ctx.fill();
      ctx.strokeStyle = "#ffcf7d";
      ctx.beginPath();
      ctx.moveTo(9, -10);
      ctx.lineTo(15, -15);
      ctx.stroke();
    } else if (object.type === "fire") {
      const flame = ctx.createLinearGradient(0, -18, 0, 15);
      flame.addColorStop(0, "#ffcf7d");
      flame.addColorStop(0.5, "#b83e51");
      flame.addColorStop(1, "#32161b");
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.bezierCurveTo(14, -4, 8, 15, 0, 17);
      ctx.bezierCurveTo(-13, 11, -10, -4, 0, -18);
      ctx.fill();
    } else if (object.type === "well") {
      ctx.strokeStyle = "#91b9c9";
      ctx.fillStyle = "#1a2025";
      roundedRect(ctx, -14, -7, 28, 20, 5);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#ad5c8a";
      ctx.beginPath();
      ctx.arc(0, -7, 10, 0, Math.PI);
      ctx.stroke();
    } else if (object.type === "bridge") {
      ctx.strokeStyle = "#b78655";
      for (let i = -12; i <= 12; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i, -12);
        ctx.lineTo(i + 2, 13);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(-16, -4);
      ctx.lineTo(16, -6);
      ctx.moveTo(-16, 7);
      ctx.lineTo(16, 5);
      ctx.stroke();
    } else if (object.type === "sheep") {
      ctx.fillStyle = "#c9c4b2";
      [-8, 0, 8].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, 0, 8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "#75636d";
      ctx.beginPath();
      ctx.arc(13, -3, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (object.type === "wolf") {
      ctx.fillStyle = "#231721";
      ctx.beginPath();
      ctx.moveTo(-15, 11);
      ctx.lineTo(-10, -8);
      ctx.lineTo(-1, -14);
      ctx.lineTo(9, -8);
      ctx.lineTo(16, 10);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#b83e51";
      ctx.fillRect(-6, -4, 4, 3);
      ctx.fillRect(5, -4, 4, 3);
    } else {
      ctx.strokeStyle = "#d8ad62";
      ctx.beginPath();
      ctx.moveTo(0, -17);
      ctx.lineTo(0, -6);
      ctx.stroke();
      ctx.fillStyle = "#d8ad62";
      ctx.beginPath();
      ctx.arc(0, 2, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#151018";
      ctx.fillRect(-9, -8, 18, 11);
      ctx.strokeStyle = "#ffcf7d";
      ctx.beginPath();
      ctx.moveTo(-7, 15);
      ctx.lineTo(7, 15);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawObjects() {
    current.objects.forEach((object) => {
      const px = object.x * TILE + TILE / 2;
      const py = object.y * TILE + TILE / 2;

      ctx.save();
      ctx.globalAlpha = object.done ? 0.42 : 1;
      ctx.fillStyle = object.done ? "rgba(156,199,167,0.14)" : "rgba(216,173,98,0.13)";
      ctx.beginPath();
      ctx.arc(px, py, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = object.done ? "rgba(156,199,167,0.48)" : "rgba(216,173,98,0.42)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (object.done) {
        drawCheckMark(px, py);
      } else {
        drawObjectArt(object, px, py + 1);
      }
      ctx.restore();
    });
  }

  function drawVillagers() {
    current.villagers.forEach((villager) => {
      const px = villager.x * TILE;
      const py = villager.y * TILE;

      ctx.save();
      ctx.translate(px + TILE / 2, py + TILE / 2);
      ctx.fillStyle = "#c9a77a";
      ctx.beginPath();
      ctx.arc(0, -5, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#51454c";
      roundedRect(ctx, -9, 3, 18, 18, 5);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 207, 125, 0.42)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, -5, 11, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#ffcf7d";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const arrow = villager.dir === "^" ? "▲" : villager.dir === "v" ? "▼" : villager.dir === "<" ? "◀" : "▶";
      ctx.fillText(arrow, 0, -20);
      ctx.restore();
    });
  }

  function drawPlayer() {
    const px = player.x * TILE + TILE / 2;
    const py = player.y * TILE + TILE / 2;
    const hidden = isHidden();

    ctx.save();
    ctx.globalAlpha = hidden ? 0.64 : 1;

    if (cloakTurns > 0) {
      ctx.strokeStyle = "rgba(145,185,201,0.72)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(px, py, 20 + Math.sin(animationTime / 8) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(px, py + 18, 19, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#100812";
    ctx.beginPath();
    ctx.moveTo(px - 14, py - 11);
    ctx.lineTo(px - 25, py - 26);
    ctx.lineTo(px - 8, py - 18);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 14, py - 11);
    ctx.lineTo(px + 25, py - 26);
    ctx.lineTo(px + 8, py - 18);
    ctx.closePath();
    ctx.fill();

    const bodyGradient = ctx.createRadialGradient(px, py - 8, 5, px, py, 23);
    bodyGradient.addColorStop(0, "#2c222f");
    bodyGradient.addColorStop(0.55, "#151018");
    bodyGradient.addColorStop(1, "#08060b");
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(px, py + 3, 15, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1a1023";
    ctx.beginPath();
    ctx.arc(px, py - 5, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#b83e51";
    ctx.fillRect(px - 8, py - 7, 4, 3);
    ctx.fillRect(px + 4, py - 7, 4, 3);

    ctx.strokeStyle = "rgba(216,173,98,0.48)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(px, py - 13, 17, Math.PI * 1.16, Math.PI * 1.84);
    ctx.stroke();

    ctx.fillStyle = "#d8ad62";
    ctx.beginPath();
    ctx.arc(px - 2, py + 7, 3, 0, Math.PI * 2);
    ctx.arc(px + 3, py + 7, 3, 0, Math.PI * 2);
    ctx.moveTo(px - 5, py + 9);
    ctx.lineTo(px + 8, py + 9);
    ctx.lineTo(px + 1, py + 17);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawHUDOnCanvas() {
    ctx.save();
    ctx.fillStyle = "rgba(8,7,10,0.58)";
    roundedRect(ctx, 10, 10, 172, 34, 7);
    ctx.fill();
    ctx.strokeStyle = "rgba(216,173,98,0.2)";
    ctx.stroke();
    ctx.fillStyle = "#f7f0e6";
    ctx.font = "600 14px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const hiddenText = lang === "zh" ? "隐藏" : "Hidden";
    const visibleText = lang === "zh" ? "可见" : "Visible";
    ctx.fillText(`${isHidden() ? hiddenText : visibleText} · ${cloakTurns > 0 ? cloakTurns : 0}`, 24, 27);

    if (allObjectivesDone()) {
      ctx.fillStyle = "rgba(156,199,167,0.9)";
      roundedRect(ctx, canvas.width - 196, 10, 184, 34, 7);
      ctx.fill();
      ctx.fillStyle = "#0b1711";
      ctx.font = "800 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(lang === "zh" ? "去月门离开" : "Go to moon gate", canvas.width - 104, 27);
    }
    ctx.restore();
  }

  function drawSuccessEffects() {
    if (successPulse > 0) {
      const alpha = successPulse / 24;
      ctx.save();
      ctx.fillStyle = `rgba(255, 207, 125, ${0.1 * alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = `rgba(255, 207, 125, ${0.52 * alpha})`;
      ctx.lineWidth = 5;
      roundedRect(ctx, 8, 8, canvas.width - 16, canvas.height - 16, 8);
      ctx.stroke();
      ctx.restore();
      successPulse -= 1;
    }

    if (!particles.length) return;

    ctx.save();
    particles.forEach((particle) => {
      const alpha = particle.life / 35;
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2.4 + alpha * 2.6, 0, Math.PI * 2);
      ctx.fill();
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.dy += 0.035;
      particle.life -= 1;
    });
    ctx.restore();
    particles = particles.filter((particle) => particle.life > 0);
  }

  function drawRewardText() {
    if (rewardTimer <= 0) return;

    const alpha = Math.min(1, rewardTimer / 16);
    const lift = (44 - rewardTimer) * 0.42;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 30px sans-serif";
    ctx.fillStyle = "rgba(8,7,10,0.74)";
    roundedRect(ctx, canvas.width / 2 - 112, 56 - lift, 224, 54, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,207,125,0.72)";
    ctx.stroke();
    ctx.fillStyle = "#ffdf91";
    ctx.fillText(rewardText, canvas.width / 2, 84 - lift);
    ctx.restore();
    rewardTimer -= 1;
  }

  function render() {
    if (!current) return;

    animationTime += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawVision();
    drawObjects();
    drawVillagers();
    drawPlayer();
    drawSuccessEffects();
    drawRewardText();
    drawHUDOnCanvas();
  }

  function loop() {
    render();
    requestAnimationFrame(loop);
  }

  function handleKey(event) {
    const key = event.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "w", "a", "s", "d", "e"].includes(key)) {
      event.preventDefault();
    }

    if (mode === "title" || mode === "ending") {
      if (key === " " || key === "enter") startGame();
      return;
    }

    if (mode === "panic") {
      if (key === " " || key === "enter") resetLevelAfterPanic();
      return;
    }

    if (key === "arrowup" || key === "w") tryMove(0, -1);
    if (key === "arrowdown" || key === "s") tryMove(0, 1);
    if (key === "arrowleft" || key === "a") tryMove(-1, 0);
    if (key === "arrowright" || key === "d") tryMove(1, 0);
    if (key === " ") interact();
    if (key === "e") useCloak();
  }

  function mobileAction(action) {
    if (action === "up") tryMove(0, -1);
    if (action === "down") tryMove(0, 1);
    if (action === "left") tryMove(-1, 0);
    if (action === "right") tryMove(1, 0);
    if (action === "interact") interact();
    if (action === "cloak") useCloak();
    canvas.focus();
  }

  function bindEvents() {
    dom.langZh.addEventListener("click", () => setLang("zh"));
    dom.langEn.addEventListener("click", () => setLang("en"));
    dom.restartBtn.addEventListener("click", resetGame);
    dom.startBtn.addEventListener("click", () => {
      if (mode === "panic") resetLevelAfterPanic();
      else startGame();
    });

    window.addEventListener("keydown", handleKey);

    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => mobileAction(button.dataset.action));
    });
  }

  function init() {
    current = parseLevel(0);
    player = { ...current.start };
    bindEvents();
    setLang(lang);
    applyStaticText();
    showMessage(t().ready);
    updateUI();
    dom.overlay.classList.remove("hidden");
    loop();
  }

  init();
})();

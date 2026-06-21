/**
 * 偶像养成事务所 — 全部数值规则集中配置
 * 调整平衡性时只需修改此文件
 */
export const GAME_CONFIG = {
  // ── 胜利 / 失败条件 ──
  victory: {
    targetGroups: 3,        // 需培养出道组合数
    totalDays: 1095,        // 3 年（天）
    requirePositiveProfit: true,
  },

  // ── 初始资源 ──
  initial: {
    money: 80000,
    fans: 200,
    traineeCount: 5,
    statMin: 18,
    statMax: 42,
    fatigue: 10,
    stress: 8,
  },

  // ── 五维属性键名 ──
  stats: ['vocal', 'dance', 'rap', 'looks', 'charm'],
  statLabels: {
    vocal: '唱功',
    dance: '舞蹈',
    rap: '说唱',
    looks: '颜值',
    charm: '魅力',
  },

  // ── 日程活动 ──
  activities: {
    vocal: {
      label: '声乐课',
      icon: '🎤',
      statGain: { vocal: [4, 7] },
      fatigue: [10, 14],
      stress: [2, 4],
      moneyCost: 400,
      requiresTraining: true,
    },
    dance: {
      label: '舞蹈课',
      icon: '💃',
      statGain: { dance: [4, 7] },
      fatigue: [12, 16],
      stress: [2, 4],
      moneyCost: 400,
      requiresTraining: true,
    },
    rap: {
      label: '说唱课',
      icon: '🎧',
      statGain: { rap: [4, 7] },
      fatigue: [10, 14],
      stress: [3, 5],
      moneyCost: 400,
      requiresTraining: true,
    },
    physical: {
      label: '体能训练',
      icon: '🏋️',
      statGain: { dance: [1, 3], looks: [0, 1] },
      fatigue: [6, 10],
      stress: [-2, 0],
      moneyCost: 250,
      requiresTraining: true,
    },
    rest: {
      label: '休息',
      icon: '😴',
      statGain: {},
      fatigue: [-28, -18],
      stress: [-10, -5],
      moneyCost: 0,
      requiresTraining: false,
    },
    pr: {
      label: '公关活动',
      icon: '📸',
      statGain: { charm: [2, 4], looks: [1, 3] },
      fatigue: [5, 8],
      stress: [6, 14],
      fansGain: [80, 250],
      moneyCost: 1200,
      requiresTraining: false,
    },
  },

  // ── 疲劳 / 压力阈值 ──
  thresholds: {
    fatigueExhausted: 75,   // 训练效果减半
    fatigueCollapse: 92,    // 强制休息
    stressHigh: 65,         // 训练效果 -20%
    stressBreakdown: 88,    // 当天无法训练
    statCap: 100,
  },

  // ── 每日运营成本 ──
  dailyCosts: {
    baseOperatingCost: 600,
    perTraineeCost: 250,
    perDebutedCost: 800,
    perGroupCost: 500,
  },

  // ── 周末内部评级 ──
  rating: {
    interval: 7,
    debutScoreThreshold: 58,  // 综合评分达标可出道
    minGroupSize: 2,
    maxGroupSize: 5,
    scoreWeights: {
      vocal: 0.22,
      dance: 0.22,
      rap: 0.16,
      looks: 0.2,
      charm: 0.2,
    },
  },

  // ── 单曲发行 ──
  single: {
    creationCost: 15000,
    baseSales: 800,
    statWeight: 0.45,
    fansWeight: 0.35,
    charmWeight: 0.2,
    revenuePerSale: 6,
    cooldownDays: 30,
  },

  // ── 练习生关系 ──
  relationships: {
    min: -100,
    max: 100,
    synergyThreshold: 55,       // 默契线
    competitionThreshold: -35,    // 竞争线
    synergyBonus: 0.25,           // 默契训练加成
    competitionStress: [12, 22],
    dailyDrift: [-3, 3],
    trainingTogether: [4, 9],
    statGapCompetition: 18,
    initialRange: [-15, 25],
  },

  // ── 随机事件 ──
  events: {
    dailyChance: 0.18,
    types: {
      negative_news: {
        label: '负面新闻',
        weight: 22,
        fansLoss: [150, 600],
        stressGain: [8, 18],
        description: '媒体曝出练习生训练期间发生冲突，粉丝舆论下滑。',
      },
      poaching: {
        label: '挖角危机',
        weight: 14,
        successChance: 0.28,
        description: '竞争对手试图挖走你旗下最有潜力的练习生！',
      },
      illness: {
        label: '生病',
        weight: 20,
        duration: [2, 4],
        statDecay: [1, 3],
        stressGain: [5, 10],
        description: '一名练习生身体不适，需要休养。',
      },
      inspiration: {
        label: '灵感爆发',
        weight: 22,
        statBoost: [6, 14],
        description: '一名练习生突然迸发出创作灵感，能力大幅提升！',
      },
      fan_surge: {
        label: '粉丝暴涨',
        weight: 22,
        fansGain: [300, 900],
        description: '一段练习室花絮意外走红，粉丝数激增！',
      },
    },
  },

  // ── 练习生名字池 ──
  names: [
    '林星遥', '苏晚晴', '陈予安', '顾念初', '沈知夏',
    '江月白', '陆清欢', '唐小满', '许未央', '韩鹿鸣',
    '方念慈', '宋时雨', '叶知秋', '周慕青', '赵星河',
  ],

  // ── 练习生日记 ──
  diary: {
    dailyChance: 0.65,
    maxPerDay: 2,
    moods: {
      happy: { label: '开心', icon: '😊', threshold: { stressMax: 30, fatigueMax: 40 } },
      excited: { label: '兴奋', icon: '🤩', threshold: { stressMax: 25, fatigueMax: 35, statGainMin: 5 } },
      calm: { label: '平静', icon: '😌', threshold: { stressMax: 45, fatigueMax: 55 } },
      tired: { label: '疲惫', icon: '😩', threshold: { fatigueMin: 60 } },
      stressed: { label: '压力大', icon: '😰', threshold: { stressMin: 55 } },
      frustrated: { label: '失落', icon: '😞', threshold: { stressMin: 65, statGainMax: 1 } },
      motivated: { label: '有动力', icon: '💪', threshold: { stressMax: 35, fatigueMax: 45, synergy: true } },
      competitive: { label: '好胜', icon: '🔥', threshold: { competition: true } },
      close: { label: '亲近', icon: '💕', threshold: { relationMin: 60 } },
      lonely: { label: '孤独', icon: '😔', threshold: { relationMax: -20 } },
    },
    templates: {
      training: [
        { activity: 'vocal', mood: 'happy', text: '今天的声乐课很顺利，高音部分找到了感觉！' },
        { activity: 'vocal', mood: 'excited', text: '老师夸我进步很大！感觉自己离出道又近了一步~' },
        { activity: 'vocal', mood: 'tired', text: '练了一整天的气息控制，嗓子有点哑了...' },
        { activity: 'vocal', mood: 'frustrated', text: '转音总是练不好，是不是我真的不适合唱歌？' },
        { activity: 'dance', mood: 'happy', text: '今天的舞蹈动作终于记住了，跳起来很流畅！' },
        { activity: 'dance', mood: 'excited', text: '编舞老师说我的舞台感很好，太开心了！' },
        { activity: 'dance', mood: 'tired', text: '体能消耗太大，跳完最后一支舞差点站不稳...' },
        { activity: 'dance', mood: 'stressed', text: '队友们都跳得那么好，我却总是跟不上节奏...' },
        { activity: 'rap', mood: 'happy', text: '今天的flow练得很顺，韵脚也押得很漂亮！' },
        { activity: 'rap', mood: 'excited', text: '第一次尝试即兴创作，居然被老师认可了！' },
        { activity: 'rap', mood: 'frustrated', text: '快嘴部分总是咬字不清，还需要更多练习。' },
        { activity: 'physical', mood: 'tired', text: '体能训练真的好累，但是为了舞台一定要坚持！' },
        { activity: 'physical', mood: 'motivated', text: '虽然很累，但感觉身体素质在明显提升！' },
        { activity: 'pr', mood: 'excited', text: '今天的采访很顺利，希望能圈到更多粉丝~' },
        { activity: 'pr', mood: 'stressed', text: '面对镜头还是会紧张，表情管理还要加强。' },
        { activity: 'rest', mood: 'calm', text: '难得的休息日，好好放松一下，养精蓄锐。' },
        { activity: 'rest', mood: 'happy', text: '今天睡了个懒觉，感觉精力恢复了不少！' },
      ],
      relationship: [
        { type: 'synergy', text: '和{partner}一起训练特别有默契，效率超高！' },
        { type: 'improve', text: '感觉和{partner}的关系变好了，我们聊了很多。' },
        { type: 'close', text: '{partner}今天帮了我很多，真的很感谢TA。' },
        { type: 'competition', text: '{partner}真的很强，我也要更加努力才行！' },
        { type: 'conflict', text: '和{partner}在训练中有些不愉快，希望能快点和好。' },
        { type: 'lonely', text: '大家好像都有自己的小圈子，我有点融不进去...' },
      ],
      emotion: [
        { type: 'inspired', text: '突然有了创作灵感，赶紧记在小本子上！' },
        { type: 'anxious', text: '不知道什么时候才能出道，有点焦虑...' },
        { type: 'grateful', text: '感谢社长一直以来的栽培，我一定不会辜负期望！' },
        { type: 'nostalgic', text: '想起了刚进事务所的日子，时间过得真快啊。' },
        { type: 'determined', text: '今天起要加倍努力，一定要站上更大的舞台！' },
        { type: 'sick', text: '身体不太舒服，希望快点好起来，不想落下训练。' },
      ],
      event: [
        { type: 'negative_news', text: '看到了那些负面新闻，心里很难受...' },
        { type: 'poaching', text: '有其他公司想挖我，但我还是想留在这里。' },
        { type: 'illness', text: '生病了，需要休息几天，希望不要落下太多进度。' },
        { type: 'inspiration', text: '灵感爆发的感觉真好！能力又提升了~' },
        { type: 'fan_surge', text: '我们的练习视频上热门了！粉丝涨了好多，好开心！' },
        { type: 'rating_good', text: '这次评级成绩不错，继续保持！' },
        { type: 'rating_bad', text: '评级结果不太理想，下次一定要加油。' },
        { type: 'debut', text: '出道了！！！梦想成真的感觉，太不真实了！' },
        { type: 'single', text: '我们的单曲发行了！希望大家会喜欢~' },
      ],
    },
  },

  // ── 存档 ──
  storage: {
    savesKey: 'idol-agency-saves-v1',
    themeKey: 'idol-agency-theme',
    maxSlots: 5,
  },
}

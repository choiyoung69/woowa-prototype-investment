import type { Scenario } from "@/lib/scenario-engine";

const disclaimer =
  "이 시나리오는 1997년 IMF 외환위기를 참고해 각색한 가상 데이터입니다. 실제 지수·환율·기사 원문과는 다릅니다.";

const unitLabel = "가상 지수 추종 ETF";

const pivotEvent = {
  date: "1997-11-21",
  label: "IMF 구제금융 요청",
};

const workerConcepts = [
  {
    title: "기업 부채비율",
    description:
      "회사가 빚에 얼마나 의존하는지 보여주는 지표예요. 위기 때는 빚이 많은 기업부터 구조조정 압박을 크게 받습니다.",
  },
  {
    title: "구조조정",
    description:
      "부실한 사업과 인력을 줄여 기업을 살리는 과정이에요. 투자자는 주가뿐 아니라 고용과 소득 안정성도 함께 고려해야 합니다.",
  },
  {
    title: "분산 투자",
    description:
      "한 회사나 한 업종에 돈을 몰아넣지 않는 방식이에요. 직장인은 월급과 투자 자산이 같은 경기 흐름에 노출될 수 있어 더 중요합니다.",
  },
];

const studentConcepts = [
  {
    title: "환율",
    description:
      "원화와 달러의 교환 비율이에요. 환율이 급등하면 유학비, 수입물가, 기업 비용까지 같이 흔들릴 수 있습니다.",
  },
  {
    title: "기회비용",
    description:
      "한 선택을 하면서 포기하게 되는 다른 선택의 가치예요. 전 재산이 작을수록 투자 손실은 생활비와 준비 기간에 직접 영향을 줍니다.",
  },
  {
    title: "안전자산",
    description:
      "위기 때 상대적으로 가치가 덜 흔들린다고 여겨지는 자산이에요. 현금 보유 역시 중요한 선택지가 될 수 있습니다.",
  },
];

const ownerConcepts = [
  {
    title: "기준금리",
    description:
      "중앙은행이 정하는 대표 금리예요. 금리가 오르면 대출 이자 부담이 커져 자영업자의 현금흐름에 직접 영향을 줍니다.",
  },
  {
    title: "현금흐름",
    description:
      "들어오고 나가는 돈의 흐름이에요. 매출이 흔들릴 때는 수익률보다 버틸 수 있는 현금이 더 중요할 수 있습니다.",
  },
  {
    title: "소비 위축",
    description:
      "불안이 커지면 사람들이 지출을 줄이는 현상이에요. 가게 매출과 주식시장 모두에 압박으로 작용합니다.",
  },
];

const workerKnowledge = {
  summary: ["환율 급등", "기업 부실 확산", "고용·투자 동시 위험"],
  keywords: [
    {
      term: "부채비율",
      meaning: "빚 의존도",
      detail: "회사가 자기 돈보다 빚으로 얼마나 버티는지 보는 지표예요.",
      pastSignal: "1997년에는 빚이 많은 기업부터 자금줄이 막혔어요.",
      todaySignal: "고금리·고환율 때도 이자와 원가 부담이 먼저 커져요.",
    },
    {
      term: "구조조정",
      meaning: "비용·인력 축소",
      detail: "회사가 살아남기 위해 사업, 비용, 인력을 줄이는 과정이에요.",
      pastSignal: "IMF 요청 이후 기업 매각과 감원이 빠르게 번졌어요.",
      todaySignal: "경기가 식으면 채용 축소와 조직 개편 뉴스가 늘어요.",
    },
    {
      term: "분산투자",
      meaning: "위험 나누기",
      detail: "월급과 투자금이 같은 위험에 묶이지 않게 나누는 방식이에요.",
      pastSignal: "회사도 흔들리고 주식도 빠지면 한 번에 타격을 받아요.",
      todaySignal: "내 직업이 민감한 업종이면 투자 자산은 더 분리해 봐야 해요.",
    },
  ],
  currentParallels: [
    {
      title: "고환율은 기업 원가와 고용에도 부담",
      summary: "2026년에도 고환율이 수입 원가와 기업 비용을 자극한다는 분석이 나왔어요.",
      source: "KB의 생각 · 2026 환율 전망",
      href: "https://kbthink.com/investment/issues/2026-krw-usd-outlook.html",
    },
  ],
};

const studentKnowledge = {
  summary: ["채용 냉각", "생활비 압박", "비상금 우선순위"],
  keywords: [
    {
      term: "환율",
      meaning: "달러 가격",
      detail: "원화로 달러를 살 때 드는 가격이에요.",
      pastSignal: "1997년 환율 급등은 유학비, 수입물가, 기업 비용을 흔들었어요.",
      todaySignal: "고환율은 해외 결제, 여행비, 수입 제품 가격에도 바로 보여요.",
    },
    {
      term: "기회비용",
      meaning: "포기한 선택의 가치",
      detail: "투자에 돈을 쓰면 생활비나 취업 준비 기간을 포기할 수 있어요.",
      pastSignal: "위기 때 성급한 매수는 버틸 시간을 줄였어요.",
      todaySignal: "취업 시장이 차가울수록 현금 여유가 선택지를 넓혀요.",
    },
    {
      term: "비상금",
      meaning: "버틸 시간",
      detail: "소득이 끊겨도 생활을 유지하게 해주는 현금이에요.",
      pastSignal: "IMF 이후 채용이 얼어붙으면서 현금의 가치가 커졌어요.",
      todaySignal: "청년 고용이 둔화될 때는 수익률보다 생존 기간이 먼저예요.",
    },
  ],
  currentParallels: [
    {
      title: "청년 취업자 감소가 장기화",
      summary: "2026년 6월 청년층 취업자가 전년 대비 19.7만명 줄었다는 보도가 있었어요.",
      source: "한국경제 · 2026.07.15",
      href: "https://www.hankyung.com/article/2026071576421",
    },
  ],
};

const ownerKnowledge = {
  summary: ["고금리 부담", "소비 위축", "운영자금 방어"],
  keywords: [
    {
      term: "현금흐름",
      meaning: "들어오고 나가는 돈",
      detail: "매출에서 재료비, 임대료, 인건비, 이자를 빼고 남는 흐름이에요.",
      pastSignal: "1998년에는 매출보다 버틸 현금이 더 중요한 국면이었어요.",
      todaySignal: "매출이 조금 늘어도 비용이 더 늘면 실제로는 더 힘들 수 있어요.",
    },
    {
      term: "이자 부담",
      meaning: "대출 비용",
      detail: "대출을 유지하기 위해 매달 내야 하는 비용이에요.",
      pastSignal: "고금리는 사업자금과 투자 판단을 동시에 압박했어요.",
      todaySignal: "연체 뉴스가 늘면 대출 상환 부담이 커졌다는 신호예요.",
    },
    {
      term: "소비 위축",
      meaning: "손님 지출 감소",
      detail: "사람들이 불안해서 외식, 쇼핑, 여행 지출을 줄이는 현상이에요.",
      pastSignal: "위기 때 손님이 줄면 주가 반등보다 가게 생존이 먼저였어요.",
      todaySignal: "내수 둔화 뉴스는 자영업 매출과 투자심리를 같이 흔들어요.",
    },
  ],
  currentParallels: [
    {
      title: "자영업자 연체 빚 증가",
      summary: "2026년 1분기 개인사업자 대출 연체가 다시 늘고 영업이익률도 악화됐어요.",
      source: "한국경제 · 2026.06.23",
      href: "https://www.hankyung.com/article/2026062316327",
    },
  ],
};

const workerDays = [
  {
    date: "1997-11-19",
    price: 10000,
    open: 10200,
    headline: "환율이 심상치 않게 오르고 있지만, 아직 많은 사람들이 위기를 실감하지 못하고 있어요.",
    articles: [
      {
        title: "원달러 환율, 사상 최고치 넘보며 연일 급등",
        summary: "외환 방어에 나선 정부의 노력에도 환율 상승세가 꺾이지 않고 있습니다.",
        source: "가상경제일보",
      },
      {
        title: "종금사·은행권 부실 우려 확산",
        summary: "일부 금융기관의 부실채권 문제가 시장의 불안 요인으로 떠올랐습니다.",
        source: "마켓나우",
      },
    ],
  },
  {
    date: "1997-11-21",
    price: 9000,
    headline: "정부가 결국 IMF에 구제금융을 공식 요청했습니다.",
    articles: [
      {
        title: "정부, IMF에 구제금융 공식 요청",
        summary: "외환보유고 고갈 위기 속에 정부가 결국 IMF의 문을 두드렸습니다.",
        source: "가상경제일보",
      },
      {
        title: "코스피, 사흘 연속 급락",
        summary: "국가 신인도 추락 우려에 투자심리가 극도로 위축됐습니다.",
        source: "데일리인베스트",
      },
    ],
  },
  {
    date: "1997-11-24",
    price: 7650,
    headline: "환율이 하루 새 또 사상 최고치를 경신하며 원화 가치가 폭락하고 있습니다.",
    articles: [
      {
        title: "원달러 환율, 또 사상 최고치",
        summary: "원화 가치가 가파르게 떨어지며 수입물가 부담이 커지고 있습니다.",
        source: "글로벌마켓워치",
      },
      {
        title: "대기업 줄도산 우려 확산",
        summary: "자금난에 몰린 기업들의 부도설이 잇따라 시장을 흔들고 있습니다.",
        source: "마켓나우",
      },
    ],
  },
  {
    date: "1997-12-03",
    price: 6500,
    headline: "IMF와 구제금융 합의안에 서명했지만, 시장은 냉담한 반응을 보이고 있습니다.",
    articles: [
      {
        title: "정부, IMF와 구제금융 합의안 최종 서명",
        summary: "대규모 자금 지원을 받는 대신 강도 높은 구조조정을 약속했습니다.",
        source: "가상경제일보",
      },
      {
        title: "시장, 합의 소식에도 냉담",
        summary: "구조조정에 따른 실물경기 위축 우려가 더 크게 작용했습니다.",
        source: "데일리인베스트",
      },
    ],
  },
  {
    date: "1998-01-14",
    price: 7150,
    headline: "전 국민이 참여한 금 모으기 운동 소식에 시장이 반등했습니다.",
    articles: [
      {
        title: "전 국민 금 모으기 운동 확산",
        summary: "나라 빚을 갚기 위해 장롱 속 금붙이를 내놓는 시민들의 참여가 이어지고 있습니다.",
        source: "가상경제일보",
      },
      {
        title: "코스피, 저가 매수세에 반등",
        summary: "패닉셀이 진정되며 지수가 모처럼 오름세를 보였습니다.",
        source: "마켓나우",
      },
    ],
  },
];

const shared = {
  disclaimer,
  unitLabel,
  pivotEvent,
  checkpointAfterDay: 3,
};

const studentDays = [
  {
    date: "1997-12-03",
    price: 6500,
    open: 7000,
    headline: "IMF 합의가 발표됐지만, 취업 시장에는 구조조정의 그림자가 드리우기 시작했습니다.",
    articles: [
      {
        title: "정부, IMF와 구제금융 합의안 최종 서명",
        summary: "강도 높은 구조조정과 긴축 정책이 예고되며 기업들의 비용 절감 압력이 커졌습니다.",
        source: "가상경제일보",
      },
      {
        title: "대기업, 신입 채용 계획 전면 재검토",
        summary: "채용 설명회를 연기하거나 하반기 공채 규모를 줄이는 기업이 늘고 있습니다.",
        source: "잡마켓데일리",
      },
    ],
  },
  {
    date: "1997-12-12",
    price: 6100,
    headline: "환율 급등으로 생활비와 취업 준비 비용이 동시에 오를 수 있다는 불안이 커집니다.",
    articles: [
      {
        title: "원달러 환율 1,700원대 진입, 외화 결제 부담 확대",
        summary: "어학시험, 해외 자료, 수입 전자기기 비용까지 올라 청년층 부담이 커지고 있습니다.",
        source: "청년경제노트",
      },
      {
        title: "취업 준비생, 생활비 방어가 먼저인가",
        summary: "투자 손실보다 준비 기간이 길어졌을 때 버틸 현금이 더 중요하다는 조언이 나옵니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1997-12-24",
    price: 5600,
    headline: "기업 구조조정이 본격화되며 신입 채용 문이 더 좁아질 수 있다는 전망이 나옵니다.",
    articles: [
      {
        title: "금융권·대기업 희망퇴직 검토 확산",
        summary: "기존 인력 감축이 거론되면서 신규 채용 여력도 줄어들 수 있다는 분석입니다.",
        source: "잡마켓데일리",
      },
      {
        title: "주가 급락은 기회인가, 비상금 훼손인가",
        summary: "소득이 없는 투자자는 저가 매수보다 현금 소진 속도를 먼저 봐야 한다는 지적입니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1998-01-14",
    price: 6350,
    headline: "금 모으기 운동과 시장 반등 소식에 불안 심리가 일부 완화되고 있습니다.",
    articles: [
      {
        title: "금 모으기 운동 확산, 위기 극복 기대감",
        summary: "국민 참여 캠페인이 확산되며 시장 심리에도 작은 변화가 나타났습니다.",
        source: "가상경제일보",
      },
      {
        title: "회복 기대감에도 채용 시장은 여전히 냉각",
        summary: "지수가 반등해도 기업의 신규 채용 계획이 바로 회복되기는 어렵다는 전망입니다.",
        source: "잡마켓데일리",
      },
    ],
  },
  {
    date: "1998-02-02",
    price: 6900,
    headline: "시장은 반등을 시도하지만, 취준생에게는 투자보다 생존 기간 계산이 중요해졌습니다.",
    articles: [
      {
        title: "코스피 반등, 저가 매수세 유입",
        summary: "위기 극복 기대감이 일부 반영되며 지수가 바닥에서 조금씩 회복하고 있습니다.",
        source: "마켓나우",
      },
      {
        title: "취업 준비 기간 장기화 조짐",
        summary: "채용 회복이 늦어질 수 있어 생활비와 투자금을 분리해야 한다는 조언이 나옵니다.",
        source: "머니레슨",
      },
    ],
  },
];

const ownerDays = [
  {
    date: "1997-12-24",
    price: 5600,
    open: 6200,
    headline: "고금리와 소비 위축이 겹치며 자영업자의 운영자금 부담이 현실화되고 있습니다.",
    articles: [
      {
        title: "고금리 장기화 가능성, 개인사업자 이자 부담 커진다",
        summary: "대출 이자가 늘면 매출이 유지돼도 실제 남는 돈은 줄어들 수 있습니다.",
        source: "상권경제",
      },
      {
        title: "연말 소비심리 냉각, 외식업 매출 둔화 조짐",
        summary: "가계가 지출을 줄이며 외식과 소매 업종부터 압박을 받을 수 있다는 전망입니다.",
        source: "생활경제신문",
      },
    ],
  },
  {
    date: "1998-01-14",
    price: 6200,
    headline: "금 모으기 운동으로 시장은 반등하지만, 가게 매출 회복은 아직 더딥니다.",
    articles: [
      {
        title: "금 모으기 운동에 위기 극복 기대감 확산",
        summary: "시장 심리는 일부 회복됐지만 자영업 현장의 비용 부담은 여전히 남아 있습니다.",
        source: "가상경제일보",
      },
      {
        title: "반등장에서 사업자는 얼마까지 투자할 수 있을까",
        summary: "투자 여윳돈과 운영자금을 분리해야 한다는 조언이 나옵니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1998-02-20",
    price: 6600,
    headline: "시장 반등에도 대출 심사와 소비 위축은 계속되어 현금흐름 관리가 중요해졌습니다.",
    articles: [
      {
        title: "은행권, 개인사업자 대출 심사 보수적으로 전환",
        summary: "금융기관이 리스크 관리를 강화하며 추가 대출을 받기 어려워질 수 있습니다.",
        source: "마켓나우",
      },
      {
        title: "상권 매출 회복 지연, 비용 관리 비상",
        summary: "임대료와 인건비 부담은 그대로인데 손님 수 회복은 더딘 상황입니다.",
        source: "상권경제",
      },
    ],
  },
  {
    date: "1998-03-16",
    price: 7050,
    headline: "일부 지표는 회복되지만, 자영업자는 매출 회복보다 버틸 현금을 먼저 계산해야 합니다.",
    articles: [
      {
        title: "지수 반등에도 내수 경기는 아직 냉랭",
        summary: "금융시장이 먼저 회복되더라도 실제 소비 회복까지는 시간이 걸릴 수 있습니다.",
        source: "가상경제일보",
      },
      {
        title: "운영자금 3개월치 확보가 우선이라는 조언",
        summary: "불확실한 시기에는 투자 수익보다 폐업 위험을 낮추는 현금 관리가 핵심입니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1998-05-25",
    price: 7600,
    headline: "금리 부담이 조금씩 완화될 조짐이 보이지만, 매출 회복은 업종별로 크게 갈립니다.",
    articles: [
      {
        title: "자영업 경기, 업종별 회복 속도 차이",
        summary: "생필품과 필수 소비 업종은 버티지만 외식과 선택 소비 업종은 회복이 느립니다.",
        source: "상권경제",
      },
      {
        title: "반등을 따라갈까, 빚부터 줄일까",
        summary: "사업자는 기대수익률과 대출 이자율을 함께 비교해야 한다는 분석입니다.",
        source: "머니레슨",
      },
    ],
  },
];

export const imfCrisisWorkerScenario: Scenario = {
  ...shared,
  id: "imf-crisis-worker",
  title: "IMF 외환위기 · 직장인",
  subtitle: "1997년 11월, 위기 신호가 터질 때 직장인은 어떻게 판단했을까",
  description:
    "IMF 구제금융 요청 전후, 기업 부실과 구조조정 뉴스가 쏟아지는 초기 구간을 체험합니다. 월급과 투자 자산이 같은 경기 위험에 노출될 때의 판단을 연습합니다.",
  startingCash: 10_000_000,
  persona:
    "당신은 대기업에 다니는 32세 직장인입니다. 그동안 모아온 1,000만원으로 막 투자를 시작하려던 참이었어요.",
  learningGoals: [
    "기업 부실 뉴스가 내 직장과 투자 자산에 동시에 미치는 영향 보기",
    "구조조정 우려 속에서 현금과 투자 비중을 나눠 판단하기",
    "월급 안정성에 대한 믿음이 투자 판단을 흐리는지 기록하기",
  ],
  knowledge: workerKnowledge,
  keyConcepts: workerConcepts,
  days: workerDays,
};

export const imfCrisisStudentScenario: Scenario = {
  ...shared,
  id: "imf-crisis-student",
  title: "IMF 외환위기 · 취준생",
  subtitle: "1997년 12월, 채용 시장이 얼어붙을 때 전 재산을 어떻게 지킬까",
  description:
    "IMF 합의 이후 채용 축소와 환율 부담이 커지는 구간을 체험합니다. 투자 기회와 생활비 방어 사이에서 전 재산 300만원의 우선순위를 정해봅니다.",
  startingCash: 3_000_000,
  persona:
    "당신은 이제 막 대학을 졸업하고 취업을 준비 중인 24세 취준생입니다. 아르바이트로 모은 300만원이 전 재산이에요.",
  learningGoals: [
    "환율 상승이 생활비와 취업 준비 비용에 미치는 영향 이해하기",
    "전 재산이 작을 때 투자금과 비상금을 어떻게 구분할지 판단하기",
    "저가 매수 욕심과 현금 방어 사이에서 선택 이유 남기기",
  ],
  knowledge: studentKnowledge,
  keyConcepts: studentConcepts,
  days: studentDays,
};

export const imfCrisisOwnerScenario: Scenario = {
  ...shared,
  id: "imf-crisis-owner",
  title: "IMF 외환위기 · 자영업자",
  subtitle: "1998년 초, 고금리와 소비 위축 속에서 운영자금을 어떻게 지킬까",
  description:
    "위기 직후 시장은 반등을 시도하지만 가게 매출과 대출 부담은 늦게 회복됩니다. 운영자금과 투자금을 분리해 보는 현금흐름 중심 시나리오입니다.",
  startingCash: 20_000_000,
  persona:
    "당신은 작은 식당을 운영하는 45세 자영업자입니다. 가게 운영자금과는 별도로 모아둔 여윳돈 2,000만원을 굴려보려던 참이었어요.",
  learningGoals: [
    "환율과 금리 변화가 원가, 대출, 매출에 미치는 영향 연결하기",
    "운영자금과 투자금을 분리해 위험 감당 범위 정하기",
    "시장 반등보다 사업 현금흐름이 먼저인지 판단하기",
  ],
  knowledge: ownerKnowledge,
  keyConcepts: ownerConcepts,
  days: ownerDays,
};

export const imfCrisisScenarios: Scenario[] = [
  imfCrisisWorkerScenario,
  imfCrisisStudentScenario,
  imfCrisisOwnerScenario,
];

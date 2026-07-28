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
    date: "1997-11-19",
    price: 10000,
    open: 10200,
    headline: "환율이 오르며 유학비와 수입물가 부담이 커질 수 있다는 우려가 나옵니다.",
    articles: [
      {
        title: "원달러 환율 급등, 해외연수·유학 준비생 부담 커져",
        summary: "달러가 비싸지면서 해외 체류 비용과 외화 결제 부담이 빠르게 늘고 있습니다.",
        source: "청년경제노트",
      },
      {
        title: "기업 채용 계획 보수적으로 전환",
        summary: "경기 불확실성이 커지며 일부 기업이 하반기 채용 규모를 재검토하고 있습니다.",
        source: "잡마켓데일리",
      },
    ],
  },
  {
    date: "1997-11-21",
    price: 9000,
    headline: "IMF 구제금융 요청 소식에 취업 시장과 생활비 부담 우려가 동시에 커집니다.",
    articles: [
      {
        title: "정부, IMF에 구제금융 요청",
        summary: "외환 위기가 현실화되며 기업 투자와 채용 시장 위축 가능성이 제기됩니다.",
        source: "가상경제일보",
      },
      {
        title: "신입 채용 문 좁아지나",
        summary: "대기업과 금융권이 채용 일정을 늦추거나 규모를 줄일 수 있다는 전망이 나옵니다.",
        source: "잡마켓데일리",
      },
    ],
  },
  {
    date: "1997-11-24",
    price: 7650,
    headline: "물가와 환율이 흔들리며 현금을 지켜야 한다는 목소리가 커지고 있습니다.",
    articles: [
      {
        title: "환율 급등에 수입품 가격 인상 조짐",
        summary: "노트북, 교재, 생활용품 등 수입 의존 품목의 가격 상승 가능성이 커졌습니다.",
        source: "생활경제신문",
      },
      {
        title: "청년층, 투자보다 현금 확보 우선해야 하나",
        summary: "소득이 불안정한 시기에는 투자 손실보다 생활비 부족이 더 큰 위험일 수 있습니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1997-12-03",
    price: 6500,
    headline: "IMF 합의 이후 긴축과 구조조정이 예고되며 청년 고용 불안이 커졌습니다.",
    articles: [
      {
        title: "구조조정 본격화 전망, 신규 채용도 영향권",
        summary: "기업들이 비용 절감에 나서며 신입 채용 시장도 얼어붙을 수 있다는 분석입니다.",
        source: "잡마켓데일리",
      },
      {
        title: "저가 매수 기회 vs 생활비 방어",
        summary: "주가가 크게 빠졌지만 사회초년생에게는 현금 보유의 가치도 커지고 있습니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1998-01-14",
    price: 7150,
    headline: "금 모으기 운동과 시장 반등 소식에 불안 심리가 일부 완화되고 있습니다.",
    articles: [
      {
        title: "금 모으기 운동 확산, 위기 극복 기대감",
        summary: "국민 참여 캠페인이 확산되며 시장 심리에도 작은 변화가 나타났습니다.",
        source: "가상경제일보",
      },
      {
        title: "취업 준비생에게 필요한 투자 원칙은",
        summary: "회복 기대감이 생겨도 생활비와 투자금의 경계를 명확히 해야 한다는 조언입니다.",
        source: "머니레슨",
      },
    ],
  },
];

const ownerDays = [
  {
    date: "1997-11-19",
    price: 10000,
    open: 10200,
    headline: "환율 상승과 금융 불안으로 원재료비와 대출 이자 부담이 커질 조짐입니다.",
    articles: [
      {
        title: "환율 급등, 수입 식자재 가격 인상 우려",
        summary: "원화 가치가 떨어지며 수입 원재료를 쓰는 자영업자의 비용 부담이 커질 수 있습니다.",
        source: "상권경제",
      },
      {
        title: "은행권, 대출 심사 보수적으로 전환",
        summary: "금융 불안이 커지면서 개인사업자 대출 문턱이 높아질 수 있다는 전망입니다.",
        source: "마켓나우",
      },
    ],
  },
  {
    date: "1997-11-21",
    price: 9000,
    headline: "IMF 구제금융 요청 이후 소비 위축과 대출 부담이 현실적인 위험으로 떠올랐습니다.",
    articles: [
      {
        title: "외환위기 현실화, 자영업 매출도 타격 우려",
        summary: "가계가 지출을 줄이면 외식과 소매 업종부터 매출 압박을 받을 수 있습니다.",
        source: "상권경제",
      },
      {
        title: "금리 상승 압력에 사업자 이자 부담 확대",
        summary: "대출을 보유한 사업자는 투자보다 현금흐름 점검이 먼저라는 지적이 나옵니다.",
        source: "데일리인베스트",
      },
    ],
  },
  {
    date: "1997-11-24",
    price: 7650,
    headline: "시장 급락이 이어지며 여윳돈 투자와 운영자금 보전 사이의 고민이 커집니다.",
    articles: [
      {
        title: "상권 매출 둔화 조짐, 비용 관리 비상",
        summary: "소비심리 위축으로 외식업과 소매업 매출 전망이 어두워지고 있습니다.",
        source: "상권경제",
      },
      {
        title: "저가 매수보다 운영자금 확보가 우선?",
        summary: "사업자는 투자 손실이 가게 운영 위험으로 이어질 수 있어 현금 비중이 중요합니다.",
        source: "머니레슨",
      },
    ],
  },
  {
    date: "1997-12-03",
    price: 6500,
    headline: "IMF 합의 이후 고금리와 긴축이 예고되며 사업자금 관리가 더 중요해졌습니다.",
    articles: [
      {
        title: "고금리 장기화 가능성, 개인사업자 부담 커진다",
        summary: "대출 이자가 늘면 매출이 유지돼도 실제 남는 돈은 줄어들 수 있습니다.",
        source: "상권경제",
      },
      {
        title: "구조조정 여파, 소비심리 냉각",
        summary: "실직과 임금 불안이 커지면 가계 소비가 줄어드는 흐름이 나타날 수 있습니다.",
        source: "가상경제일보",
      },
    ],
  },
  {
    date: "1998-01-14",
    price: 7150,
    headline: "시장 반등에도 사업 현장에서는 현금흐름을 지키려는 움직임이 이어집니다.",
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
];

export const imfCrisisWorkerScenario: Scenario = {
  ...shared,
  id: "imf-crisis-worker",
  title: "IMF 외환위기 · 직장인",
  subtitle: "대기업 직장인이라면, 그 돈을 어떻게 했을까",
  description:
    "안정적인 월급이 있지만 그만큼 잃을 것도 많은 대기업 직장인 시점. 그동안 모은 1,000만원으로 5일간의 핵심 장면을 체험합니다.",
  startingCash: 10_000_000,
  persona:
    "당신은 대기업에 다니는 32세 직장인입니다. 그동안 모아온 1,000만원으로 막 투자를 시작하려던 참이었어요.",
  learningGoals: [
    "기업 부실 뉴스가 내 직장과 투자 자산에 동시에 미치는 영향 보기",
    "구조조정 우려 속에서 현금과 투자 비중을 나눠 판단하기",
    "월급 안정성에 대한 믿음이 투자 판단을 흐리는지 기록하기",
  ],
  keyConcepts: workerConcepts,
  days: workerDays,
};

export const imfCrisisStudentScenario: Scenario = {
  ...shared,
  id: "imf-crisis-student",
  title: "IMF 외환위기 · 취준생",
  subtitle: "전 재산 300만원인 취준생이라면, 그 돈을 어떻게 했을까",
  description:
    "잃으면 타격이 훨씬 큰 사회초년생 시점. 아르바이트로 모은 300만원으로 5일간의 핵심 장면을 체험합니다.",
  startingCash: 3_000_000,
  persona:
    "당신은 이제 막 대학을 졸업하고 취업을 준비 중인 24세 취준생입니다. 아르바이트로 모은 300만원이 전 재산이에요.",
  learningGoals: [
    "환율 상승이 생활비와 취업 준비 비용에 미치는 영향 이해하기",
    "전 재산이 작을 때 투자금과 비상금을 어떻게 구분할지 판단하기",
    "저가 매수 욕심과 현금 방어 사이에서 선택 이유 남기기",
  ],
  keyConcepts: studentConcepts,
  days: studentDays,
};

export const imfCrisisOwnerScenario: Scenario = {
  ...shared,
  id: "imf-crisis-owner",
  title: "IMF 외환위기 · 자영업자",
  subtitle: "가게를 운영하는 자영업자라면, 그 돈을 어떻게 했을까",
  description:
    "매출이 흔들리는 위기 속에서 여윳돈까지 굴려야 하는 자영업자 시점. 2,000만원으로 5일간의 핵심 장면을 체험합니다.",
  startingCash: 20_000_000,
  persona:
    "당신은 작은 식당을 운영하는 45세 자영업자입니다. 가게 운영자금과는 별도로 모아둔 여윳돈 2,000만원을 굴려보려던 참이었어요.",
  learningGoals: [
    "환율과 금리 변화가 원가, 대출, 매출에 미치는 영향 연결하기",
    "운영자금과 투자금을 분리해 위험 감당 범위 정하기",
    "시장 반등보다 사업 현금흐름이 먼저인지 판단하기",
  ],
  keyConcepts: ownerConcepts,
  days: ownerDays,
};

export const imfCrisisScenarios: Scenario[] = [
  imfCrisisWorkerScenario,
  imfCrisisStudentScenario,
  imfCrisisOwnerScenario,
];

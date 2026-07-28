import type { Scenario } from "@/lib/scenario-engine";

export const imfCrisisScenario: Scenario = {
  id: "imf-crisis",
  title: "IMF 외환위기",
  subtitle: "1997년, 나라가 IMF에 손을 벌려야 했던 그날",
  description:
    "환율이 무섭게 치솟던 1997년 11월. IMF 구제금융 요청 이틀 전부터 금 모으기 운동으로 반등이 시작된 순간까지, 핵심 장면 5일을 체험합니다.",
  disclaimer:
    "이 시나리오는 1997년 IMF 외환위기를 참고해 각색한 가상 데이터입니다. 실제 지수·환율·기사 원문과는 다릅니다.",
  unitLabel: "가상 지수 추종 ETF",
  startingCash: 10_000_000,
  pivotEvent: {
    date: "1997-11-21",
    label: "IMF 구제금융 요청",
  },
  checkpointAfterDay: 3,
  days: [
    {
      date: "1997-11-19",
      price: 10000,
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
  ],
};

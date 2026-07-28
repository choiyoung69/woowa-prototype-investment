import type { TradeAction } from "@/lib/scenario-engine";

export interface EmotionTag {
  id: string;
  label: string;
  description: string;
}

export const emotionTagsByAction: Record<TradeAction, EmotionTag[]> = {
  buy: [
    {
      id: "fomo_buy",
      label: "FOMO 매수",
      description:
        "더 오를까 봐 서둘러 사는 것. 남들 다 사는 것 같은 불안감에 따라가는 매수예요.",
    },
    {
      id: "confident_buy",
      label: "저점매수(확신)",
      description: "지금이 바닥이라 판단하고 계획적으로 사는 것.",
    },
    {
      id: "averaging_down",
      label: "물타기",
      description: "가격이 떨어질 때 추가로 사서 평균 매입 단가를 낮추는 것.",
    },
    {
      id: "anxious_buy",
      label: "불안한 매수",
      description: "확신 없이 불안한 채로 일단 사보는 것.",
    },
  ],
  sell: [
    {
      id: "panic_sell",
      label: "패닉셀",
      description: "가격이 급락할 때 공포에 질려 손실을 감수하고 파는 것.",
    },
    {
      id: "stop_loss",
      label: "손절",
      description: "더 큰 손실을 막기 위해 계획적으로 손실을 확정하고 파는 것.",
    },
    {
      id: "take_profit",
      label: "익절",
      description: "목표한 수익에 도달해 이익을 실현하고 파는 것.",
    },
    {
      id: "planned_sell",
      label: "계획된 매도",
      description: "미리 세운 원칙에 따라 파는 것.",
    },
  ],
  hold: [
    {
      id: "confident_hold",
      label: "확신 있는 관망",
      description: "지금은 움직이지 않는 게 맞다고 판단해 기다리는 것.",
    },
    {
      id: "anxious_hold",
      label: "불안한 관망",
      description: "팔아야 하나 고민되지만 결정을 미루는 것.",
    },
    {
      id: "numb_hold",
      label: "무덤덤",
      description: "특별한 감정 없이 그냥 지켜보는 것.",
    },
  ],
};

const allTags = [
  ...emotionTagsByAction.buy,
  ...emotionTagsByAction.sell,
  ...emotionTagsByAction.hold,
];

export function getEmotionTag(id: string): EmotionTag | undefined {
  return allTags.find((tag) => tag.id === id);
}

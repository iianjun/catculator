export default {
  app: {
    name: "냥산기",
  },

  nav: {
    catculator: "냥산기",
    myCats: "내 고양이",
    results: "결과",
    foodSetup: "사료 적정량 설정",
  },

  calculator: {
    catWeight: "고양이 체중",
    catStatus: "고양이 상태",
    calculate: "계산하기",
    myCats: "내 고양이",
    speech: {
      initial: "냥! 몸무게를 알려줘!",
      invalidWeight: "음... 몸무게가 이상하다냥!",
      inactive: "같이 건강해지자냥!",
      ready: "좋아! 계산 준비 완료다냥!",
    },
  },

  catStatus: {
    kitten_young: {
      label: "아기냥 (4개월 미만)",
      description: "급속 성장기",
    },
    kitten_old: {
      label: "아기냥 4-12개월",
      description: "후기 성장기",
    },
    neutered: {
      label: "중성화",
      description: "실내 생활 냥이",
    },
    intact: {
      label: "미중성화",
      description: "미중성화 성묘",
    },
    inactive: {
      label: "비활동적",
      description: "체중 관리 필요냥",
    },
    active: {
      label: "활동적",
      description: "에너지 넘치는 냥이",
    },
  },

  results: {
    profileResults: "{{name}}의 결과",
    letsWork: "같이 노력하자냥!",
    greatJob: "잘하고 있다냥!",
    rer: "RER",
    der: "DER",
    kcalDay: "kcal/일",
    restingEnergy: "휴식 에너지 요구량",
    dailyEnergy: "일일 에너지 요구량",
    rerTooltip:
      "고양이가 완전히 쉬는 상태에서 호흡, 소화 등 기본 신체 기능을 유지하는 데 필요한 칼로리입니다.",
    derTooltip:
      "RER에 생활 단계, 활동량, 중성화 여부 등을 반영한 하루 총 필요 칼로리입니다.",
    weight: "체중:",
    status: "상태:",
    overweightWarning:
      "고양이가 과체중일 수 있어요. 수의사와 체중 관리 계획을 상담해 보세요.",
    foodBreakdown: "사료 적정량 계산하기",
    newCalculation: "새로 계산하기",
  },

  food: {
    dailyCalories: "하루 필요 칼로리:",
    foodType: "사료 종류",
    wetOnly: "습식만",
    dryOnly: "건식만",
    both: "혼합",
    wetFoodCalories: "습식 칼로리",
    dryFoodCalories: "건식 칼로리",
    treatCalories: "간식 칼로리",
    wetTooltip:
      "확인 방법:\n\n포장지에서 용기당 칼로리를 확인하세요. 'kcal/캔' 또는 'kcal/파우치'로 표시됩니다. (예: 169 kcal ME/캔)",
    dryTooltip:
      "확인 방법:\n\n사료 포장지의 '칼로리 함량' 또는 '보증 분석' 항목을 확인하세요. 대부분 kcal/kg으로 표시됩니다.",
    treatTooltip:
      "하루 간식의 총 칼로리를 입력하세요.\n\n대부분의 간식 포장에 개당 칼로리가 표시되어 있습니다. 하루 간식 개수를 곱하면 됩니다.\n(예: 2 kcal/개 × 5개 = 10 kcal)",
    kcalPouch: "kcal/파우치",
    kcalKg: "kcal/kg",
    kcal: "kcal",
    dailyPortions: "하루 급여량",
    wetFood: "습식 사료",
    dryFood: "건식 사료",
    treats: "간식",
    pouch: "파우치",
    pouches: "파우치",
    perDay: "하루",
    gram: "g",
    overbudgetWarning: "냥이런! 칼로리가 너무 많으면 냥비만이 될 수 있다냥.",
    wetFoodBreakdown: "습식: {{kcal}} kcal ({{pouches}} x {{perPouch}})",
    dryFoodBreakdown: "건식: {{kcal}} kcal",
    treatsBreakdown: "간식: {{kcal}} kcal",
    totalBreakdown: "합계: {{consumed}} / {{der}} kcal",
    done: "완료",
    save: "저장",
    update: "수정",
    nameYourCat: "이름을 지어줘냥",
    catName: "고양이 이름",
    catNamePlaceholder: "모찌",
  },

  profiles: {
    unnamedCat: "이름 없는 냥이",
    saved: "{{date}} 저장됨",
    delete: "삭제",
    edit: "수정",
    foodType: "사료 종류:",
    wetFood: "습식:",
    dryFood: "건식:",
    treats: "간식:",
    noSavedCat: "저장된 냥이 없음",
    noSavedCatDesc: "사료 설정 화면에서 프로필을 저장하세요.",
    deleteCat: "삭제할까냥?",
    deleteConfirm: "{{name}}을(를) 삭제합니다.",
    thisCat: "이 고양이",
  },

  common: {
    ok: "확인",
    cancel: "취소",
  },

  error: {
    oops: "앗!",
    message: "냥산기에 사고가 났다냥! 고양이가 뭔가를 넘어뜨렸나 봐요!",
    tryAgain: "다시 시도",
    errorLog: "오류 기록",
  },
};

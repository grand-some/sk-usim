import { Case } from '@/types/case';

export const cases: Case[] = [
  {
    id: 1,
    title: '대형 건설사 M&A 성공 사례',
    category: '기업법무',
    description: '국내 대형 건설사의 해외 지사 인수합병을 성공적으로 진행하여 고객사의 글로벌 시장 진출을 지원했습니다.',
    result: '성공적 M&A 완료',
    year: '2023',
    image: '/images/cases/case1.jpg',
    details: {
      client: '국내 대형 건설사',
      issue: '해외 시장 진출을 위한 현지 기업 인수',
      approach: '현지 법률 및 규제 검토, 인수 대상 기업 실사, 계약 협상',
      outcome: '성공적인 M&A 완료 및 현지 시장 진출'
    }
  },
  {
    id: 2,
    title: '대규모 부동산 개발 프로젝트 소송',
    category: '민사소송',
    description: '대규모 부동산 개발 프로젝트와 관련된 복잡한 소유권 분쟁을 성공적으로 해결했습니다.',
    result: '원고 승소',
    year: '2023',
    image: '/images/cases/case2.jpg',
    details: {
      client: '부동산 개발사',
      issue: '토지 소유권 분쟁 및 손해배상 청구',
      approach: '역사적 문서 분석, 전문가 증인 활용, 법적 근거 제시',
      outcome: '원고 승소 및 손해배상금 지급 확정'
    }
  },
  {
    id: 3,
    title: '대기업 임원 배임 사건',
    category: '형사사건',
    description: '대기업 임원의 배임 혐의 사건에서 무죄 판결을 이끌어낸 성공적인 변호 사례입니다.',
    result: '무죄 판결',
    year: '2022',
    image: '/images/cases/case3.jpg',
    details: {
      client: '대기업 임원',
      issue: '배임 혐의로 기소',
      approach: '회계 장부 분석, 증거 수집, 전문가 의견 제시',
      outcome: '무죄 판결 확정'
    }
  },
  {
    id: 4,
    title: '행정처분 취소 소송',
    category: '행정소송',
    description: '부당한 행정처분에 대한 취소 소송을 성공적으로 진행하여 고객의 권리를 회복했습니다.',
    result: '처분 취소 승소',
    year: '2022',
    image: '/images/cases/case4.jpg',
    details: {
      client: '제조업체',
      issue: '부당한 행정처분',
      approach: '행정법령 분석, 처분의 위법성 입증',
      outcome: '행정처분 취소 판결'
    }
  },
  {
    id: 5,
    title: '복잡한 상속 분쟁 조정',
    category: '가사사건',
    description: '다수의 상속인과 복잡한 자산이 얽힌 상속 분쟁을 성공적으로 조정했습니다.',
    result: '조정 성공',
    year: '2023',
    image: '/images/cases/case5.jpg',
    details: {
      client: '상속인들',
      issue: '복잡한 상속 분쟁',
      approach: '상속인 간 이해관계 조정, 법적 근거 제시',
      outcome: '모든 당사자가 만족하는 조정안 합의'
    }
  },
  {
    id: 6,
    title: '특허권 침해 소송',
    category: '지식재산권',
    description: '핵심 기술의 특허권 침해 소송을 성공적으로 진행하여 고객의 지식재산권을 보호했습니다.',
    result: '원고 승소',
    year: '2023',
    image: '/images/cases/case6.jpg',
    details: {
      client: '기술 기업',
      issue: '특허권 침해',
      approach: '기술 분석, 침해 증명, 손해액 산정',
      outcome: '침해 인정 및 손해배상금 지급 확정'
    }
  }
]; 
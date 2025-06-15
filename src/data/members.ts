import { Member } from '@/types/member';

export const members: Member[] = [
  {
    id: 1,
    name: '김민수',
    position: '대표변호사',
    description: '20년 이상의 경력을 바탕으로 기업법무, M&A, 상장 등 다양한 분야에서 전문성을 갖추고 있습니다.',
    image: '/images/members/member1.jpg',
    specialties: ['기업법무', 'M&A', '상장', '자본시장법'],
    education: [
      '서울대학교 법학과 졸업',
      '서울대학교 법학전문대학원 졸업',
      '하버드 로스쿨 LL.M.'
    ],
    career: [
      '법무법인 대표변호사',
      '법무법인 파트너변호사',
      '대법원 재판연구관',
      '서울중앙지방검찰청 검사'
    ],
    awards: [
      '2023 대한민국 법조인 대상',
      '2022 법률신문 선정 올해의 변호사',
      '2021 한국법률가협회 우수변호사상'
    ]
  },
  {
    id: 2,
    name: '이지원',
    position: '수석변호사',
    description: '민사소송, 가사소송 분야에서 풍부한 경험을 보유하고 있으며, 고객의 권리 보호를 위해 최선을 다하고 있습니다.',
    image: '/images/members/member2.jpg',
    specialties: ['민사소송', '가사소송', '상속', '부동산'],
    education: [
      '고려대학교 법학과 졸업',
      '고려대학교 법학전문대학원 졸업'
    ],
    career: [
      '법무법인 파트너변호사',
      '법무법인 변호사',
      '서울중앙지방법원 판사'
    ],
    awards: [
      '2023 법률신문 선정 우수변호사',
      '2022 한국법률가협회 공로상'
    ]
  },
  {
    id: 3,
    name: '박준호',
    position: '변호사',
    description: '형사사건 전문가로서 무죄판결 다수를 이끌어낸 경험이 있으며, 고객의 인권 보호에 앞장서고 있습니다.',
    image: '/images/members/member3.jpg',
    specialties: ['형사', '인권', '성범죄', '부패방지'],
    education: [
      '연세대학교 법학과 졸업',
      '연세대학교 법학전문대학원 졸업'
    ],
    career: [
      '법무법인 파트너변호사',
      '법무법인 변호사',
      '서울중앙지방검찰청 검사'
    ],
    awards: [
      '2023 한국법률가협회 우수변호사상',
      '2022 법률신문 선정 올해의 변호사'
    ]
  }
]; 
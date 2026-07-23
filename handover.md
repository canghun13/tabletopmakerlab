# Tabletop Maker Lab — Project Handover

## 1. 프로젝트 개요

- 사이트명: Tabletop Maker Lab
- 도메인: https://tabletopmakerlab.com
- 목적: 보드게임·카드게임 디자이너, 제작자, 퍼블리셔를 위한 무료 계산기·제작·생산·출판 실무 도구 제공
- 주요 사용자:
  - Board game designers
  - Tabletop game creators
  - Indie publishers
  - Kickstarter / Gamefound creators
  - Prototype makers

### 핵심 포지셔닝

> Free tools for board game designers, creators & publishers.

단순 보드게임 플레이 사이트가 아니다.

게임을 직접 설계하고 제작·출판하려는 사용자가 다음 문제를 해결하는 실무형 Workbench를 목표로 한다.

- Game math / probability
- Physical components
- Box and packaging planning
- Prototype production
- Manufacturing economics
- Crowdfunding scenarios
- Publishing / royalty economics

---

## 2. 현재 인프라 상태

- Domain: tabletopmakerlab.com
- GitHub Pages: 설정 완료
- Cloudflare DNS: 설정 완료
- HTTPS: 활성화 완료
- Google Analytics: 설정 완료
- GA4 Measurement ID: `G-V25YKRCX01`

---

## 3. 기술 구조

- Hosting: GitHub Pages
- DNS / CDN: Cloudflare
- Frontend: Static HTML + CSS + Vanilla JavaScript
- Database: 없음
- Backend: 없음
- Framework: 사용하지 않음
- Build process: 가급적 없음
- 모바일 우선 반응형
- SEO 친화적인 개별 HTML 페이지 구조

### 권장 기본 구조

```text
/
├─ index.html
├─ about.html
├─ contact.html
├─ privacy.html
├─ tools/
├─ guides/
├─ reference/
├─ assets/
│  ├─ css/
│  ├─ js/
│  └─ icons/
├─ partials/
│  ├─ header.html
│  └─ footer.html
├─ robots.txt
├─ sitemap.xml
├─ llms.txt
├─ README.md
└─ handover.md
```

공통 header/footer는 partial 기반으로 관리할 수 있으나 SEO 핵심 요소인 title, meta description, canonical, structured data는 각 HTML 페이지에 직접 존재해야 한다.

---

## 4. Google Analytics

모든 공개 페이지의 `<head>`에 다음 GA4 코드를 포함한다.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-V25YKRCX01"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-V25YKRCX01');
</script>
```

---

## 5. 작업 연속성 원칙 — 매우 중요

이 프로젝트의 단일 진실 원본(Source of Truth)은 GitHub repository다.

회사 / 집 / 새 PC / 새 Codex 세션 어디에서 작업하든 아래 절차를 반드시 따른다.

### 작업 시작 전

1. Git repository 최신 상태 확인
2. `git pull`
3. `README.md` 전체 확인
4. `handover.md` 전체 확인
5. 현재 완료 상태와 다음 작업 확인
6. 기존 구조·디자인·코딩 규칙을 먼저 분석한 뒤 작업 시작

### 작업 완료 후

1. 자동 QA 실행
2. 대표 페이지 브라우저/렌더링 확인
3. 변경사항과 완료 내용을 `handover.md`에 기록
4. 남은 문제와 다음 권장 작업 기록
5. commit
6. push

로컬에만 존재하는 중요한 변경사항을 남기지 않는다.

다른 PC에서 최신 repository를 pull하면 즉시 이어서 작업할 수 있어야 한다.

새 Codex 세션은 기존 대화 내용을 모른다고 가정한다.
항상 repository와 `handover.md`만으로 현재 상태를 이해할 수 있도록 기록한다.

---

## 6. 사이트 방향

Tabletop Maker Lab은 범용 계산기 사이트가 아니다.

### A. Creator-first

게임 플레이어보다 게임을 만드는 사용자를 우선한다.

### B. Practical Workbench

단순 공식 계산보다 실제 제작 의사결정에 도움이 되는 결과를 제공한다.

예:

- 단순 카드 부피 계산에서 끝내지 않고 박스 크기 판단까지 연결
- 단순 원가 계산에서 끝내지 않고 landed cost / margin 구조까지 표시
- 단순 royalty 계산에서 끝내지 않고 계약 방식 비교까지 제공

### C. Independent Tools

특정 제조사의 실시간 가격을 임의로 제공하지 않는다.

사용자가 실제 제조사 견적, 운송비, 생산수량 등을 직접 입력하도록 한다.

실시간 데이터/API가 없어도 정확하게 사용할 수 있는 구조를 우선한다.

---

## 7. 초기 핵심 카테고리

### Game Math

- Dice Probability Calculator
- Dice Pool Probability Calculator
- Custom Dice Probability Calculator
- Exploding Dice Calculator
- Reroll Probability Calculator
- Card Draw Probability Calculator
- Opening Hand Probability Calculator
- Bag / Token Draw Probability Calculator
- Expected Outcome Calculator

### Components & Box Planning

- Board Game Box Size Estimator
- Card Stack Thickness Calculator
- Sleeved Card Stack Calculator
- Component Volume Calculator
- Box Fill Percentage Calculator
- Cards per Sheet Calculator
- Print-and-Play Sheet Calculator
- Punchboard Token Yield Calculator
- Board Fold Size Calculator
- Component Weight Estimator
- Insert Clearance Calculator

### Production

- Manufacturer Quote Comparison
- Landed Cost Calculator
- Freight Cost per Game
- Defect / Replacement Copy Reserve
- Production Overage Calculator
- Review / Demo Copy Reserve
- Inventory Runway Calculator
- Reprint Point Calculator

### Crowdfunding

- Backer Break-even Calculator
- Pledge Tier Margin Calculator
- Stretch Goal Cost Calculator
- Add-on Profit Calculator
- Shipping Subsidy Calculator
- Fulfillment Reserve Calculator
- Backer Mix Scenario Calculator
- Campaign Profit Scenario Calculator

### Publishing

- Board Game Royalty Calculator
- Royalty Method Comparison
- Advance Recoupment Calculator
- Licensing Deal Comparison
- Publisher Profit per Copy
- Direct vs Distribution Margin
- Convention Break-even Calculator

---

## 8. 1차 핵심 앵커 툴

초기 사이트에서 특히 중요하게 다룰 툴:

1. Board Game Box Size Estimator
2. Sleeved Card Stack Calculator
3. Component Volume Calculator
4. Punchboard Token Yield Calculator
5. Cards per Sheet Calculator
6. Custom Dice Probability Calculator
7. Bag / Token Draw Probability Calculator
8. Landed Cost Calculator
9. Manufacturer Quote Comparison
10. Board Game Royalty Calculator
11. Pledge Tier Margin Calculator
12. Backer Break-even Calculator

초기 작업에서 모든 40개 이상의 툴을 한 번에 억지로 만들지 않는다.

우선 사이트 기반 + 핵심 앵커 툴을 완성한 뒤 품질을 확인하면서 확장한다.

---

## 9. 피해야 할 영역

다음은 직접 경쟁이 강하거나 유지보수 문제가 있으므로 핵심 툴로 만들지 않는다.

- Generic Kickstarter Funding Goal Calculator
- 실시간 Board Game Manufacturing Quote
- 특정 제조사의 실시간 가격 데이터
- AI Board Game Generator
- 범용 Hypergeometric Calculator만 단독 제공
- 실시간 Shipping Rate API 의존 도구
- 사용자 계정/DB가 필수인 프로젝트 관리 기능

제조가격은 추정값을 임의로 제공하지 않고 사용자가 받은 실제 quote를 입력하도록 한다.

---

## 10. SEO 원칙

모든 공개 페이지:

- 독립 `<title>`
- Meta description
- Canonical
- viewport
- robots meta
- Open Graph
- 적절한 H1 1개
- 내부링크
- 관련 Tools / Guides 연결
- 가능하면 적절한 JSON-LD
- 얇은 콘텐츠 금지
- Calculator만 덩그러니 두지 않음

### Tool 페이지 기본 구성

1. 명확한 문제 설명
2. Calculator / Tool
3. 결과 설명
4. 계산 방법
5. 입력값 설명
6. 실제 예제
7. 주의사항 / 한계
8. 관련 Tool
9. 관련 Guide / Reference

SEO를 위해 동일 계산기를 키워드만 바꿔 복제하지 않는다.

검색 의도가 실질적으로 동일하면 하나의 강한 페이지로 통합한다.

---

## 11. 디자인 원칙

기존 사이트 템플릿 복사 금지.

Tabletop Maker Lab만의 독립적인 디자인을 만든다.

### 목표 인상

- Tabletop creator workshop
- Prototype lab
- Production planning desk
- 전문적이지만 지나치게 공학적이지 않음
- 일반 보드게임 플레이 사이트처럼 유치하지 않음

보드게임 카드/토큰/박스/다이스 이미지를 과도한 장식으로 사용하지 않는다.

이미지 의존 없이 CSS, 타이포그래피, 레이아웃, UI 구조 중심으로 독립적인 브랜드를 구축한다.

### Calculator UI

필요에 따라 다음 구조를 사용한다.

- 입력 영역
- 결과 영역
- 상세 breakdown
- 설명
- 유용한 경우 Copy
- 유용한 경우 Print

모바일에서도 레이아웃과 계산 기능이 깨지지 않아야 한다.

---

## 12. 품질 게이트

Commit / Push 전 반드시 확인한다.

### 자동 검사

- Broken internal links
- Malformed HTML
- Duplicate IDs
- JavaScript syntax/runtime 오류
- Sitemap URL 상태
- Canonical
- Meta title / description
- Missing H1
- Public page indexability
- Calculator 기본 동작
- 잘못된 anchor markup
- `.html">` 등의 코드 노출
- 닫히지 않은 태그
- 공통 partial 삽입 오류

### 시각 검사

최소 다음 페이지를 확인한다.

- Homepage
- Tools hub
- Game Math 대표
- Components 대표
- Production 대표
- Crowdfunding 대표
- Publishing 대표
- Guide 대표
- About
- Privacy

Calculator는 서로 다른 UI 구조 최소 5개 이상 샘플 확인한다.

---

## 13. 초기 목표 규모

권장 초기 공개 규모:

- Tools: 약 35~43개까지 단계적으로 확장
- Guides / Reference: 약 15~18개
- Core pages: Home / Tools / Guides / About / Contact / Privacy 등
- 최종 초기 목표: 약 55~65개 공개 페이지

단, 처음부터 페이지 수를 맞추기 위해 얇은 페이지를 대량 생성하지 않는다.

1차에서는 기반과 핵심 앵커 툴 품질을 우선한다.

---

## 14. 현재 프로젝트 상태

- Domain 확정: 완료
- GitHub Pages: 완료
- Cloudflare DNS: 완료
- HTTPS: 완료
- Google Analytics: 완료
- GA4 ID: `G-V25YKRCX01`
- `handover.md`: 초기 문서 작성
- 개발 기반 구축: 시작 예정

---

## 15. 작업 로그 작성 규칙

각 작업 완료 시 문서 하단에 다음 형식으로 추가한다.

```markdown
## YYYY-MM-DD — 작업명

### 완료
- 

### 변경 파일
- 

### QA
- 

### 남은 문제
- 

### 다음 권장 작업
- 

### Commit
- 
```

기존 계획과 실제 구현이 달라지면 반드시 이유를 기록한다.

---

## 16. 다음 권장 작업

1. 현재 repository 상태 분석
2. 기본 폴더/파일 구조 구축
3. README.md 정리
4. 공통 CSS/JS 구조 생성
5. Header/Footer 구축
6. Homepage 설계
7. Tools hub / Guides hub / Reference 진입 구조 생성
8. About / Contact / Privacy 생성
9. SEO / GA4 / robots / sitemap / llms 기본 구축
10. 자동 QA 기반 구축
11. 1차 핵심 앵커 Tool 개발 시작

### 권장 1차 모델

- Codex: Terra 중간
- 이유: 초기 구조, 디자인 시스템, SEO 기반, 공통 컴포넌트 구축이 중심이며 고난도 추론보다 안정적인 구현과 QA가 중요함.

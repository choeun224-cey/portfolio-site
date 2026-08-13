<template>
  <div class="detail" v-if="project">
    <!-- Hero -->
    <section class="detail__hero">
      <div class="container">
        <router-link to="/projects" class="detail__back"
          >&larr; 프로젝트 목록</router-link
        >
        <div class="detail__tags">
          <span v-for="tag in project.tags" :key="tag" class="detail__tag">{{
            tag
          }}</span>
        </div>
        <h1 class="detail__title">{{ project.title }}</h1>
        <p class="detail__summary">{{ project.summary }}</p>
        <dl class="detail__meta">
          <div>
            <dt>역할</dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div>
            <dt>기간</dt>
            <dd>{{ project.period }}</dd>
          </div>
          <div>
            <dt>기술 스택</dt>
            <dd>{{ project.tags?.join(", ") }}</dd>
          </div>
        </dl>

        <div v-if="project.links" class="detail__links">
          <a
            v-if="project.links.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener noreferrer"
            class="detail__link detail__link--live"
          >
            <i class="bi bi-box-arrow-up-right"></i>
            라이브 사이트 방문
          </a>
          <a
            v-if="project.links.github"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
            class="detail__link detail__link--github"
          >
            <i class="bi bi-github"></i>
            GitHub 저장소
          </a>
          <a
            v-if="project.links.planning"
            :href="project.links.planning"
            target="_blank"
            rel="noopener noreferrer"
            class="detail__link detail__link--planning"
          >
            <i class="bi bi-journal-text"></i>
            기획 문서 (Notion)
          </a>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section
      v-for="(section, index) in project.sections"
      :key="index"
      class="detail__section section"
      :class="{ 'detail__section--alt': index % 2 === 1 }"
    >
      <div class="container">
        <h2 class="detail__section-title">
          <i
            v-if="section.icon"
            :class="section.icon"
            class="detail__section-icon"
          ></i>
          {{ section.title }}
        </h2>
        <div class="detail__section-content" v-html="section.content"></div>

        <!-- 코드 블록 -->
        <div v-if="section.code" class="detail__code">
          <div class="detail__code-header">
            <span>{{ section.codeLabel || "Code" }}</span>
          </div>
          <pre><code>{{ section.code }}</code></pre>
        </div>

        <!-- 이미지 갤러리 -->
        <div v-if="section.images" class="detail__images">
          <figure
            v-for="(img, imgIdx) in section.images"
            :key="imgIdx"
            class="detail__image-wrap"
          >
            <img :src="img.src" :alt="img.alt" class="detail__image" />
            <figcaption v-if="img.alt" class="detail__image-caption">
              {{ img.alt }}
            </figcaption>
          </figure>
        </div>

        <!-- 디바이스 페어 갤러리 (Desktop + Mobile) -->
        <div v-if="section.screens" class="device-gallery">
          <div
            v-for="(screen, sIdx) in section.screens"
            :key="sIdx"
            class="device-screen"
          >
            <div class="device-screen__label">{{ screen.label }}</div>
            <div class="device-screen__row">
              <figure v-if="screen.desktop" class="device-frame device-frame--desktop">
                <div class="device-frame__bar">
                  <span></span><span></span><span></span>
                </div>
                <img
                  :src="screen.desktop.src"
                  :alt="screen.desktop.alt"
                  class="device-frame__img"
                />
                <figcaption class="device-frame__caption">Desktop</figcaption>
              </figure>
              <figure v-if="screen.mobile" class="device-frame device-frame--mobile">
                <img
                  :src="screen.mobile.src"
                  :alt="screen.mobile.alt"
                  class="device-frame__img"
                />
                <figcaption class="device-frame__caption">Mobile</figcaption>
              </figure>
              <figure
                v-for="(m, mIdx) in screen.mobiles"
                :key="mIdx"
                class="device-frame device-frame--mobile"
              >
                <img :src="m.src" :alt="m.alt" class="device-frame__img" />
                <figcaption class="device-frame__caption">
                  {{ m.label || 'Mobile' }}
                </figcaption>
              </figure>
            </div>
            <p v-if="screen.desc" class="device-screen__desc">{{ screen.desc }}</p>
          </div>
        </div>

        <!-- 비교 테이블 -->
        <div v-if="section.comparison" class="detail__comparison">
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in section.comparison" :key="row.label">
                <td>{{ row.label }}</td>
                <td class="before">{{ row.before }}</td>
                <td class="after">{{ row.after }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 특징 카드 그리드 -->
        <div v-if="section.featureCards" class="detail__feature-cards">
          <div
            v-for="card in section.featureCards"
            :key="card.title"
            class="feature-card"
          >
            <div class="feature-card__icon">
              <i :class="card.icon"></i>
            </div>
            <h4 class="feature-card__title">{{ card.title }}</h4>
            <p class="feature-card__desc">{{ card.desc }}</p>
            <div v-if="card.example" class="feature-card__example">
              <span class="feature-card__example-label">예시</span>
              <code>{{ card.example }}</code>
            </div>
          </div>
        </div>

        <!-- 미니 스펙 테이블 -->
        <div v-if="section.specTable" class="detail__spec-table">
          <table>
            <thead>
              <tr>
                <th v-for="col in section.specTable.columns" :key="col">
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in section.specTable.rows" :key="ri">
                <td v-for="(cell, ci) in row" :key="ci" v-html="cell"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Key Takeaways -->
    <section v-if="project.takeaways" class="takeaways section">
      <div class="container">
        <h2 class="takeaways__title">Key Takeaways</h2>
        <ul class="takeaways__list">
          <li
            v-for="(item, i) in project.takeaways"
            :key="i"
            class="takeaways__item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import storybookAlertImg from "@/assets/images/storybook-alert.png";
import storybookLoginImg from "@/assets/images/storybook-login.png";
import groupHeaderImg from "@/assets/images/group-header.png";
import qnOverviewImg from "@/assets/images/qn-overview.png";
import qnServiceImg from "@/assets/images/qn-service.png";
import qnWhyImg from "@/assets/images/qn-why.png";
import qnProblemImg from "@/assets/images/qn-problem.png";
import qnFeaturesImg from "@/assets/images/qn-features.png";
import qnDesignImg from "@/assets/images/qn-design.png";
import qnHomeImg from "@/assets/images/qn-home.png";
import qnPagesImg from "@/assets/images/qn-pages.png";
import hanipLoginImg from "@/assets/images/hanip-map_login.png";
import hanipHomeImg from "@/assets/images/hanip-map_home.png";
import hanipImportImg from "@/assets/images/hanip-map_import.png";
import hanipMobileLogin from "@/assets/images/hanip-map_login.jpg";
import hanipMobileMap from "@/assets/images/hanip-map_map.jpg";
import hanipMobileList from "@/assets/images/hanip-map_list.jpg";
import hanipMobileImport from "@/assets/images/hanip-map_import.jpg";
import hanipMobileRandom from "@/assets/images/hanip-map_random.jpg";
import hanipRandomWeb from "@/assets/images/hanip-map_random_web.png";
import trainingImg from "@/assets/images/training3.png";
import demoApp1 from "@/assets/images/demoapp-1.png";
import demoApp2 from "@/assets/images/demoapp-2.png";
import demoApp3 from "@/assets/images/demoapp-3.png";

const route = useRoute();
const project = ref(null);

onMounted(() => {
  const id = route.params.id;

  // 정적 배포에서도 안전하도록 로컬 데이터를 직접 사용
  const dataById = {
    "fs-ds": getFsDsData,
    "voca-training": getVocaTrainingData,
    goormthon: getGoormthonData,
    "hanip-map": getHanipMapData,
  };
  if (dataById[id]) {
    project.value = dataById[id]();
  }

  // API 데이터에는 이미지가 없으므로, 프로젝트별 섹션 이미지 주입
  if (project.value) {
    const imageMapByProject = {
      "fs-ds": {
        "그룹 헤더 테이블 — colspan 기반 2단 헤더": [
          {
            src: groupHeaderImg,
            alt: "그룹 헤더 테이블 — colspan 기반 2단 헤더 렌더링 예시",
          },
        ],
        "Storybook 기반 컴포넌트 문서화": [
          {
            src: storybookAlertImg,
            alt: "Storybook Alert 컴포넌트 문서 — 코드 Copy 기능 포함",
          },
          {
            src: storybookLoginImg,
            alt: "Storybook Login 페이지 컴포넌트 문서",
          },
        ],
      },
      goormthon: {
        "프로젝트 개요": [
          {
            src: qnOverviewImg,
            alt: "Quick Network 서비스 소개 — 모바일 화면 및 프로젝트 정보",
          },
          {
            src: qnServiceImg,
            alt: "Service Overview — 의미 있는 연결을 만드는 네트워킹 솔루션",
          },
        ],
        "기획 배경 및 문제 정의": [
          {
            src: qnWhyImg,
            alt: "Why: 기획배경 — 기업의 주최 목적과 참가자의 참가 목적 분석",
          },
          { src: qnProblemImg, alt: "What: 문제정의 — 4가지 핵심 문제점 도출" },
        ],
        "기능 설계": [
          {
            src: qnFeaturesImg,
            alt: "How: 기능 설계 — 5가지 핵심 기능과 해결방안",
          },
        ],
        "UX/UI 디자인": [
          {
            src: qnDesignImg,
            alt: "서비스의 진입장벽을 낮추는 디자인 전략 — UX Writing, 캐릭터 시각화",
          },
          {
            src: qnHomeImg,
            alt: "사용자 탐색 효율을 높이는 홈 화면 설계 — 필터, 매칭 상태, 프로필",
          },
        ],
        "프론트엔드 구현": [
          {
            src: qnPagesImg,
            alt: "컴포넌트 구조화 — 사전등록, 랜딩, 매칭 페이지 구현",
          },
        ],
      },
      "hanip-map": {},
      "voca-training": {
        "관리자 어드민 — AI 시나리오 메이커": [
          {
            src: trainingImg,
            alt: "AI 시나리오 메이커 — 3-Step Stepper로 시나리오·페르소나·평가 기준 설정",
          },
        ],
      },
    };

    const imageMap = imageMapByProject[project.value.id] || {};
    project.value.sections?.forEach((section) => {
      if (!section.images && imageMap[section.title]) {
        section.images = imageMap[section.title];
      }
    });
  }
});

function getFsDsData() {
  return {
    id: "fs-ds",
    title: "FS-DS 디자인 시스템",
    summary:
      "사내 전체 웹 프로젝트를 위한 디자인 시스템. Vanilla JS + SCSS 기반으로 프레임워크에 독립적인 컴포넌트 라이브러리를 설계하고 npm 패키지로 배포했습니다.",
    role: "Frontend Developer (단독 개발)",
    period: "2025.06 — 현재",
    tags: ["Vanilla JS", "SCSS", "Vite", "Storybook", "GitHub Actions", "npm"],
    sections: [
      {
        icon: "bi bi-flag",
        title: "프로젝트 배경",
        content: `
          <p>한일네트웍스 FS사업팀의 여러 웹 프로젝트에서 <strong>UI 일관성 부재</strong>와 <strong>중복 코드</strong> 문제가 있었습니다.</p>
          <p>각 프로젝트마다 버튼, 인풋, 모달 등을 매번 새로 만들고 있었고, 디자이너와 개발자 간 커뮤니케이션 비용도 컸습니다.</p>
          <p>이를 해결하기 위해 <strong>공용 디자인 시스템</strong>을 npm 패키지 형태로 구축하기로 결정했습니다.</p>
        `,
      },
      {
        icon: "bi bi-signpost-split",
        title: "기술적 의사결정",
        content: `
          <p><strong>왜 Vanilla JS인가?</strong> — 팀 내 프로젝트는 Vue가 아닌 Thymeleaf, HTML/CSS, Gulp, JavaScript 등 제각각인 기술 스택으로 운영되고 있었습니다. 이에 Vue로 프론트엔드를 통합하자는 의견이 나왔지만, 디자인 시스템은 Vue뿐 아니라 React, Thymeleaf 등 어떤 환경에서든 사용할 수 있도록 범용적으로 만들어야 했기에 Vanilla JS를 선택했습니다.</p>
          <p><strong>왜 SCSS인가?</strong> — 디자인 토큰(컬러, 스페이싱, 타이포)을 변수와 mixin으로 체계화하고, 소비 프로젝트에서 직접 SCSS 변수를 커스터마이징할 수 있도록 했습니다.</p>
          <p><strong>왜 GitHub Packages인가?</strong> — 사내 프라이빗 레지스트리가 필요했고, GitHub Actions와의 자연스러운 통합을 위해 선택했습니다.</p>
        `,
      },
      {
        icon: "bi bi-lightning-charge",
        title: "번들 경량화 (111MB → 3.3MB)",
        content: `
          <p>초기 배포 시 <strong>npm publish가 실패</strong>하는 문제가 발생했습니다. dist 번들이 111MB에 달해 GitHub의 100MB 제한을 초과했기 때문입니다.</p>
          <p>원인을 분석한 결과 <strong>3가지 핵심 문제</strong>를 발견했습니다:</p>
          <ul>
            <li><strong>순환 참조</strong> — Login.js에서 패키지 자기 자신을 import하여 이전 빌드가 새 번들에 중첩</li>
            <li><strong>SVG 전체 인라인</strong> — 1,274개 아이콘을 eager import로 전부 번들에 포함</li>
            <li><strong>폰트 base64 임베딩</strong> — 로컬 woff2 파일이 CSS에 base64로 변환</li>
          </ul>
        `,
        code: `// Before (순환 참조)
import { Button, Checkbox } from "@hanil-fs-web/fs-ds";

// After (상대 경로로 변경)
import Button from "../../components/Button/Button.js";
import Checkbox from "../../components/Controls/Checkbox.js";`,
        codeLabel: "순환 참조 해결",
        comparison: [
          { label: "메인 번들", before: "111MB", after: "627KB" },
          { label: "아이콘 번들", before: "(포함)", after: "2.7MB (별도)" },
          { label: "총 크기", before: "111MB", after: "3.3MB" },
          { label: "감소율", before: "—", after: "97%" },
        ],
      },
      {
        icon: "bi bi-sliders",
        title: "컴포넌트 설계 철학 — UI만 제공, 로직은 위임",
        content: `
          <p>팀 내 다른 개발자들이 디자인 시스템을 <strong>쉽고 빠르게 도입</strong>할 수 있도록, 모든 컴포넌트를 <strong>"UI만 제공하고, 비즈니스 로직은 소비자에게 위임한다"</strong>는 원칙으로 설계했습니다.</p>
          <p>내부에 비즈니스 로직을 숨기면 소비자가 예상치 못한 동작에 부딪히게 됩니다. 대신 <strong>props로 기능을 on/off</strong>하고, 모든 인터랙션은 <strong>외부 이벤트로 위임</strong>하여 어떤 프로젝트 환경에서든 예측 가능하게 동작하도록 했습니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-toggles",
            title: "Props 기반 기능 제어",
            desc: "closable, loading, disabled 등 props로 기능 단위 on/off. 컴포넌트가 스스로 상태를 관리하지 않아 외부에서 완전히 제어 가능.",
            example: 'open="true" closable loading="false"',
          },
          {
            icon: "bi bi-arrow-right-circle",
            title: "이벤트 위임",
            desc: "클릭, 변경, 닫기 등 모든 인터랙션은 CustomEvent로 외부에 전달. 소비자가 자유롭게 핸들링.",
            example: "addEventListener('close', handler)",
          },
          {
            icon: "bi bi-box-arrow-in-right",
            title: "슬롯 패턴 (data-slot)",
            desc: "Vanilla JS 환경에서 Vue의 slot과 유사한 컨텐츠 주입 지점 제공. Header, Body, Footer를 자유롭게 구성.",
            example: 'data-slot="header"',
          },
        ],
      },
      {
        icon: "bi bi-type",
        title: "rem 타이포그래피 & 유틸리티 클래스 시스템",
        content: `
          <p>팀 내에 <strong>공통 스타일 규정이 없어서</strong> 프로젝트마다 폰트 크기, 여백, 컬러를 제각각 정의하고 있었습니다. 이를 해결하기 위해 <strong>rem 기반 타이포그래피 시스템</strong>과 <strong>유틸리티 클래스</strong>를 함께 구축했습니다.</p>
          <p>SCSS 빌드 환경이 없는 프로젝트(Thymeleaf, 레거시 HTML)도 있었기 때문에, <strong>className만으로 즉시 적용</strong> 가능하도록 설계하는 것이 핵심이었습니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-fonts",
            title: "rem 비례 스케일링",
            desc: "html { font-size } 한 줄 변경으로 모든 컴포넌트의 텍스트·여백·아이콘이 비례 조정. 프로젝트별 커스터마이징이 즉시 가능.",
            example: "html { font-size: 14px; }",
          },
          {
            icon: "bi bi-layout-text-sidebar",
            title: "유틸리티 클래스",
            desc: "flexCC, flexSBC 등 자주 쓰는 Flex 조합과 crPurple500 등 컬러 클래스를 단축 네이밍으로 제공.",
            example: "flexSBC crPurple500 mt8",
          },
          {
            icon: "bi bi-puzzle",
            title: "SCSS 없이 즉시 도입",
            desc: "빌드 도구가 없는 레거시 프로젝트에서도 CSS 파일 하나만 링크하면 전체 유틸리티 사용 가능.",
            example: 'link rel="stylesheet" href="fs-ds.css"',
          },
        ],
        specTable: {
          columns: ["카테고리", "클래스 예시", "설명"],
          rows: [
            [
              "<strong>컬러</strong>",
              "<code>.crPurple500</code> <code>.crBlack</code>",
              "CSS 변수(var) 기반 시맨틱 컬러",
            ],
            [
              "<strong>Flex</strong>",
              "<code>.flex</code> <code>.flexCC</code> <code>.flexSBC</code>",
              "정렬 조합별 단축 클래스",
            ],
            [
              "<strong>여백</strong>",
              "<code>.mt8</code> <code>.px16</code> <code>.gap12</code>",
              "margin/padding/gap (4~64 단위)",
            ],
            [
              "<strong>타이포</strong>",
              "<code>.textSm</code> <code>.textBold</code>",
              "폰트 크기·굵기 제어",
            ],
          ],
        },
      },
      {
        icon: "bi bi-grid-3x3-gap",
        title: "아이콘 시스템 설계",
        content: `
          <p>1,275개의 SVG 아이콘을 효율적으로 관리하기 위해 <strong>2-tier 엔트리 구조</strong>를 설계했습니다.</p>
          <ul>
            <li><strong>component-icons.js (42개)</strong> — 컴포넌트 내부에서 자주 사용하는 아이콘만 메인 번들에 포함</li>
            <li><strong>icons-entry.js (1,275개)</strong> — 전체 아이콘은 별도 엔트리로 분리, 필요한 프로젝트만 import</li>
          </ul>
          <p>이를 통해 메인 번들 크기를 최소화하면서도 전체 아이콘 접근성을 유지했습니다.</p>
        `,
      },
      {
        icon: "bi bi-table",
        title: "그룹 헤더 테이블 — colspan 기반 2단 헤더",
        content: `
          <p>사내 관리자 페이지에서 <strong>다단 헤더 테이블</strong>이 자주 필요했지만, 매번 colspan을 수동으로 계산하고 하드코딩하고 있었습니다. 이를 <strong>JSON 설정만으로 자동 생성</strong>되는 재사용 컴포넌트로 추상화했습니다.</p>
          <p>columns 배열에 children을 넣으면 <strong>colspan을 자동 계산</strong>하여 2단 그룹 헤더를 생성합니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-braces",
            title: "선언적 헤더 구조",
            desc: "columns 배열에 children 속성을 넣으면 자동으로 2단 헤더 생성. colspan 수동 계산 불필요.",
          },
          {
            icon: "bi bi-pin-angle",
            title: "고정 컬럼 (Sticky)",
            desc: "가로 스크롤 시에도 좌측 고정 열 유지. 데이터가 많은 금융 테이블에서 필수 기능.",
          },
          {
            icon: "bi bi-cursor",
            title: "행 클릭 이벤트 위임",
            desc: "테이블 내부에 클릭 로직을 넣지 않고 row-click 이벤트로 외부 위임. 설계 철학과 일관성 유지.",
          },
        ],
      },
      {
        icon: "bi bi-book",
        title: "Storybook 기반 컴포넌트 문서화",
        content: `
          <p>각 컴포넌트를 <strong>Storybook Docs</strong>로 문서화하여, 개발자가 별도 설명 없이도 컴포넌트의 사용법과 옵션을 바로 파악할 수 있도록 했습니다.</p>
          <p>라이브 프리뷰와 함께 <strong>코드 스니펫을 Copy 버튼</strong>으로 바로 복사할 수 있게 구성하여, 문서에서 코드를 가져다 쓰는 것만으로 컴포넌트를 적용할 수 있습니다.</p>
          <p>Alert, Button, Form Controls 등 <strong>30여 개 컴포넌트</strong>와 Login 같은 <strong>페이지 단위 템플릿</strong>까지 문서화하여 팀 내 온보딩과 개발 속도를 높였습니다.</p>
        `,
        images: [
          {
            src: storybookAlertImg,
            alt: "Storybook Alert 컴포넌트 문서 — 코드 Copy 기능 포함",
          },
          {
            src: storybookLoginImg,
            alt: "Storybook Login 페이지 컴포넌트 문서",
          },
        ],
      },
      {
        icon: "bi bi-diagram-3",
        title: "프레임워크 래퍼 — 도입 여부 판단",
        content: `
          <p>FS-DS는 Vanilla JS 기반이기 때문에 Vue·React 프로젝트에서 사용할 때 <strong>프레임워크 래퍼(wrapper) 컴포넌트</strong>를 만들지 여부를 결정해야 했습니다. "일단 래핑하자"가 아니라 <strong>프로젝트 규모·반복 사용도·팀 상황</strong>을 기준으로 판단했습니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-check-circle",
            title: "래핑하는 경우",
            desc: "동일 컴포넌트를 10곳 이상 반복 사용 / props 규약을 팀 전체가 공유해야 하는 경우 / 프레임워크 이벤트 시스템(v-model, onChange 등)과 결합이 필요한 경우.",
          },
          {
            icon: "bi bi-x-circle",
            title: "래핑하지 않는 경우",
            desc: "1~2회만 쓰는 일회성 UI / 간단한 버튼·배지처럼 래핑 오버헤드가 더 큰 경우 / 팀이 작고 FS-DS 직접 사용법에 이미 익숙한 경우.",
          },
          {
            icon: "bi bi-lightbulb",
            title: "배운 점",
            desc: "'좋은 도구'보다 '팀이 지속 가능하게 쓸 수 있는 구조'가 중요하다는 것을 체감. 추상화 레이어는 공짜가 아니며, 유지보수 비용과 학습 곡선을 함께 고려해야 합니다.",
          },
        ],
      },
      {
        icon: "bi bi-gear-wide-connected",
        title: "CI/CD 파이프라인",
        content: `
          <p>GitHub Actions를 활용하여 <strong>main 브랜치 push 시 자동 배포</strong>되는 파이프라인을 구축했습니다.</p>
          <ul>
            <li><strong>Storybook 배포</strong> — 자동 빌드 후 GitHub Pages로 배포</li>
            <li><strong>npm publish</strong> — 버전 확인 후 GitHub Packages에 자동 배포</li>
          </ul>
          <p>dist/ 폴더를 git 추적에서 제거하고, CI가 빌드 시점에 생성하도록 변경하여 git 충돌 문제도 해결했습니다.</p>
        `,
      },
      {
        icon: "bi bi-signpost-2",
        title: "향후 로드맵",
        content: `
          <p>현재 Vanilla JS 기반으로 <strong>프레임워크에 독립적인 코어</strong>를 먼저 완성한 상태이며, 이를 기반으로 프레임워크별 래퍼를 확장할 계획입니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-check-circle",
            title: "Vanilla JS 코어 (완료)",
            desc: "프레임워크 독립적인 컴포넌트 + 유틸리티 + 아이콘 시스템. npm 패키지 배포 및 Storybook 문서화 완료.",
          },
          {
            icon: "bi bi-arrow-repeat",
            title: "React 래퍼 (진행 중)",
            desc: "Vanilla JS 코어를 React 컴포넌트로 래핑. 기존 props/이벤트 설계를 React의 props/callback 패턴으로 매핑.",
          },
          {
            icon: "bi bi-lightbulb",
            title: "설계 의도",
            desc: "코어를 한 번 만들고 프레임워크별 래퍼만 추가하는 구조. 코어 수정 시 모든 래퍼에 자동 반영되는 것이 목표.",
          },
        ],
      },
    ],
    takeaways: [
      "순환 참조가 빌드 결과물에 미치는 영향을 실제로 경험하고, 모듈 의존성 그래프의 중요성을 배웠습니다.",
      "npm 패키지의 전체 라이프사이클(빌드 → 패키징 → 레지스트리 배포 → 소비자 설치)을 깊이 이해하게 되었습니다.",
      '"동작하면 된다"가 아닌, 소비자(다른 프로젝트 개발자) 입장에서 생각하는 개발의 가치를 체감했습니다.',
      "단독으로 설계부터 배포까지 진행하며, 프로젝트 전체를 조망하는 시야를 갖게 되었습니다.",
    ],
  };
}

function getVocaTrainingData() {
  return {
    id: "voca-training",
    title: "AI 콜센터 상담사 트레이닝 시스템",
    summary:
      "보험 TM 상담사가 AI 가상 고객과 실시간으로 롤플레잉하며 발화 단위 코칭을 받는 트레이닝 시스템. 실녹취 약 3.6만 콜을 분석해 'AI 고객이 고객다워지는' 설계 기준을 세우고, 관리자 콘솔·상담사 웹·모바일 앱으로 이어지는 서비스를 기획했습니다. 사내 POC로, 기획과 웹은 단독으로 맡고 앱·서버 개발자와 협업하며 경영진 시연과 사업화 검토를 향해 고도화 중입니다.",
    role: "서비스 기획 · 웹 개발 (앱·서버 개발자 협업)",
    period: "2026.06 — 진행 중 (POC 1차)",
    tags: ["서비스 기획", "데이터 기반 설계", "LLM 프롬프트 설계", "IA/UX", "Vue 3", "보험 TM"],
    links: {
      planning: "https://www.notion.so/voca-training-35de4090c739806296e8cedfeed23f7b",
    },
    sections: [
      {
        icon: "bi bi-flag",
        title: "프로젝트 개요",
        content: `
          <p>보험 TM 상담사의 실전 감각을 키우기 위해, <strong>AI 가상 고객과 실시간으로 롤플레잉</strong>하고 통화가 끝나면 <strong>발화 단위로 코칭</strong>받는 트레이닝 시스템입니다. 실무의 AI콜 도메인을 사내 POC로 확장한 프로젝트입니다.</p>
          <p>단독 POC로 시작해 핵심 인터랙션을 검증했고, 현재는 <strong>앱 개발자(iOS·Android)와 협업해 데모앱까지 완성</strong>, 경영진 시연과 사업화 검토를 향해 고도화 중입니다. 저는 이 프로젝트에서 <strong>서비스 기획과 관리자·상담사 웹 개발을 단독으로</strong> 맡고 있습니다.</p>
          <ul>
            <li><strong>구성</strong> — 관리자 콘솔 + 상담사 웹 + 모바일 앱(iOS·Android)의 다중 클라이언트 구조</li>
            <li><strong>팀</strong> — 기획·웹 1명(본인) / 앱 2명 / 서버 1명(2차 투입). 2차에 실시간 음성 대화 서버 개발 예정</li>
          </ul>
        `,
      },
      {
        icon: "bi bi-phone",
        title: "상담사 데모앱 — 실시간 롤플레잉과 AI 평가",
        content: `
          <p>앱 개발팀과 함께 완성한 iOS·Android 데모앱 화면입니다. AI 가상 고객과 실시간으로 통화하고(①), 통화 중 5개 미션을 추적하며(②), 통화가 끝나면 AI가 점수와 미션별 채점, 근거가 된 실제 발화까지 인용해 코칭합니다(③). AI 고객의 얼굴과 반응, 평가 문구까지 생성형 AI를 적극 활용해 만들었습니다.</p>
        `,
        screens: [
          {
            label: "데모앱 주요 화면",
            desc: "① 실시간 롤플레잉 통화(인내심 게이지·발화 로그) → ② 통화 중 미션 체크리스트 → ③ AI 평가 리포트(점수·미션별 채점·근거 발화 인용).",
            mobiles: [
              { src: demoApp1, alt: "실시간 롤플레잉 통화 화면", label: "① 롤플레잉 통화" },
              { src: demoApp3, alt: "통화 중 미션 체크리스트 화면", label: "② 미션 체크리스트" },
              { src: demoApp2, alt: "AI 평가 리포트 화면", label: "③ AI 평가 리포트" },
            ],
          },
        ],
      },
      {
        icon: "bi bi-database",
        title: "데이터 기반 기획 — 실녹취 3.6만 콜 분석",
        content: `
          <p>가장 공들인 부분은 <strong>"AI 고객이 왜 고객답지 않은가"를 데이터로 규명</strong>한 것입니다. 실제 상담 통화가 쌓인 PostgreSQL을 읽기 전용으로 집계해 <strong>약 36,360콜, STT 세그먼트 180만+ 건</strong>을 분석했습니다.</p>
          <p>핵심 발견은, 실제 고객 발화가 <strong>평균 8.4자·중앙값 3자, 5자 이하가 64.6%</strong>라는 점이었습니다. 실제 통화는 짧은 수신 확인과 되묻기의 리듬인데 기존 AI는 매번 완성된 문장과 후속 질문을 만들어 '고객답지 않았다'는 걸 확인했습니다.</p>
          <p>이 진단을 바탕으로 생성 정책을 <strong>v2로 재설계</strong>했습니다 — <em>직전 상담사 행동 파악 → 고객 반응행동 하나 선택 → 짧은 대사 생성 → 상태 판정</em> 순서로. '말투 예시를 늘리는' 접근이 아니라 <strong>통화 리듬 자체를 데이터에 맞춘</strong> 설계입니다.</p>
        `,
        comparison: [
          { label: "분석 통화", before: "—", after: "약 36,360콜" },
          { label: "STT 세그먼트", before: "—", after: "183만+ 건" },
          { label: "고객 발화 평균", before: "—", after: "8.4자 (중앙값 3자)" },
          { label: "5자 이하 비중", before: "—", after: "64.6%" },
        ],
      },
      {
        icon: "bi bi-bar-chart-steps",
        title: "난이도 설계 — 접점(터치포인트) 사다리 Lv1~5",
        content: `
          <p>난이도를 '까칠한 성격'처럼 추상적으로 두지 않고, <strong>"고객과 어떤 접점에서 만난 통화인가"</strong>로 설계했습니다. 접점이 정해지면 tone·인내심·발화속도·되묻기 수위가 자연스럽게 파생됩니다. '이유 없는 진상'은 없고, 최고 난이도도 "지쳐서 차가운" 현실적 고객입니다.</p>
        `,
        specTable: {
          columns: ["Lv", "접점 (아웃바운드)", "고객 성격"],
          rows: [
            ["<strong>1</strong>", "예약 상담 — 고객이 신청한 콜백", "기다리던 전화, 협조적"],
            ["<strong>2</strong>", "관심 고객 — 자료 요청·이벤트 이력", "들어주지만 확신 없음"],
            ["<strong>3</strong>", "기존 고객 — 예상 밖 전화", "바쁨, 용건부터"],
            ["<strong>4</strong>", "신규 콜드콜 — 접점 없음", "번호 출처부터 의심"],
            ["<strong>5</strong>", "지친 콜드콜 — 권유에 지침", "차갑고 건조(무례하진 않음)"],
          ],
        },
      },
      {
        icon: "bi bi-shield-lock",
        title: "정답 유출 방지 — 정보 통제 설계",
        content: `
          <p>롤플레잉의 핵심 함정은 <strong>AI 고객이 정답을 흘리거나 채점자처럼 구는 것</strong>입니다. 상담사의 목표나 정답 경로를 고객 프롬프트에 넣으면, 고객이 독립적인 사람이 아니라 '훈련생을 도와주는 조력자'처럼 행동합니다.</p>
          <p>그래서 <strong>상담사 목표(goal)를 프롬프트에서 제외</strong>하고, 시나리오 라벨은 '비공개 내부 설정'으로만 주입했습니다. 실제로 상담사가 "누구세요?"만 물었는데 AI 고객이 "운전자보험이요?"라고 먼저 발설하던 문제를, <em>"상담사가 먼저 밝히기 전엔 상품·용건을 모른다"</em>는 규칙으로 차단했습니다. 관찰된 실패를 규칙으로 되돌리는 방식으로 리얼리즘을 끌어올렸습니다.</p>
        `,
      },
      {
        icon: "bi bi-grid-1x2",
        title: "관리자 어드민 — AI 시나리오 메이커",
        content: `
          <p>관리자가 AI 가상 고객 훈련을 세팅하는 화면. <strong>3단계 스텝퍼</strong>(기본 정보 → 페르소나 설정 → 평가 기준)로 복잡한 설정을 단계별로 분리했습니다.</p>
          <p>가장 정교한 부분은 <strong>평가 미션의 동적 폼</strong>. 관리자가 미션별 가중치를 자유롭게 추가/삭제하고, <strong>합계 100점 강제 검증</strong>이 실시간으로 동작합니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-list-ol",
            title: "3단계 스텝퍼 UX",
            desc: "기본 정보 → 페르소나 → 평가 기준의 단계별 분리로 설정의 인지 부하를 낮춤.",
          },
          {
            icon: "bi bi-sliders",
            title: "페르소나 정교 설정",
            desc: "연령·직업·태도와 접점 레벨까지 정의해 고객 행동 패턴을 세밀하게 제어.",
          },
          {
            icon: "bi bi-calculator",
            title: "가중치 합계 실시간 검증",
            desc: "미션별 가중치 합계를 실시간 계산해 100점이 아니면 즉시 경고.",
          },
        ],
      },
      {
        icon: "bi bi-clipboard-check",
        title: "채점 체계와 거절 대응 훈련",
        content: `
          <p>평가는 <strong>미션·keyPoints 기반 LLM 채점</strong>으로 설계했습니다. 점수만 주는 게 아니라 <strong>근거가 된 실제 발화를 인용하고, 다음 통화에서 바로 쓸 수 있는 발화 단위 액션</strong>을 주도록 프롬프트 규칙을 세웠습니다("추상 조언 금지").</p>
          <p>보험 TM에서 가장 중요한 <strong>거절 대응</strong>은 별도로 파고들어, <strong>거절 유형 8종의 정답 발화 대본</strong>과 Lv.5 훅 조건까지 도메인 산출물로 정리했습니다.</p>
        `,
      },
      {
        icon: "bi bi-diagram-3",
        title: "멀티 LLM 비교·선정과 벤더 중립 구조",
        content: `
          <p>AI 고객과 채점의 품질은 LLM에 크게 좌우되기 때문에, <strong>여러 LLM을 실제로 붙여 비교·선정</strong>했습니다. 호출은 <strong>벤더 중립 프록시</strong> 한 곳을 거치게 해(OpenAI 호환·Anthropic 분기, 한국어 강제, thinking 토큰 제거 등) 모델 교체가 코드 변경 없이 되도록 설계했습니다.</p>
          <p>여러 모델을 정량·정성으로 비교한 끝에 <strong>Gemini로 확정</strong>해 적용 중입니다. 음성은 <strong>Supertonic TTS</strong>를 도입하되 네트워크 오류 시 기본 TTS로 전환되는 폴백을 기획했습니다. (음성 연동 구현은 앱 개발팀, 문제 정의와 규칙 설계는 본인)</p>
        `,
      },
      {
        icon: "bi bi-stack",
        title: "구현 범위와 기술",
        content: `
          <ul>
            <li><strong>관리자 콘솔</strong> — 시나리오 메이커·교육 배포·훈련 정책·훈련 현황·리포트·계정 등 6+ 화면 (Vue 3 + 사내 디자인 시스템 FS-DS)</li>
            <li><strong>상담사 웹</strong> — 실시간 롤플레잉과 음성 통화(턴 기반) 듀얼 셸</li>
            <li><strong>모바일 앱</strong> — iOS·Android 데모앱(앱 개발팀), Supertonic TTS 탑재</li>
            <li><strong>백엔드</strong> — 도메인팩·시나리오·배포 저장 (PostgreSQL)</li>
          </ul>
          <p>제가 단독으로 만든 <strong>사내 디자인 시스템(FS-DS)</strong>을 이 프로젝트에 직접 적용해, 본인 자산이 실제로 운영 가능한지 검증하는 메타 사례이기도 합니다.</p>
        `,
      },
      {
        icon: "bi bi-signpost-2",
        title: "진행 현황 및 로드맵",
        content: `
          <p>사내 POC로 <strong>1차(데모 구축)</strong>가 마무리 단계입니다 (1차 진척 약 85%).</p>
          <ul>
            <li><strong>완료</strong> — 관리자 콘솔·상담사 웹, 데모앱(iOS·Android), AI 고객 롤플레잉(프롬프트 v2·모델 선정), LLM 채점, 음성 통화 모드, 난이도 5단계, 백엔드 저장</li>
            <li><strong>진행/예정</strong> — 거절 훈련 코드 반영, 훈련 결과 집계 API</li>
            <li><strong>2차</strong> — 실시간 음성 대화 서버(스트리밍 STT·LLM·TTS), 상담사 실사용 테스트, POC 결과 보고·사업화 검토</li>
          </ul>
        `,
      },
    ],
    takeaways: [
      "실녹취 약 3.6만 콜을 직접 분석해 'AI 고객이 고객답지 않은' 원인을 데이터로 규명하고 생성 정책을 재설계했습니다. 감이 아니라 데이터로 기획한 경험.",
      "난이도를 '성격'이 아니라 '고객과의 접점'으로 재정의해, tone·인내심·되묻기가 하나의 축에서 파생되는 일관된 설계를 만들었습니다.",
      "관찰된 실패(정답 유출·채점자화)를 프롬프트 규칙으로 되돌리는 방식으로 리얼리즘을 끌어올렸습니다. 기획은 문서가 아니라 규칙으로 증명된다는 것을 체득.",
      "여러 LLM을 벤더 중립 프록시로 비교·교체 가능하게 설계해, 모델 선택을 코드가 아닌 의사결정의 문제로 만들었습니다.",
      "기획과 웹을 단독으로 맡고 앱·서버 개발자와 협업하며, 요구를 기능 단위로 구조화해 개발자와 정확한 언어로 소통하는 역할을 실제로 수행 중입니다.",
    ],
  };
}

function getGoormthonData() {
  return {
    id: "goormthon",
    title: "Quick Network — IT 컨퍼런스 네트워킹 솔루션",
    summary:
      "구름톤 부트캠프 프론트엔드 1회차에서 기획자, 디자이너, 백엔드 개발자와 함께 개발한 대규모 IT 컨퍼런스 참가자 네트워킹 서비스입니다.",
    role: "Frontend Developer (3인)",
    period: "구름톤 프론트엔드 1회차",
    tags: ["React", "TypeScript", "Tailwind CSS", "Figma", "Team Project"],
    links: {
      github: "https://github.com/goorm-CHACHA/FE",
    },
    sections: [
      {
        icon: "bi bi-flag",
        title: "프로젝트 개요",
        content: `
          <p><strong>Quick Network</strong>는 대규모 IT 컨퍼런스에서 참가자 간 네트워킹을 지원하는 서비스입니다.</p>
          <p>사용자 정보 기반의 매칭 시스템을 통해 참가자들이 더 빠르고 효과적으로 연결될 수 있도록 지원하며, 네트워킹 존을 마련하여 현장감을 극대화하는 것을 목적으로 합니다.</p>
          <p><a href="https://github.com/goorm-CHACHA/FE" target="_blank"><strong>GitHub Repository &rarr;</strong></a></p>
        `,
        images: [
          {
            src: qnOverviewImg,
            alt: "Quick Network 서비스 소개 — 모바일 화면 및 프로젝트 정보",
          },
          {
            src: qnServiceImg,
            alt: "Service Overview — 의미 있는 연결을 만드는 네트워킹 솔루션",
          },
        ],
      },
      {
        icon: "bi bi-lightbulb",
        title: "기획 배경 및 문제 정의",
        content: `
          <p>IT 컨퍼런스 참가자의 <strong>70% 이상</strong>이 네트워킹을 가장 중요한 요소로 꼽지만, 실제로는 명확한 목표 설정의 어려움, 일정 관리의 복잡성, 불편한 참여 절차, 경력자 중심의 편향된 환경 등 <strong>4가지 핵심 문제</strong>가 존재했습니다.</p>
          <p>'효과적인 네트워킹 경험' 제공이 참가자 유치를 극대화하기 위한 포인트임을 도출하고, 이를 해결하기 위한 서비스를 기획했습니다.</p>
        `,
        images: [
          {
            src: qnWhyImg,
            alt: "Why: 기획배경 — 기업의 주최 목적과 참가자의 참가 목적 분석",
          },
          { src: qnProblemImg, alt: "What: 문제정의 — 4가지 핵심 문제점 도출" },
        ],
      },
      {
        icon: "bi bi-qr-code-scan",
        title: "기능 설계",
        content: `
          <p>도출된 문제를 해결하기 위해 <strong>5가지 핵심 기능</strong>을 설계했습니다.</p>
          <ul>
            <li><strong>네트워킹 존 운영</strong> — 참가자가 자유롭게 네트워킹할 수 있는 공간 제공, 대형 스크린을 통한 실시간 현황 노출</li>
            <li><strong>1:1 & 그룹 매칭</strong> — 직무, 관심 분야, 네트워킹 목적 기반 맞춤형 매칭 (최대 4인)</li>
            <li><strong>실시간 채팅</strong> — 매칭 수락 후 자동 채팅방 생성, 세션 일정 공유 기능</li>
            <li><strong>테이블 시스템</strong> — QR 촬영으로 테이블 자동 배정, 사용 제한 시간 및 예약 기능</li>
            <li><strong>온라인 명함 교환</strong> — QR 코드 스캔으로 간편하게 명함 교환 및 자동 저장</li>
          </ul>
        `,
        images: [
          {
            src: qnFeaturesImg,
            alt: "How: 기능 설계 — 5가지 핵심 기능과 해결방안",
          },
        ],
      },
      {
        icon: "bi bi-palette",
        title: "UX/UI 디자인",
        content: `
          <p>서비스의 <strong>진입장벽을 낮추는 디자인 전략</strong>을 적용했습니다. 후킹 문구로 몰입과 유입을 높이고, 캐릭터 롤링으로 흥미를 유발하며, 기기별 맞춤형 진입 플로우를 제공합니다.</p>
          <p><strong>홈 화면</strong>에서는 필터 기반 탐색 UX, 네트워킹 스위치를 통한 참여 상태 시각화, 한눈에 보는 참가자 현황 등을 설계하여 사용자 탐색 효율을 높였습니다.</p>
        `,
        images: [
          {
            src: qnDesignImg,
            alt: "서비스의 진입장벽을 낮추는 디자인 전략 — UX Writing, 캐릭터 시각화",
          },
          {
            src: qnHomeImg,
            alt: "사용자 탐색 효율을 높이는 홈 화면 설계 — 필터, 매칭 상태, 프로필",
          },
        ],
      },
      {
        icon: "bi bi-code-slash",
        title: "프론트엔드 구현",
        content: `
          <p>컴포넌트 단위로 구조화하여 <strong>재사용성과 유지보수성</strong>을 향상시켰습니다.</p>
          <ul>
            <li><strong>사전등록 페이지</strong> — React-hook-form & zod를 통한 유연한 폼 상태 관리 및 유효성 검사, 오류 메시지 실시간 표시</li>
            <li><strong>랜딩 페이지</strong> — 사용자 데이터를 동적으로 가져와 롤링 효과 적용, 실시간 렌더링 구현</li>
            <li><strong>매칭 페이지</strong> — 카드 + 모달 조합으로 1:1 및 그룹 매칭 UX 제공</li>
            <li><strong>1:1 실시간 채팅</strong> — 백엔드 API 연동을 통한 채팅방 생성·메시지 송수신 구현, WebSocket 기반 실시간 통신 처리 및 API 스펙 조율 과정에서의 프론트-백 협업 경험</li>
          </ul>
        `,
        images: [
          {
            src: qnPagesImg,
            alt: "컴포넌트 구조화 — 사전등록, 랜딩, 매칭 페이지 구현",
          },
        ],
      },
      {
        icon: "bi bi-people",
        title: "팀 구성 및 협업",
        content: `
          <p>기획자, 디자이너, 백엔드 개발자, 프론트엔드 개발자가 함께 <strong>실무와 동일한 협업 프로세스</strong>로 진행했습니다.</p>
          <ul>
            <li><strong>기획자</strong> — 요구사항 정의, 화면 흐름 설계</li>
            <li><strong>디자이너</strong> — UI/UX 디자인, 디자인 시스템 구성</li>
            <li><strong>프론트엔드 3인 (담당)</strong> — 화면 구현, API 연동, 1:1 실시간 채팅 등 인터랙션 개발</li>
            <li><strong>백엔드</strong> — API 설계 및 구현, 매칭 알고리즘, 데이터베이스 관리</li>
          </ul>
        `,
      },
    ],
    takeaways: [
      "기획자, 디자이너, 백엔드 개발자와의 실전 협업을 통해 커뮤니케이션과 역할 분담의 중요성을 배웠습니다.",
      "1:1 실시간 채팅 기능을 구현하며 백엔드 API 연동의 복잡성을 체감하고, API 스펙 조율 능력을 키웠습니다.",
      "디자인 시안을 코드로 구현하며 디자이너와의 협업 방식을 체득했습니다.",
      "백엔드 개발자와의 소통 과정에서 기술적 커뮤니케이션의 중요성을 깊이 배웠습니다.",
    ],
  };
}

function getHanipMapData() {
  return {
    id: "hanip-map",
    title: "한입맵 — 친구와 함께 쓰는 맛집 지도 PWA",
    summary:
      "친구와 둘이 모은 맛집을 지도에 기록하고, 위치 기반으로 다음 갈 곳을 찾는 PWA. '실사용자 2명'이라는 명확한 맥락 위에서 표준이 아니라 '우리에게 맞는 최선'을 기준으로 기능과 스코프를 결정한 개인 기획·개발 프로젝트입니다.",
    tags: [
      "제품 기획",
      "사용자 정의",
      "제품 의사결정",
      "Next.js 16",
      "Supabase",
      "PWA",
    ],
    role: "기획 · 풀스택 개발 (단독)",
    period: "2026.04",
    links: {
      live: "https://hanip-map.vercel.app/",
      github: "https://github.com/choeun224-cey/hanip-map",
    },
    sections: [
      {
        icon: "bi bi-info-circle",
        title: "문제 정의와 사용자",
        content: `
          <p>친구와 함께 쌓은 맛집 정보가 스프레드시트·카카오맵 즐겨찾기·메모장에 흩어져 있어, "가본 곳 / 가고 싶은 곳"을 한눈에 보고 다음에 갈 곳을 고르기 어려웠습니다. 이 문제를 풀기 위한 도구를 직접 기획하고 구현했습니다.</p>
          <p>핵심은 <strong>사용자를 '친구 2명'으로 명확히 정의</strong>한 것입니다. 불특정 다수가 아니라 실제 사용자 2명이 정해져 있으니, 일반 서비스의 관습(OAuth·실시간 동기화·사용자별 권한 분리)을 그대로 따르지 않고 <strong>"이 2명에게 정말 필요한가"</strong>를 기준으로 기능을 다시 판단할 수 있었습니다.</p>
        `,
      },
      {
        icon: "bi bi-image",
        title: "화면 미리보기",
        content: `
          <p>실제 운영 중인 한입맵의 주요 화면입니다. 데스크탑과 모바일(PWA) 양쪽 모두 동일한 사용 경험을 제공하도록 반응형으로 구현했습니다.</p>
        `,
        screens: [
          {
            label: "로그인",
            desc: "단일 카드 + 핀 + 젓가락 로고. 모바일 PWA에서도 동일한 UI로 통일감 확보.",
            desktop: { src: hanipLoginImg, alt: "데스크탑 로그인 화면" },
            mobile: { src: hanipMobileLogin, alt: "모바일 로그인 화면" },
          },
          {
            label: "메인 — 지도 + 리스트",
            desc: "데스크탑은 사이드바 리스트 + 지도를 한 화면에 함께 노출. 모바일은 화면이 좁아 지도 뷰와 리스트 뷰를 분리하여 같은 데이터를 다른 시점으로 제공.",
            desktop: { src: hanipHomeImg, alt: "데스크탑 메인 — 사이드바 리스트 + 지도" },
            mobiles: [
              { src: hanipMobileMap, alt: "모바일 지도 뷰", label: "Mobile · 지도" },
              { src: hanipMobileList, alt: "모바일 리스트 뷰", label: "Mobile · 리스트" },
            ],
          },
          {
            label: "오늘의 한 입",
            desc: "'뭐 먹지' 고민을 줄이기 위한 랜덤 추천. '가고싶음' 상태의 식당 중에서 무작위로 한 곳을 골라줌. 데스크탑·모바일 모두 동일한 동선.",
            desktop: { src: hanipRandomWeb, alt: "데스크탑 오늘의 한 입 추천 화면" },
            mobile: { src: hanipMobileRandom, alt: "모바일 오늘의 한 입 추천 화면" },
          },
          {
            label: "시트 일괄 가져오기",
            desc: "기존 스프레드시트 300+ 행을 권역별 4개 영역에 붙여넣고 일괄 변환. 모바일에서도 동일한 UX 제공.",
            desktop: { src: hanipImportImg, alt: "데스크탑 시트 가져오기 화면" },
            mobile: { src: hanipMobileImport, alt: "모바일 시트 가져오기 화면" },
          },
        ],
      },
      {
        icon: "bi bi-diagram-3",
        title: "제품 의사결정 — 표준이 아닌 '우리에게 맞는 최선'",
        content: `
          <p>기획에서 가장 신경 쓴 부분입니다. "관습적으로 이렇게 한다"가 아니라 <strong>실제 사용 시나리오와 유지보수 비용</strong>을 기준으로, <strong>넣지 않을 것을 정하는 스코프 결정</strong>을 내렸습니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-people",
            title: "단일 공유 데이터 모델",
            desc: "사용자별 별점·방문여부를 분리하지 않음. 데이터를 나누면 입력 마찰만 늘고, '친구 둘의 공용 맛집 리스트'에는 합의된 단일 별점·메모가 더 맞는다고 판단.",
          },
          {
            icon: "bi bi-key",
            title: "인증 방식 3차 변경",
            desc: "Kakao OAuth → Google OAuth → 이메일/비번. 사용자 2명 고정 환경에서는 OAuth의 '비밀번호 관리 부담 회피' 이점이 적용되지 않음을 체감. 표준 ≠ 최선.",
          },
          {
            icon: "bi bi-arrow-clockwise",
            title: "Realtime 대신 명시적 새로고침",
            desc: "실시간 동기화는 가능했지만 둘이 동시에 쓰는 빈도가 낮아 복잡도 비용이 더 컸음. 사용성 손실 없이 유지보수 부담을 덜어냄.",
          },
        ],
      },
      {
        icon: "bi bi-list-check",
        title: "핵심 기능과 우선순위",
        content: `
          <p>"기록하고 → 찾고 → 옮겨오는" 실제 사용 흐름을 기준으로 기능 우선순위를 잡았습니다.</p>
          <ul>
            <li><strong>지도 기반 기록</strong> — 카카오 검색으로 좌표·주소 자동 수집, 가봤음/가고싶음 상태별 마커 색 구분</li>
            <li><strong>위치 기반 찾기</strong> — 현재 위치에서 가까운 순으로 정렬해 "지금 근처에 갈 곳" 탐색</li>
            <li><strong>기존 데이터 이관</strong> — 스프레드시트 300+ 행을 자동 지오코딩·권역 판별로 일괄 마이그레이션</li>
            <li><strong>통합 검색·필터</strong> — 이름·주소·메모·카테고리·태그 통합 검색 + 권역·방문여부 다중 필터</li>
          </ul>
          <p>특히 <strong>기존 데이터 이관을 최우선</strong>으로 올린 건, "이미 쌓아둔 300곳을 옮기지 못하면 아무도 안 쓴다"는 사용자 관점의 판단이었습니다. 기능 우선순위를 기술 난이도가 아니라 <strong>진입장벽 기준</strong>으로 잡은 사례입니다.</p>
        `,
      },
      {
        icon: "bi bi-stack",
        title: "기술 — 기획한 것을 직접 구현",
        content: `
          <p>기획만 한 게 아니라 <strong>프론트·DB·인증·배포까지 풀스택을 단독으로</strong> 구현해, 기획한 것을 실제 동작하는 서비스로 만들었습니다.</p>
          <ul>
            <li>Next.js 16 · React 19 · TypeScript · Tailwind v4</li>
            <li>Supabase(PostgreSQL·Storage·Auth) · Vercel 자동 배포</li>
            <li>Kakao Maps SDK + Local API(지오코딩) · PWA 홈화면 설치</li>
          </ul>
          <p>외부 SDK·OAuth 통합에서 막힌 이슈들은 우회하거나 구조를 바꿔 해결했습니다. 이 '개발까지 되는' 점이, 개발자와 같은 언어로 대화하며 기획하는 데 그대로 힘이 됩니다.</p>
        `,
      },
    ],
    takeaways: [
      "불특정 다수가 아니라 '실사용자 2명'으로 타깃을 명확히 정의하니, 넣을 기능과 뺄 기능(스코프)이 선명해졌습니다. 사용자 정의가 기획의 출발점이라는 걸 체득.",
      "'표준 = 최선'이 아니라는 걸 체감. 관습(OAuth·실시간 동기화)을 사용자 맥락에 비춰 덜어내는 결정이 오히려 더 좋은 경험을 만들었습니다.",
      "'기존 300곳 이관'을 최우선으로 둔 것처럼, 기능 우선순위를 기술 난이도가 아니라 사용자 진입장벽 기준으로 판단했습니다.",
      "기획한 것을 직접 풀스택으로 구현해봤기에, 개발자와 API·데이터·예외처리를 같은 언어로 이야기할 수 있습니다.",
    ],
  };
}
</script>

<style lang="scss">
.detail {
  &__hero {
    background: $gray-50;
    padding: $sp-96 0 $sp-64;

    @include mobile {
      padding: $sp-64 0 $sp-40;
    }
  }

  &__back {
    display: inline-block;
    font-size: $font-size-sm;
    color: $gray-500;
    margin-bottom: $sp-24;
    transition: color $transition-fast;

    &:hover {
      color: $primary-600;
    }
  }

  &__tags {
    display: flex;
    gap: $sp-8;
    flex-wrap: wrap;
    margin-bottom: $sp-16;
  }

  &__tag {
    @include tag;
  }

  &__title {
    @include heading-xl;
    color: $gray-900;
    margin-bottom: $sp-16;
  }

  &__summary {
    @include body-text;
    color: $gray-500;
    max-width: 700px;
    margin-bottom: $sp-32;
  }

  &__meta {
    display: flex;
    gap: $sp-40;
    flex-wrap: wrap;

    div {
      dt {
        font-size: $font-size-xs;
        color: $gray-400;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: $sp-4;
      }

      dd {
        font-size: $font-size-sm;
        color: $gray-700;
        font-weight: $font-weight-medium;
      }
    }
  }

  // Links (Live / GitHub)
  &__links {
    display: flex;
    gap: $sp-12;
    margin-top: $sp-32;
    flex-wrap: wrap;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: $sp-8;
    padding: $sp-12 $sp-20;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    transition: all $transition-base;

    i {
      font-size: $font-size-base;
    }

    &--live {
      background: $primary-600;
      color: $white;

      &:hover {
        background: $primary-700;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba($primary-600, 0.3);
      }
    }

    &--github {
      background: $gray-900;
      color: $white;

      &:hover {
        background: $black;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba($gray-900, 0.3);
      }
    }
  }

  // Content Sections
  &__section {
    &--alt {
      background: $gray-50;
    }
  }

  &__section-title {
    @include heading-md;
    color: $gray-900;
    margin-bottom: $sp-24;
    display: flex;
    align-items: center;
    gap: $sp-12;
  }

  &__section-icon {
    color: $primary-500;
    font-size: 1.25em;
  }

  &__section-content {
    @include body-text;
    color: $gray-600;
    max-width: 750px;

    p {
      margin-bottom: $sp-16;
    }

    strong {
      color: $gray-800;
    }

    ul {
      margin: $sp-12 0;
      padding-left: $sp-24;

      li {
        margin-bottom: $sp-8;
        position: relative;

        &::before {
          content: "•";
          position: absolute;
          left: -$sp-16;
          color: $primary-500;
        }
      }
    }
  }

  // Images
  &__images {
    display: flex;
    flex-direction: column;
    gap: $sp-24;
    margin-top: $sp-24;
    max-width: 100%;
  }

  &__image-wrap {
    margin: 0;
  }

  &__image {
    width: 100%;
    border-radius: $radius-lg;
    border: 1px solid $gray-100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &__image-caption {
    margin-top: $sp-8;
    font-size: $font-size-xs;
    color: $gray-400;
    text-align: center;
  }

  // Code Block
  &__code {
    margin-top: $sp-24;
    border-radius: $radius-lg;
    overflow: hidden;
    max-width: 750px;
  }

  &__code-header {
    background: $gray-800;
    padding: $sp-8 $sp-16;
    font-size: $font-size-xs;
    color: $gray-400;
  }

  pre {
    background: $gray-900;
    padding: $sp-24;
    overflow-x: auto;

    code {
      font-family: "Fira Code", "Consolas", monospace;
      font-size: $font-size-sm;
      color: $gray-100;
      line-height: $line-height-relaxed;
    }
  }

  // Comparison Table
  &__comparison {
    margin-top: $sp-24;
    max-width: 600px;

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: $sp-12 $sp-16;
      text-align: left;
      font-size: $font-size-sm;
      border-bottom: 1px solid $gray-100;
    }

    th {
      background: $gray-50;
      font-weight: $font-weight-semibold;
      color: $gray-700;
    }

    .before {
      color: $error;
    }
    .after {
      color: $success;
      font-weight: $font-weight-semibold;
    }
  }

  // Feature Cards
  &__feature-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $sp-20;
    margin-top: $sp-32;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  // Spec Table
  &__spec-table {
    margin-top: $sp-24;
    overflow-x: auto;
    border-radius: $radius-lg;
    border: 1px solid $gray-200;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }

    th,
    td {
      padding: $sp-12 $sp-16;
      text-align: left;
      font-size: $font-size-sm;
      border-bottom: 1px solid $gray-100;
    }

    th {
      background: $primary-50;
      font-weight: $font-weight-semibold;
      color: $primary-700;
      font-size: $font-size-xs;
      white-space: nowrap;
    }

    td {
      color: $gray-700;

      code {
        background: $primary-50;
        color: $primary-700;
        padding: 2px $sp-8;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-family: "Fira Code", "Consolas", monospace;
        margin-right: $sp-4;
      }

      strong {
        color: $gray-900;
      }
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: $gray-50;
    }
  }
}

// ============================================
// Device Pair Gallery (Desktop + Mobile)
// ============================================
.device-gallery {
  display: flex;
  flex-direction: column;
  gap: $sp-64;
  margin-top: $sp-32;
}

.device-screen {
  &__label {
    display: inline-flex;
    align-items: center;
    padding: $sp-4 $sp-12;
    margin-bottom: $sp-16;
    border-radius: $radius-full;
    background: $primary-50;
    color: $primary-700;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
  }

  &__row {
    display: flex;
    gap: $sp-32;
    align-items: flex-end;
    flex-wrap: wrap;

    @include mobile {
      gap: $sp-16;
    }
  }

  &__desc {
    margin-top: $sp-16;
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: $line-height-relaxed;
  }
}

.device-frame {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__caption {
    margin-top: $sp-8;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $gray-400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  // ── Desktop frame (browser-like) ──
  &--desktop {
    flex: 1;
    min-width: 0;
    max-width: 720px;

    .device-frame__bar {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: $gray-100;
      border-radius: $radius-lg $radius-lg 0 0;
      border: 1px solid $gray-200;
      border-bottom: none;

      span {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: $gray-300;

        &:nth-child(1) { background: #ff5f57; }
        &:nth-child(2) { background: #febc2e; }
        &:nth-child(3) { background: #28c840; }
      }
    }

    .device-frame__img {
      border-radius: 0 0 $radius-lg $radius-lg;
      border: 1px solid $gray-200;
      border-top: none;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      aspect-ratio: 1904 / 1112;
    }
  }

  // ── Mobile frame (phone-like) ──
  &--mobile {
    flex-shrink: 0;
    width: 240px;
    position: relative;
    padding: 12px 8px;
    border-radius: 36px;
    background: $white;
    border: 1px solid $gray-200;
    box-shadow:
      0 18px 40px rgba(15, 23, 42, 0.18),
      0 6px 12px rgba(15, 23, 42, 0.10);

    .device-frame__img {
      border-radius: 24px;
      aspect-ratio: 648 / 1381;
      border: 1px solid $gray-100;
    }

    .device-frame__caption {
      color: $gray-500;
    }

    @include mobile {
      width: 200px;
    }
  }
}

// Feature Card
.feature-card {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: $radius-lg;
  padding: $sp-24;
  transition: all $transition-base;

  &:hover {
    border-color: $primary-200;
    box-shadow: $shadow-md;
    transform: translateY(-2px);
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: $radius-md;
    background: $primary-50;
    color: $primary-600;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-lg;
    margin-bottom: $sp-16;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $gray-900;
    margin-bottom: $sp-8;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: $line-height-relaxed;
    margin-bottom: $sp-12;
  }

  &__example {
    display: flex;
    align-items: center;
    gap: $sp-8;
    padding: $sp-8 $sp-12;
    background: $gray-50;
    border-radius: $radius-md;
    border: 1px solid $gray-100;

    code {
      font-family: "Fira Code", "Consolas", monospace;
      font-size: $font-size-xs;
      color: $primary-700;
      word-break: break-all;
    }
  }

  &__example-label {
    font-size: 10px;
    font-weight: $font-weight-semibold;
    color: $gray-400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
}

// Takeaways
.takeaways {
  background: $primary-50;

  &__title {
    @include heading-md;
    color: $gray-900;
    margin-bottom: $sp-32;
  }

  &__list {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: $sp-20;
  }

  &__item {
    @include body-text;
    color: $gray-700;
    padding-left: $sp-24;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $primary-500;
    }
  }
}
</style>

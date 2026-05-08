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
import axios from "axios";
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

const route = useRoute();
const project = ref(null);

onMounted(async () => {
  const id = route.params.id;

  try {
    const { data } = await axios.get(`/api/projects/${id}`);
    project.value = data;
  } catch {
    // fallback 데이터
    const fallbacks = {
      "fs-ds": getFsDsData,
      "voca-training": getVocaTrainingData,
      goormthon: getGoormthonData,
      "hanip-map": getHanipMapData,
    };
    if (fallbacks[id]) {
      project.value = fallbacks[id]();
    }
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
    title: "Voca Training — AI 콜봇 트레이너",
    summary:
      "LLM과 음성 인터페이스를 결합한 인터랙티브 롤플레이 트레이너. 시장의 흔한 'AI 영업 트레이닝 SaaS'와 다르게 '점수가 아니라 코칭'에 초점을 두고 평가 시스템을 설계했고, 벤더 중립 LLM abstraction과 Mock 모드 등 비용·환경 의사결정도 함께 포함된 사이드 프로젝트입니다.",
    role: "기획·디자인·풀스택 (단독)",
    period: "2026.05 — 진행 중",
    tags: ["Vue 3", "Vite", "Gemini API", "Web Speech API", "LLM", "localStorage"],
    sections: [
      {
        icon: "bi bi-flag",
        title: "프로젝트 개요",
        content: `
          <p>실무에서 다루던 <strong>AI콜 도메인</strong>을 개인 프로젝트로 확장하여, LLM과 음성 인터페이스를 결합한 <strong>인터랙티브 롤플레이 트레이너</strong>를 단독 기획·구현 중입니다.</p>
          <p>보험 TM 상담사가 AI 콜봇과 실시간 음성 또는 키보드 입력으로 영업 시나리오를 훈련할 수 있는 SaaS 형태이며, <strong>도메인은 보험 TM이지만 같은 구조로 의료·교육·고객응대 등 어떤 시뮬레이션 트레이닝에도 적용 가능한 아키텍처</strong>로 설계했습니다.</p>
        `,
      },
      {
        icon: "bi bi-bullseye",
        title: "시장의 한계와 차별화 의도",
        content: `
          <p>기존 'AI 영업 트레이닝 SaaS'들은 통화가 끝나면 보통 <strong>점수만 보여주고 끝납니다</strong>. "84점입니다." 사용자는 "왜 84점이지? 어디서 깎였지? 다음엔 뭘 해야 하지?"를 모르니까 트레이닝 효과가 떨어집니다.</p>
          <p>그래서 LLM 평가 시스템을 다르게 설계했습니다. <strong>점수가 아니라 코칭</strong>을 주는 트레이너로요.</p>
        `,
      },
      {
        icon: "bi bi-lightbulb",
        title: "차별화 ① — 점수가 아닌 코칭",
        content: `
          <p>각 KPI마다 <strong>세 가지를 강제</strong>했습니다 — 점수 / 근거가 된 실제 발화 / 다음 통화에서 적용 가능한 구체 액션.</p>
          <p>그리고 시스템 프롬프트에 <strong>"추상 조언 금지" 규칙</strong>을 박아서, LLM이 "공감을 더 표현하세요" 같은 형식적 답을 못 하게 막았습니다. 반드시 발화 단위 액션으로만 답하게.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-bar-chart",
            title: "점수 + 시각화",
            desc: "기본 — 5개 KPI(공감·통화 유지·열린 질문·거절 회복·다음 약속)로 0~100점 채점하고 점수바·색상으로 시각화.",
          },
          {
            icon: "bi bi-quote",
            title: "근거가 된 실제 발화 인용",
            desc: '점수 산출 근거가 된 상담사의 실제 발화를 그대로 인용. 사용자가 입력한 자기 발화가 화면에 나오니 "AI가 진짜 분석한다"는 인상을 줍니다.',
            example: '"또 필요한 사항은 없으세요?"',
          },
          {
            icon: "bi bi-lightning-charge",
            title: "발화 단위 액션",
            desc: "추상 조언 X. '공감을 더'가 아니라 '거절 직후 「걱정 많이 되셨겠어요」를 1회 추가'처럼 다음 통화에서 바로 적용 가능한 구체 액션으로 답하게.",
          },
        ],
      },
      {
        icon: "bi bi-diagram-3",
        title: "차별화 ② — 벤더 중립 LLM Abstraction",
        content: `
          <p>LLM API 변경(Anthropic Claude → Google Gemini)을 미리 가정하고, <strong>호출자(컴포넌트)는 어떤 벤더를 쓰는지 모르게</strong> 설계했습니다.</p>
          <p>모든 LLM 호출은 <code>llmClient.chat()</code> 단일 진입점을 거치고, 실제 벤더 변환은 <strong>vite dev proxy 한 곳</strong>에서만 일어납니다. 메시지 형식(<code>{role, content}</code>)은 Anthropic 스타일로 통일하고, Gemini의 <code>{role, parts}</code> 형식으로는 프록시에서만 변환.</p>
          <p>실제로 Claude → Gemini 전환 시, <strong>컴포넌트·평가 로직·페르소나 프롬프트는 한 줄도 안 바뀌었고</strong> 프록시와 모델명·.env 키 이름만 교체했습니다.</p>
        `,
        code: `// llmClient.js — 호출자가 보는 단일 진입점
export async function chat({ messages, system, model, max_tokens }) {
  return fetch('/api/chat', { ... }).then(r => r.json())
}

// vite.config.js — 벤더 변환은 이 파일에만 갇힘
function geminiProxy(env) {
  // {role, content} → {role, parts} 변환
  // Anthropic 호환 응답 형태로 다시 변환
}`,
        codeLabel: "단일 abstraction + 프록시 변환",
      },
      {
        icon: "bi bi-piggy-bank",
        title: "차별화 ③ — Mock 모드로 비용·시연 안전성 분리",
        content: `
          <p>Gemini 무료 티어가 일일 한도 20회로 빠듯해서, <strong>Mock 모드</strong>를 별도로 깔았습니다. Settings 토글 ON/OFF로 즉시 전환 가능, ON 시 LLM 호출 0회.</p>
          <p>Mock 응답이 그냥 하드코딩이면 어색하니까, <strong>사용자가 입력한 실제 발화를 정규식으로 추출해서 평가의 quote에 자동 끼워 넣게</strong> 했습니다. mock인데도 personalize됨.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-toggles",
            title: "단일 진입점 분기",
            desc: "evaluator/customer 함수 첫 줄에서 isDemoMode() 체크. 호출자(컴포넌트)는 데모 모드 존재 자체를 모르고 동일하게 사용.",
          },
          {
            icon: "bi bi-search",
            title: "사용자 발화 자동 매칭",
            desc: '정규식 패턴으로 KPI별 키워드 매칭. 닫힌 질문엔 "없으세요·맞으시죠", 거절 회복엔 "잠깐·짧게" 등. 사용자의 진짜 발화가 quote에 들어감.',
            example: "/(없으세요|있으세요)/.test(line)",
          },
          {
            icon: "bi bi-cash-coin",
            title: "비용 0 + 즉시 토글",
            desc: "데모 모드 ON 시 LLM 호출 0회. localStorage 토글이라 새로고침해도 유지. 평소 개발·시연용으로 무료 티어 보존.",
          },
        ],
      },
      {
        icon: "bi bi-keyboard",
        title: "키보드 입력 모드 (STT fallback)",
        content: `
          <p>브라우저 음성 인식(SpeechRecognition API)은 환경에 따라 마이크 권한·HTTPS·디바이스 문제로 작동 안 할 수 있어요. <strong>면접장 시연이 STT 실패로 무너지지 않도록</strong> 키보드 입력 모드를 footer 토글로 추가했습니다.</p>
          <p>키보드 모드 활성화 시 스크립트 자동 진행이 멈추고, 사용자가 직접 발화를 입력 → LLM이 페르소나로 응답 → 다시 입력 흐름. 시연 보장용 안전장치이자 면접장 자유로움 확보.</p>
        `,
      },
      {
        icon: "bi bi-clock-history",
        title: "세션 히스토리 영구 저장",
        content: `
          <p>모든 트레이닝 세션을 <code>localStorage</code>에 자동 누적합니다. 통화 종료 시 utterances·평가 결과·duration이 함께 저장돼서, 새로고침해도 유지.</p>
          <p>핵심 디테일: <strong>한 번 평가된 세션은 재호출하지 않습니다</strong>. 히스토리에서 클릭하면 저장된 평가가 0초 만에 재표시. Vue watcher로 lastReport.id 변경을 감지 → 저장된 evaluation을 즉시 ev에 주입.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-save",
            title: "자동 영구 저장",
            desc: "endCall 시점에 sessionHistory에 push, deep watcher로 localStorage에 자동 직렬화. 최대 100건 cap.",
          },
          {
            icon: "bi bi-arrow-clockwise",
            title: "재호출 없는 재조회",
            desc: "히스토리에서 클릭 → setLastReport → watcher가 evaluation을 ev에 즉시 동기화. 재호출 없이 0초 표시.",
          },
          {
            icon: "bi bi-graph-up",
            title: "트렌드 추적",
            desc: "평균 점수, 이번 달 건수를 자동 집계. 한 번의 시연이 아닌 시간에 따른 개선이 트레이닝 SaaS의 본질.",
          },
        ],
      },
      {
        icon: "bi bi-arrow-repeat",
        title: "React POC → Vue 마이그레이션",
        content: `
          <p>초기엔 <strong>React + Babel inline</strong>으로 빠르게 POC를 만들어 핵심 인터랙션(시나리오 진행, STT/TTS, 점수 갱신)을 검증했습니다. 검증 후 운영 코드 수준으로 끌어올리기 위해 <strong>Vue 3 + Vite로 전면 마이그레이션</strong>.</p>
          <ul>
            <li>레거시 React 원본은 <code>_legacy_react/</code>에 보존하여 변환 전후 비교 가능</li>
            <li>React의 <code>useState</code>/<code>useEffect</code> 패턴을 Vue의 <code>ref</code>/composables로 이관</li>
            <li>두 프레임워크의 상태·렌더링 모델 차이 직접 경험</li>
          </ul>
        `,
      },
      {
        icon: "bi bi-stack",
        title: "기술 스택과 의사결정",
        content: `
          <ul>
            <li><strong>Frontend</strong> — Vue 3 + Vite</li>
            <li><strong>LLM</strong> — Google Gemini 2.5 Flash (무료 티어). 단일 abstraction으로 추후 Claude·OpenAI 등으로 교체 가능</li>
            <li><strong>음성</strong> — Web Speech API (STT/TTS, 데모용). 운영 단계에서는 Clova/Google STT로 교체 가능한 <code>useSpeech</code> composable로 추상화</li>
            <li><strong>저장소</strong> — localStorage (세션 히스토리·데모 모드 토글). 추후 백엔드 도입 시 어댑터 교체로 마이그레이션 가능</li>
            <li><strong>스타일</strong> — Vanilla CSS + CSS Variables (oklch 컬러 토큰)</li>
          </ul>
          <p><strong>왜 Gemini 무료 티어?</strong> — 비용 0으로 시연·테스트 가능. 한도 부족분은 Mock 모드로 보완하여 실시연을 100% 보장.</p>
          <p><strong>왜 LLM abstraction?</strong> — 벤더 락인 회피. 실제로 Claude → Gemini 전환을 4~5줄로 마쳤음.</p>
        `,
      },
      {
        icon: "bi bi-signpost-2",
        title: "진행 현황 및 다음 단계",
        content: `
          <p>현재 <strong>MVP 1차 골든패스</strong>가 완성된 상태입니다 — 로그인 → 대시보드 → 시나리오 선택 → 트레이닝(키보드 입력) → 통화 종료 → AI 평가 → 히스토리 누적 → 재조회까지의 흐름이 정상 작동.</p>
          <ul>
            <li><strong>완료</strong> — 평가 시스템 (5개 KPI + reasoning), 벤더 중립 abstraction, Mock 모드, 키보드 입력 fallback, 세션 히스토리 영구 저장, React → Vue 마이그레이션</li>
            <li><strong>다음</strong> — STT 안정화, 시연 영상 녹화, Vercel 정적 배포 (Functions로 LLM 프록시), placeholder 화면(Admin·Dashboard 디테일) 채우기</li>
          </ul>
        `,
      },
    ],
    takeaways: [
      "기획 단계에서 도메인 정보 구조(IA·시나리오·페르소나·평가체계)를 먼저 정리한 후 코드를 작성하는 흐름을 체득. 화면 이전에 도메인 사고가 먼저.",
      "단일 진입점 abstraction (llmClient·useSpeech·isDemoMode)을 통해 외부 의존성(LLM 벤더·STT 엔진·환경)을 호출자로부터 격리하는 설계 패턴을 익혔습니다.",
      "Mock 모드처럼 환경별 분기를 단일 함수의 첫 줄에서 처리하면, 호출자 코드 변경 없이 비용·시연·테스트가 모두 분리 가능하다는 것을 직접 구현으로 증명.",
      "정규식 패턴 매칭으로 mock 응답을 사용자 입력 기반으로 personalize하는 작은 디테일이 'AI가 진짜 분석한다'는 인상을 만든다는 점 — 작은 디테일이 사용자 경험을 결정.",
      "벤더 중립 메시지 abstraction(Anthropic 스타일 + Gemini 변환 프록시) 덕분에 LLM 전환을 4~5줄로 끝낼 수 있었습니다. 단일 책임 + 인터페이스 분리의 가치 체감.",
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
    title: "한입맵 — 커플 맛집 지도 PWA",
    summary:
      "둘이서 모은 맛집을 지도에 기록하고, 다음 한 입을 찾는 커플 전용 PWA. Next.js 16 + Supabase 풀스택으로 직접 설계·배포한 사이드 프로젝트입니다.",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Tailwind v4",
      "Kakao Maps",
      "PWA",
    ],
    role: "Full-stack Developer (단독)",
    period: "2026.04",
    links: {
      live: "https://hanip-map.vercel.app/",
      github: "https://github.com/choeun224-cey/hanip-map",
    },
    sections: [
      {
        icon: "bi bi-info-circle",
        title: "프로젝트 개요",
        content: `
          <p>흩어져 있던 맛집 정보(스프레드시트, 카카오맵 즐겨찾기, 메모장)를 한 곳에서 관리할 도구가 필요했습니다. <strong>둘이서 가본 곳 / 가고싶은 곳</strong>을 지도 위에서 시각적으로 파악하고, 위치 기반으로 다음 한 입을 찾을 수 있는 커플 전용 PWA를 직접 설계·구현했습니다.</p>
          <p>실제 사용자 2명(본인 + 남자친구)을 명확히 두고, <strong>"표준이 아닌 최선"</strong>이라는 관점에서 OAuth·실시간 동기화·권한 분리 등을 모두 다시 검토했습니다.</p>
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
        icon: "bi bi-stack",
        title: "기술 스택",
        content: `
          <p>풀스택을 단독 진행하면서, <strong>2명 사용자 규모에 맞는 단순한 구성</strong>을 우선했습니다.</p>
          <ul>
            <li><strong>Frontend</strong> — Next.js 16 (App Router), React 19, TypeScript</li>
            <li><strong>Styling</strong> — Tailwind CSS v4</li>
            <li><strong>Map</strong> — Kakao Maps JavaScript SDK + Local API (지오코딩)</li>
            <li><strong>Backend / DB</strong> — Supabase (PostgreSQL + Storage + Auth)</li>
            <li><strong>Deploy</strong> — Vercel + GitHub 자동 CI/CD</li>
            <li><strong>PWA</strong> — Next.js manifest.ts + ImageResponse API</li>
          </ul>
        `,
      },
      {
        icon: "bi bi-pin-map",
        title: "지도 기반 식당 관리",
        content: `
          <p>카카오 Places API로 식당을 검색하면 <strong>좌표·주소가 자동 수집</strong>되고, 가봤음 / 가고싶음 상태에 따라 마커 색상이 구분됩니다. 마커 클릭 시 부드러운 pan 애니메이션으로 포커스를 이동시켜 사용성을 다듬었습니다.</p>
        `,
      },
      {
        icon: "bi bi-geo-alt",
        title: "위치 기반 가까운 맛집 찾기",
        content: `
          <p>HTML5 Geolocation API로 현재 위치를 받아온 뒤 <strong>Haversine 공식</strong>으로 식당과의 거리를 계산하고, 사이드바에 km/m 단위로 거리순 정렬 결과를 표시합니다.</p>
          <p>현재 위치 마커는 <strong>펄싱 애니메이션</strong>으로 시각화하여 자기 위치를 한눈에 확인할 수 있게 했습니다.</p>
        `,
      },
      {
        icon: "bi bi-file-earmark-spreadsheet",
        title: "구글 시트 일괄 마이그레이션",
        content: `
          <p>기존에 따로 정리해두던 <strong>스프레드시트 300+ 행</strong>을 한 번에 임포트할 수 있는 마이그레이션 도구를 만들었습니다.</p>
          <ul>
            <li>시트엔 좌표 정보가 없어, <strong>카카오 Local API로 자동 지오코딩</strong></li>
            <li>검색 결과 주소를 기준으로 <strong>권역(서울/경기/지방) 자동 판별</strong></li>
            <li>미리보기 화면에서 매칭 결과 검수 후 <strong>일괄 저장</strong></li>
          </ul>
        `,
      },
      {
        icon: "bi bi-search",
        title: "통합 검색 + 다중 필터",
        content: `
          <p>이름·주소·메모·카테고리·태그를 동시에 검색하는 <strong>across-field 검색</strong>과 권역·카테고리·방문여부를 AND 조합하는 다중 필터를 구현했습니다.</p>
          <p>클라이언트 사이드 필터링으로 처리하여 <strong>300건 기준 10ms 이하</strong>의 즉각적인 응답성을 확보했습니다.</p>
        `,
      },
      {
        icon: "bi bi-phone",
        title: "PWA 설치 지원",
        content: `
          <p>Web App Manifest로 홈 화면 설치를 지원하고, <strong>Next.js 16의 ImageResponse API</strong>로 32/180/192/512 다중 사이즈 아이콘을 빌드 타임에 동적 생성했습니다.</p>
          <ul>
            <li>풀스크린 standalone 모드, 테마 컬러 적용</li>
            <li>iOS apple-touch-icon 별도 처리</li>
            <li>핀 + 젓가락 SVG 로고로 favicon · OG image · PWA icon 통일</li>
          </ul>
        `,
      },
      {
        icon: "bi bi-diagram-3",
        title: "아키텍처 결정 — 표준이 아닌 최선",
        content: `
          <p>2명 사용자 폐쇄 앱이라는 명확한 컨텍스트 위에서, "관습적으로 이렇게 한다"가 아니라 <strong>실제 사용 시나리오와 유지보수 비용</strong>을 기준으로 판단했습니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-people",
            title: "단일 공유 데이터 모델",
            desc: "사용자별 별점·방문여부 분리 X. 데이터 구분은 입력 마찰만 늘리며, '우리의 식당 일기장' 컨셉에는 합의된 단일 별점/메모가 더 잘 맞는다고 판단.",
          },
          {
            icon: "bi bi-key",
            title: "인증 방식 3차 변경",
            desc: "Kakao OAuth → Google OAuth → 이메일/비번. 사용자 2명 고정 환경에서는 OAuth의 '비밀번호 관리 부담 회피' 이점이 적용되지 않음을 체감. 표준 ≠ 최선.",
          },
          {
            icon: "bi bi-arrow-clockwise",
            title: "Realtime 대신 명시적 새로고침",
            desc: "Supabase Realtime 구독은 가능했지만 동시 사용 빈도가 낮아 복잡도 비용이 더 큼. 사용성 손실 없이 유지보수 부담 절감.",
          },
        ],
      },
      {
        icon: "bi bi-bug",
        title: "트러블슈팅",
        content: `
          <p>외부 SDK·OAuth·Supabase 통합 과정에서 마주친 이슈들을 분석하고, 우회 또는 구조 변경으로 해결했습니다.</p>
        `,
        featureCards: [
          {
            icon: "bi bi-exclamation-triangle",
            title: "Kakao SDK Production 빌드 실패",
            desc: "dev에서는 통과했지만 Vercel production에서 'Cannot find namespace kakao' 에러. 원인은 module scope 선언 → 별도 ambient 선언 파일(kakao.d.ts)을 declare global로 분리하여 해결.",
          },
          {
            icon: "bi bi-shield-x",
            title: "Supabase Kakao default scope 충돌",
            desc: "Supabase GoTrue 코드에 카카오 provider의 기본 scope(account_email 포함)가 하드코딩되어 KOE205 에러 발생. 라이브러리 추상화의 한계를 인식하고 Google OAuth로 우회 → 최종 email/password로 단순화.",
          },
          {
            icon: "bi bi-link-45deg",
            title: "Kakao redirect URI 등록",
            desc: "JavaScript 키와 REST API 키별로 redirect URI 등록이 분리됨을 발견. Supabase는 server-side flow라 REST API 키 쪽 등록이 필수. 공식 문서에 명시되지 않은 플랫폼별 차이를 직접 확인.",
          },
          {
            icon: "bi bi-window",
            title: "Dialog 시스템 자체 구현",
            desc: "브라우저 alert/confirm은 OS마다 다르게 보여 디자인 일관성 깨짐. React Context + Promise 기반 커스텀 useDialog hook을 30줄 이내로 자체 구현. 외부 라이브러리 의존성 제거.",
          },
        ],
      },
      {
        icon: "bi bi-database",
        title: "데이터 모델",
        content: `
          <p>단일 restaurants 테이블로 시작하되, <strong>좌표 인덱스</strong>를 두어 추후 지도 영역 기반 쿼리로 확장 가능하게 설계했습니다.</p>
          <pre><code>restaurants (
  id uuid PRIMARY KEY,
  name text,
  address text,
  region text,        -- 강남, 홍대 등 세부 지역
  area text,          -- 서울/경기/지방
  category text,      -- 한식/양식/카페 등
  memo text,
  visited boolean,
  rating smallint,    -- 1~5
  lat double precision,
  lng double precision,
  tags text[],
  photos text[],      -- Supabase Storage URLs
  created_at timestamptz
)</code></pre>
        `,
      },
    ],
    takeaways: [
      '"표준 = 최선"이 아니라는 점을 체감했습니다. 사용자 규모(2명)·사용 빈도·보안 요구를 균형 있게 보고, 관습 대신 실제 컨텍스트에 맞는 설계를 선택했습니다.',
      "외부 라이브러리의 추상화 레이어가 항상 충분히 유연하지 않다는 것을 Supabase + Kakao 통합에서 직접 경험했고, 막힐 때 우회 경로를 빠르게 검토하는 판단력을 키웠습니다.",
      "Next.js 16의 새로운 메타데이터 컨벤션(manifest.ts, icon.tsx, opengraph-image.tsx)과 ImageResponse API를 활용해 빌드 타임 이미지 동적 생성을 익혔습니다.",
      "프론트엔드뿐 아니라 DB 스키마·Storage·Auth·배포까지 풀스택을 단독 진행하면서, 시스템 전체를 조망하는 시야를 갖추게 되었습니다.",
      "복잡한 기능보다 사용성을 우선하는 단순화 결정(데이터 분리 X, 실시간 동기화 X, 양방향 시트 동기화 X)이 결국 더 좋은 사용 경험을 만든다는 것을 배웠습니다.",
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

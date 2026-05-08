<template>
  <div class="about">
    <section class="about__hero section">
      <div class="container">
        <h1 class="about__title">About Me</h1>
        <p class="about__subtitle">
          사내 시스템을 기획하고, 표준을 만들고, 운영하는 사람.
        </p>
      </div>
    </section>

    <!-- Profile -->
    <section class="profile section">
      <div class="container">
        <div class="profile__card">
          <div class="profile__photo-wrap">
            <img :src="profilePhoto" alt="JEY 프로필 사진" class="profile__photo" />
          </div>
          <div class="profile__body">
            <h2 class="profile__name">JEY</h2>
            <p class="profile__role">Frontend Developer · 사내 시스템 운영</p>
            <p class="profile__bio">
              SI 증권 프로젝트에서 웹 개발 경력을 시작하여, 구름톤 부트캠프에서
              기획자·디자이너·백엔드 개발자와의 팀 협업을 경험했습니다. 현재
              한일네트웍스 기획팀 소속으로 사내 디자인 시스템(FS-DS)을 단독
              구축·운영하며 65개 컴포넌트의 npm 패키지 라이프사이클을 관리하고
              있습니다. Vanilla JS 기반 컴포넌트 설계, CI/CD 파이프라인 구축,
              번들 최적화(111MB→3.3MB), 사내 표준 가이드 작성 등 "사용하는
              사람을 위한 시스템 운영"에 집중하고 있습니다.
            </p>
            <div class="profile__contact">
              <a href="mailto:choeunyoung224@gmail.com" class="profile__contact-item">
                <i class="bi bi-envelope"></i> choeunyoung224@gmail.com
              </a>
              <a href="https://github.com/cho-eun-young" target="_blank" class="profile__contact-item">
                <i class="bi bi-github"></i> github.com/cho-eun-young
              </a>
              <span class="profile__contact-item">
                <i class="bi bi-geo-alt"></i> Seoul, Korea
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Career Timeline -->
    <section class="timeline section">
      <div class="container">
        <h2 class="timeline__title">Career</h2>
        <div class="timeline__list">
          <div
            v-for="(item, index) in career"
            :key="index"
            class="timeline__item"
          >
            <div class="timeline__marker"></div>
            <div class="timeline__content">
              <span class="timeline__period">{{ item.period }}</span>
              <h3 class="timeline__role">{{ item.role }}</h3>
              <p class="timeline__company">{{ item.company }}</p>
              <p v-if="item.description" class="timeline__desc">
                {{ item.description }}
              </p>
              <ul v-if="item.highlights" class="timeline__highlights">
                <li
                  v-for="(h, i) in item.highlights"
                  :key="i"
                  class="timeline__highlight"
                >
                  {{ h }}
                </li>
              </ul>
              <div v-if="item.tools" class="timeline__tools">
                <span
                  v-for="tool in item.tools"
                  :key="tool"
                  class="timeline__tool-tag"
                >
                  {{ tool }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Education -->
    <section class="education section">
      <div class="container">
        <h2 class="education__title">Education</h2>
        <div class="education__list">
          <div class="education__item">
            <div class="education__marker"></div>
            <div class="education__content">
              <span class="education__period">2016.03 — 2020.02</span>
              <h3 class="education__school">조선대학교</h3>
              <p class="education__major">가구도자디자인과 (4년제)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="certs section">
      <div class="container">
        <h2 class="certs__title">Certifications</h2>
        <div v-for="(group, gIdx) in certGroups" :key="gIdx" class="certs__group">
          <h3 class="certs__group-label">
            <i :class="group.icon" class="certs__group-icon"></i>
            {{ group.label }}
          </h3>
          <p class="certs__group-desc">{{ group.description }}</p>
          <div class="certs__grid">
            <div
              v-for="(cert, index) in group.items"
              :key="index"
              class="certs__item"
            >
              <span class="certs__name">{{ cert.name }}</span>
              <span class="certs__date">{{ cert.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import profilePhoto from "@/assets/images/profile-photo.jpeg";

const career = ref([
  {
    period: "2025.06 — 현재",
    role: "사내 시스템 기획·구현·운영 / 프론트엔드 개발",
    company: "한일네트웍스 FS사업부 기획팀",
    highlights: [
      "사내 웹 디자인 시스템(FS-DS) 설계 및 구축 — Vanilla JS + SCSS 기반 65개 컴포넌트, 1,275개 SVG 아이콘 시스템, GitHub Packages 배포 파이프라인 구축",
      "AIA생명 STT 기반 상담사 관리 시스템(관리자 페이지) 프론트엔드 개발 참여 — 대시보드·상담사 관리·계정 관리 등 관리자 페이지 5종 이상 설계 및 구현, STT 변환된 상담 발화 텍스트를 고객/상담사별로 구분하여 채팅 형태로 시각화하는 상세 뷰 컴포넌트 개발",
      "Notion·Figma·GitHub 기반 팀 협업",
    ],
    tools: ["Vanilla JS", "Vite", "SCSS Modules", "Figma", "GitHub Actions", "Storybook"],
  },
  {
    period: "2024.06 — 2025.04",
    role: "프론트엔드 부트캠프 수강",
    company: "구름톤 프론트엔드 1회차",
    highlights: [
      "기획자·디자이너·백엔드 개발자와 팀을 이루어 IT 컨퍼런스 네트워킹 서비스(Quick Network) 개발",
      "1:1 실시간 채팅 기능 구현 담당 — 백엔드 API 연동 및 실시간 통신 처리",
    ],
    tools: ["React", "TypeScript", "Tailwind CSS", "Figma", "Real-time Chat"],
  },
  {
    period: "2022.06 — 2024.06",
    role: "SI 웹 개발자",
    company: "동양시스템즈 금융사업팀",
    highlights: [
      "KB증권 HTS 직원 통합 단말 시스템 재구축 프로젝트 — HTML/CSS/JS/VBScript 기반 웹 화면 개발, 현업 담당자와 직접 소통하며 요구사항 반영 및 화면 구현",
      "상상인증권 MTS 유지보수 및 신규 콘텐츠 추가 프로젝트 참여",
    ],
    tools: ["HTML", "CSS", "JavaScript", "VBScript"],
  },
]);

const certGroups = ref([
  {
    icon: "bi bi-code-slash",
    label: "개발",
    description: "데이터베이스 설계 및 웹 표준 기반 화면 구현 역량",
    items: [
      { name: "SQLD (SQL 개발자)", date: "2024.04" },
      { name: "웹디자인기능사", date: "2021.12" },
    ],
  },
  {
    icon: "bi bi-palette",
    label: "디자인 도구",
    description: "디자인 전공 기반 — 디자이너와의 원활한 협업 및 시안 직접 구현 가능",
    items: [
      { name: "ACA Photoshop", date: "2021.07" },
      { name: "ACA Illustrator", date: "2021.08" },
      { name: "GTQ", date: "2021.09" },
      { name: "GTQI", date: "2021.09" },
      { name: "컴퓨터그래픽스 운용기능사", date: "2019.12" },
    ],
  },
]);
</script>

<style lang="scss">
.about {
  &__hero {
    background: $gray-50;
    text-align: center;
    padding-bottom: $sp-48;
  }

  &__title {
    @include heading-xl;
    color: $gray-900;
    margin-bottom: $sp-16;
  }

  &__subtitle {
    @include body-text;
    color: $gray-500;
    max-width: 600px;
    margin: 0 auto;
  }
}

// Profile
.profile {
  &__card {
    display: flex;
    gap: $sp-48;
    max-width: 800px;
    margin: 0 auto;
    align-items: flex-start;

    @include mobile {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  &__photo-wrap {
    flex-shrink: 0;
  }

  &__photo {
    width: 160px;
    height: 200px;
    object-fit: cover;
    border-radius: $radius-lg;
    border: 3px solid $gray-100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &__body {
    flex: 1;
  }

  &__name {
    @include heading-lg;
    color: $gray-900;
  }

  &__role {
    font-size: $font-size-lg;
    color: $primary-600;
    font-weight: $font-weight-medium;
    margin-bottom: $sp-16;
  }

  &__bio {
    @include body-text;
    color: $gray-600;
    margin-bottom: $sp-20;
  }

  &__contact {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-16;
  }

  &__contact-item {
    display: inline-flex;
    align-items: center;
    gap: $sp-8;
    font-size: $font-size-sm;
    color: $gray-500;
    text-decoration: none;
    transition: color $transition-fast;

    i {
      color: $primary-500;
      font-size: $font-size-base;
    }

    &:hover {
      color: $primary-600;
    }
  }
}

// Timeline
.timeline {
  background: $gray-50;

  &__title {
    @include heading-lg;
    text-align: center;
    margin-bottom: $sp-48;
  }

  &__list {
    max-width: 700px;
    margin: 0 auto;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: $gray-200;
    }
  }

  &__item {
    display: flex;
    gap: $sp-24;
    padding-bottom: $sp-40;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__marker {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: $primary-500;
    border: 3px solid $primary-100;
    position: relative;
    top: 4px;
  }

  &__content {
    flex: 1;
  }

  &__period {
    font-size: $font-size-xs;
    color: $gray-400;
    font-weight: $font-weight-medium;
  }

  &__role {
    @include heading-sm;
    color: $gray-900;
    margin: $sp-4 0;
  }

  &__company {
    font-size: $font-size-sm;
    color: $primary-600;
    margin-bottom: $sp-8;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: $line-height-relaxed;
  }

  &__highlights {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $sp-8;
  }

  &__highlight {
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: $line-height-relaxed;
    padding-left: $sp-16;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $primary-300;
    }
  }

  &__tools {
    display: flex;
    flex-wrap: wrap;
    gap: $sp-8;
    margin-top: $sp-12;
  }

  &__tool-tag {
    font-size: $font-size-xs;
    color: $primary-600;
    background: $primary-50;
    padding: 2px $sp-8;
    border-radius: $radius-sm;
    font-weight: $font-weight-medium;
  }
}

// Education
.education {
  &__title {
    @include heading-lg;
    text-align: center;
    margin-bottom: $sp-48;
  }

  &__list {
    max-width: 700px;
    margin: 0 auto;
  }

  &__item {
    display: flex;
    gap: $sp-24;
  }

  &__marker {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: $primary-500;
    border: 3px solid $primary-100;
    position: relative;
    top: 4px;
  }

  &__content {
    flex: 1;
  }

  &__period {
    font-size: $font-size-xs;
    color: $gray-400;
    font-weight: $font-weight-medium;
  }

  &__school {
    @include heading-sm;
    color: $gray-900;
    margin: $sp-4 0;
  }

  &__major {
    font-size: $font-size-sm;
    color: $primary-600;
  }
}

// Certifications
.certs {
  &__title {
    @include heading-lg;
    text-align: center;
    margin-bottom: $sp-48;
  }

  &__group {
    max-width: 700px;
    margin: 0 auto $sp-40;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__group-label {
    @include heading-sm;
    color: $gray-900;
    display: flex;
    align-items: center;
    gap: $sp-8;
    margin-bottom: $sp-4;
  }

  &__group-icon {
    color: $primary-500;
  }

  &__group-desc {
    font-size: $font-size-sm;
    color: $gray-400;
    margin-bottom: $sp-16;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $sp-12;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $sp-12 $sp-16;
    background: $white;
    border-radius: $radius-md;
    border: 1px solid $gray-100;
  }

  &__name {
    font-size: $font-size-sm;
    color: $gray-700;
    font-weight: $font-weight-medium;
  }

  &__date {
    font-size: $font-size-xs;
    color: $gray-400;
    flex-shrink: 0;
  }
}
</style>

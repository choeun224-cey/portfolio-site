<template>
  <div class="projects">
    <section class="projects__hero section">
      <div class="container">
        <h1 class="projects__title">Projects</h1>
        <p class="projects__subtitle">
          실무에서 직접 설계하고 구현한 프로젝트들입니다.
        </p>
      </div>
    </section>

    <section class="projects__list section">
      <div class="container">
        <div class="projects__grid">
          <router-link
            v-for="project in projects"
            :key="project.id"
            :to="`/projects/${project.id}`"
            class="project-item"
          >
            <div class="project-item__thumb">
              <img
                v-if="project.thumbnail"
                :src="project.thumbnail"
                :alt="project.title"
                class="project-item__thumb-img"
              />
              <div v-else class="project-item__placeholder">
                {{ project.title.charAt(0) }}
              </div>
            </div>
            <div class="project-item__body">
              <div class="project-item__tags">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="project-item__tag"
                >
                  {{ tag }}
                </span>
              </div>
              <h2 class="project-item__title">{{ project.title }}</h2>
              <p class="project-item__desc">{{ project.summary }}</p>
              <div class="project-item__meta">
                <span>{{ project.role }}</span>
                <span>{{ project.period }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import fsDsThumb from '@/assets/images/storybook-login.png'
import goormthonThumb from '@/assets/images/qn-home.png'
import hanipMapThumb from '@/assets/images/hanip-map_home.png'
import vocaTrainingThumb from '@/assets/images/training3.png'

const projects = ref([])

onMounted(() => {
  // 정적 배포에서도 안전하도록 로컬 데이터를 직접 사용
  projects.value = [
      {
        id: 'voca-training',
        title: 'AI 콜센터 상담사 트레이닝 시스템',
        summary: '보험 TM 상담사가 AI 가상 고객과 실시간 롤플레잉하는 트레이닝 시스템. 실녹취 약 3.6만 콜 분석으로 설계 기준을 세우고 관리자 콘솔·상담사 웹·앱을 기획. 사내 POC(기획·웹 단독, 앱·서버 개발자 협업).',
        tags: ['서비스 기획', '데이터 기반 설계', 'LLM 프롬프트 설계', 'Vue 3', '보험 TM'],
        role: '서비스 기획 · 웹 개발 (앱·서버 협업)',
        period: '2026.05 — 진행 중',
        thumbnail: vocaTrainingThumb,
      },
      {
        id: 'hanip-map',
        title: '한입맵 — 친구와 함께 쓰는 맛집 지도 PWA',
        summary: '친구 둘이 모은 맛집을 지도에 기록하고 위치 기반으로 다음 갈 곳을 찾는 PWA. 실사용자 2명이라는 맥락 위에서 기능·스코프를 결정한 기획·풀스택 프로젝트. Next.js 16 + Supabase.',
        tags: ['제품 기획', '사용자 정의', '제품 의사결정', 'Next.js 16', 'Supabase', 'PWA'],
        role: '기획 · 풀스택 (단독)',
        period: '2026.04',
        thumbnail: hanipMapThumb,
      },
      {
        id: 'fs-ds',
        title: 'FS-DS 디자인 시스템',
        summary: '사내 전체 웹 프로젝트를 위한 디자인 시스템. Vanilla JS + SCSS 기반 65개 컴포넌트, npm 패키지 배포.',
        tags: ['Design System', 'Vanilla JS', 'SCSS', 'Storybook'],
        role: 'Frontend Developer (단독)',
        period: '2025.06 — 현재',
        thumbnail: fsDsThumb,
      },
      {
        id: 'goormthon',
        title: 'Quick Network — IT 컨퍼런스 네트워킹 솔루션',
        summary: '구름톤 부트캠프 1회차 팀 프로젝트. QR 명함 교환, 1:1/그룹 매칭, 실시간 채팅 등 컨퍼런스 네트워킹 서비스 프론트엔드 개발.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Team Project'],
        role: 'Frontend Developer (3인)',
        period: '구름톤 1회차',
        thumbnail: goormthonThumb,
      },
  ]
})
</script>

<style lang="scss">
.projects {
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
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: $sp-32;
  }
}

.project-item {
  @include card;
  display: grid;
  grid-template-columns: 300px 1fr;
  overflow: hidden;

  @include mobile {
    grid-template-columns: 1fr;
  }

  &__thumb {
    background: linear-gradient(135deg, $primary-100, $primary-200);
    @include flex-center;
    min-height: 200px;
    overflow: hidden;
  }

  &__thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__placeholder {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: $white;
    @include flex-center;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $primary-600;
  }

  &__body {
    padding: $sp-32;
    display: flex;
    flex-direction: column;
  }

  &__tags {
    display: flex;
    gap: $sp-8;
    flex-wrap: wrap;
    margin-bottom: $sp-12;
  }

  &__tag {
    @include tag;
  }

  &__title {
    @include heading-md;
    color: $gray-900;
    margin-bottom: $sp-12;
  }

  &__desc {
    @include body-text;
    color: $gray-500;
    flex: 1;
  }

  &__meta {
    display: flex;
    gap: $sp-24;
    margin-top: $sp-16;
    padding-top: $sp-16;
    border-top: 1px solid $gray-100;

    span {
      font-size: $font-size-xs;
      color: $gray-400;
    }
  }
}
</style>

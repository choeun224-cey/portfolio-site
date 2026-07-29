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
        id: 'fs-ds',
        title: 'FS-DS 디자인 시스템',
        summary: '사내 전체 웹 프로젝트를 위한 디자인 시스템. Vanilla JS + SCSS 기반 65개 컴포넌트, npm 패키지 배포.',
        tags: ['Design System', 'Vanilla JS', 'SCSS', 'Storybook'],
        role: 'Frontend Developer (단독)',
        period: '2025.06 — 현재',
        thumbnail: fsDsThumb,
      },
      {
        id: 'voca-training',
        title: 'AI 콜센터 상담사 트레이닝 시스템',
        summary: '상담사 실시간 발화 트레이닝 AI 솔루션. 단독 POC로 시작해 현재 앱 개발자들과 데모앱으로 고도화하며 경영진 시연을 준비 중. 관리자 어드민 + 상담사 모바일 Dual System, "점수가 아니라 코칭" 평가 설계.',
        tags: ['Vue 3', 'FS-DS', 'Qwen LLM', 'Supertonic TTS', 'AI 트레이닝'],
        role: '기획·디자인 주도 (앱 개발자 협업)',
        period: '2026.05 — 진행 중',
        thumbnail: vocaTrainingThumb,
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
      {
        id: 'hanip-map',
        title: '한입맵 — 커플 맛집 지도 PWA',
        summary: '카카오맵 기반의 둘만의 맛집 큐레이션 앱. Next.js 16 + Supabase로 풀스택 구현, Vercel 배포 + PWA 설치 지원.',
        tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind v4', 'PWA'],
        role: 'Full-stack Developer (단독)',
        period: '2026.04',
        thumbnail: hanipMapThumb,
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

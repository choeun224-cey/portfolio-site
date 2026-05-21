<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__inner container">
        <p class="hero__greeting fade-up" style="--delay: 0">안녕하세요, 저는</p>
        <h1 class="hero__title fade-up" style="--delay: 1">
          사내 시스템을 기획·구현·운영하는 개발자<br />
          <span class="hero__name">JEY</span>입니다.
        </h1>
        <p class="hero__description fade-up" style="--delay: 2">
          사내 디자인 시스템 단독 구축·운영, 자산 라이프사이클 관리,<br />
          운영 자동화 경험을 바탕으로 안정적인 시스템 환경을 만드는 데 집중합니다.
        </p>
        <div class="hero__actions fade-up" style="--delay: 3">
          <router-link to="/projects" class="btn btn--primary">
            프로젝트 보기
          </router-link>
          <router-link to="/about" class="btn btn--outline">
            About Me
          </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills section">
      <div class="container">
        <h2 class="skills__title scroll-reveal">Tech Stack</h2>
        <div class="skills__grid">
          <div
            v-for="(skill, idx) in skills"
            :key="skill.category"
            class="skill-card scroll-reveal"
            :style="{ '--reveal-delay': `${idx * 100}ms` }"
          >
            <h3 class="skill-card__category">{{ skill.category }}</h3>
            <ul class="skill-card__list">
              <li
                v-for="item in skill.items"
                :key="item"
                class="skill-card__item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Preview -->
    <section class="featured section">
      <div class="container">
        <div class="featured__header scroll-reveal">
          <h2 class="featured__title">Featured Projects</h2>
          <router-link to="/projects" class="featured__more">
            전체 보기 &rarr;
          </router-link>
        </div>
        <div class="featured__grid">
          <router-link
            v-for="(project, idx) in featuredProjects"
            :key="project.id"
            :to="`/projects/${project.id}`"
            class="project-card scroll-reveal"
            :style="{ '--reveal-delay': `${idx * 150}ms` }"
          >
            <div class="project-card__thumb">
              <img
                v-if="project.thumbnail"
                :src="project.thumbnail"
                :alt="project.title"
                class="project-card__thumb-img"
              />
              <div v-else class="project-card__placeholder">
                {{ project.title.charAt(0) }}
              </div>
            </div>
            <div class="project-card__body">
              <div class="project-card__tags">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="project-card__tag"
                >
                  {{ tag }}
                </span>
              </div>
              <h3 class="project-card__title">{{ project.title }}</h3>
              <p class="project-card__desc">{{ project.summary }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import fsDsThumb from '@/assets/images/storybook-login.png'

const skills = ref([
  {
    category: 'Frontend',
    items: ['Vue.js', 'React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'SCSS / CSS3', 'HTML5'],
  },
  {
    category: 'AI & Backend',
    items: ['Google Gemini API', 'Anthropic Claude API', 'Web Speech API', 'Supabase / PostgreSQL', 'SQL'],
  },
  {
    category: 'Tools & Build',
    items: ['Vite', 'Storybook', 'GitHub Actions', 'Git / GitHub', 'npm / GitHub Packages'],
  },
  {
    category: 'Design & Collaboration',
    items: ['Design Token', 'Component System', 'Figma', 'Notion', 'Storybook'],
  },
])

const featuredProjects = ref([
  {
    id: 'fs-ds',
    title: 'FS-DS 디자인 시스템',
    summary: '사내 전체 웹 프로젝트를 위한 디자인 시스템 구축. Vanilla JS + SCSS 기반, npm 패키지 배포.',
    tags: ['Design System', 'SCSS', 'Storybook'],
    thumbnail: fsDsThumb,
  },
  {
    id: 'voca-training',
    title: 'Voca Training — AI 콜봇 트레이너',
    summary: '"점수가 아닌 코칭"을 주는 LLM 음성 롤플레이 트레이너. 벤더 중립 abstraction + Mock 모드 포함.',
    tags: ['Vue 3', 'Gemini API', 'LLM'],
  },
])

// Scroll reveal with IntersectionObserver
let observer = null

onMounted(() => {
  // Hero fade-up: trigger after mount
  requestAnimationFrame(() => {
    document.querySelectorAll('.fade-up').forEach((el) => {
      el.classList.add('fade-up--visible')
    })
  })

  // Scroll reveal
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal--visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style lang="scss">
// ============================================
// Animations
// ============================================

// Hero fade-up (staggered on load)
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--delay, 0) * 0.15s);

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scroll reveal (triggered by IntersectionObserver)
.scroll-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Name gradient animation
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

// Hero
.hero {
  @include flex-center;
  min-height: calc(100vh - $header-height);
  background: linear-gradient(135deg, $primary-50 0%, $white 50%, $gray-50 100%);

  &__inner {
    text-align: center;
  }

  &__greeting {
    font-size: $font-size-lg;
    color: $gray-500;
    margin-bottom: $sp-12;
  }

  &__title {
    @include heading-xl;
    color: $gray-900;
    margin-bottom: $sp-24;
  }

  &__name {
    background: linear-gradient(135deg, $primary-500, $primary-700, $primary-400, $primary-600);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 6s ease infinite;
  }

  &__description {
    @include body-text;
    color: $gray-600;
    margin-bottom: $sp-40;

    @include mobile {
      br { display: none; }
    }
  }

  &__actions {
    display: flex;
    gap: $sp-16;
    justify-content: center;
  }
}

// Buttons
.btn {
  display: inline-flex;
  align-items: center;
  padding: $sp-12 $sp-32;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  border-radius: $radius-md;
  transition: all $transition-base;

  &--primary {
    background: $primary-600;
    color: $white;

    &:hover {
      background: $primary-700;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba($primary-600, 0.4);
    }
  }

  &--outline {
    border: 1px solid $gray-300;
    color: $gray-700;

    &:hover {
      border-color: $primary-500;
      color: $primary-600;
      transform: translateY(-1px);
    }
  }
}

// Skills
.skills {
  background: $white;

  &__title {
    @include heading-lg;
    text-align: center;
    margin-bottom: $sp-48;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $sp-24;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}

.skill-card {
  @include card;
  padding: $sp-32;

  &__category {
    @include heading-sm;
    color: $primary-600;
    margin-bottom: $sp-16;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $sp-8;
  }

  &__item {
    font-size: $font-size-sm;
    color: $gray-600;
    padding-left: $sp-16;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $primary-300;
    }
  }
}

// Featured Projects
.featured {
  background: $gray-50;

  &__header {
    @include flex-between;
    margin-bottom: $sp-40;
  }

  &__title {
    @include heading-lg;
  }

  &__more {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $primary-600;
    transition: color $transition-fast;

    &:hover {
      color: $primary-700;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $sp-32;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}

.project-card {
  @include card;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__thumb {
    height: 200px;
    background: linear-gradient(135deg, $primary-100, $primary-200);
    @include flex-center;
    overflow: hidden;
  }

  &__thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__placeholder {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: $white;
    @include flex-center;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $primary-600;
  }

  &__body {
    padding: $sp-24;
    flex: 1;
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
    @include heading-sm;
    color: $gray-900;
    margin-bottom: $sp-8;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $gray-500;
    line-height: $line-height-relaxed;
  }
}
</style>

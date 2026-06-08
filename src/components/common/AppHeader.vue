<template>
  <header class="header">
    <div class="header__inner container">
      <router-link to="/" class="header__logo">
        Eunyoung Cho<span>.dev</span>
      </router-link>

      <button
        class="header__menu-btn"
        :class="{ 'is-open': isMobileMenuOpen }"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="메뉴 토글"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="header__nav" :class="{ 'is-open': isMobileMenuOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="header__link"
          @click="isMobileMenuOpen = false"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: rgba($white, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $gray-100;
  z-index: 100;

  &__inner {
    @include flex-between;
    height: 100%;
  }

  &__logo {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $gray-900;

    span {
      color: $primary-500;
    }
  }

  &__nav {
    display: flex;
    gap: $sp-32;

    @include mobile {
      position: fixed;
      top: $header-height;
      left: 0;
      right: 0;
      bottom: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: $sp-40;
      background: $white;
      opacity: 0;
      visibility: hidden;
      transition: opacity $transition-base, visibility $transition-base;

      &.is-open {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__link {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $gray-600;
    transition: color $transition-fast;

    &:hover,
    &.router-link-active {
      color: $primary-600;
    }

    @include mobile {
      font-size: $font-size-xl;
    }
  }

  &__menu-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    width: 24px;

    @include mobile {
      display: flex;
    }

    span {
      display: block;
      height: 2px;
      background: $gray-700;
      border-radius: 1px;
      transition: transform $transition-base, opacity $transition-base;
    }

    &.is-open span {
      &:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      &:nth-child(2) { opacity: 0; }
      &:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
  }
}
</style>

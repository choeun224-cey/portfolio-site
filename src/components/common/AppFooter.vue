<template>
  <footer class="footer">
    <div class="footer__inner container">
      <p class="footer__copyright">
        &copy; {{ currentYear }} JEY. All rights reserved.
      </p>
      <div class="footer__links">
        <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss">
.footer {
  border-top: 1px solid $gray-100;
  padding: $sp-32 0;
  background: $gray-50;

  &__inner {
    @include flex-between;

    @include mobile {
      flex-direction: column;
      gap: $sp-16;
      text-align: center;
    }
  }

  &__copyright {
    font-size: $font-size-sm;
    color: $gray-500;
  }

  &__links {
    display: flex;
    gap: $sp-24;

    a {
      font-size: $font-size-sm;
      color: $gray-500;
      transition: color $transition-fast;

      &:hover {
        color: $primary-600;
      }
    }
  }
}
</style>

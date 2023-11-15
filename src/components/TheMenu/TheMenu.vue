<template>
  <div class="the-menu">
    <router-link
      class="the-menu__link"
      data-test-id="menu-link"
      to="/"
      active-class="the-menu__active"
      >Seus favorecidos</router-link
    >
  </div>
</template>

<style lang="scss" scoped>
.the-menu {
  background-color: $green;
  padding: 1.7rem 0 1.7rem 5rem;

  &__link {
    color: $white;
    padding-bottom: 1.2rem;
    text-decoration: none;
  }

  &__active {
    border-bottom: 0.3rem solid $white;
  }
}
</style>

<template>
<div class="score-stars">
  <div class="stars-shadow" />
  <div class="left-star-enabled"
    v-show="hasSpeed" />
  <div class="left-star-disabled"
    v-show="!hasSpeed" />
  <div class="right-star-enabled"
    v-show="hasLength" />
  <div class="right-star-disabled"
    v-show="!hasLength" />
  <div class="center-star-enabled"
    v-show="hasWon" />
  <div class="center-star-disabled"
    v-show="!hasWon" />
</div>
</template>

<script>
export default {
  components: {},
  props: {
    'score': Object,
    'level': Object
  },

  computed: {
    hasWon: function() {
      return this.score && this.score.won
    },

    hasSpeed: function() {
      return this.score && this.score.minStep >= 0 && this.score.minStep <= this.level.speedTarget
    },

    hasLength: function() {
      return this.score && this.score.minLength >= 0 && this.score.minLength <= this.level.lengthTarget
    }
  }
}
</script>

<style lang="scss">
.score-stars {
    position: relative;

    & > div {
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
    }

    .stars-shadow {
        background-image: url("../images/stars-shadow.png");
        opacity: 0.3;
    }
    .left-star-enabled {
        background-image: url("../images/star-left-enabled.png");
    }
    .center-star-enabled {
        background-image: url("../images/star-center-enabled.png");
    }
    .right-star-enabled {
        background-image: url("../images/star-right-enabled.png");
    }
    .left-star-disabled {
        background-image: url("../images/star-left-disabled.png");
    }
    .center-star-disabled {
        background-image: url("../images/star-center-disabled.png");
    }
    .right-star-disabled {
        background-image: url("../images/star-right-disabled.png");
    }
}
</style>

<template>
  <div class="front">
    <div class="container">
      <div class="introduction">
        <div class="left">
          <div class="title">Keep your files in the safe place with high security</div>
          <p class="caption">
            CopyCase has been carefully designed to achieve the highest level of security for users.
          </p>
        </div>
        <div class="images">
          <img src="@/assets/images/home-intro-window.png" class="window" alt="" />
          <img src="@/assets/images/home-intro-mobile.png" class="mobile" alt="" />
          <img src="@/assets/images/home-intro-info.png" class="info" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.front {
  overflow-y: auto;
  display: flex;
  height: calc(100% - 48px);
  flex: 1 1 0%;
  // padding: 24px;
  background-color: #ffffff;
  flex-direction: column;

  .container {
    margin: 0 auto;
    max-width: 1400px;
    padding: 24px;
    width: 100%;

    .introduction {
      margin: 44px 0 220px;
      position: relative;
      width: 100%;

      .left {
        max-width: 532px;
        padding-top: 40px;

        .title {
          color: #031430;
          font-size: 64px;
          font-weight: 500;
          line-height: 115%;
          margin-bottom: 24px;
        }
      }

      .images {
        position: absolute;
        right: -470px;
        top: 0;
        // z-index: -1;

        .mobile {
          bottom: -136px;
          left: -160px;
          position: absolute;
          will-change: transform;
          transform: translateY(0px);
        }
        .info {
          bottom: -178px;
          left: -22px;
          position: absolute;
          will-change: transform;
        }
      }
    }
  }
}
</style>

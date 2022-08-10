<template>
  <div class="not-empty text-center m0 w-100 mb-20">
    <div class="img">
      <img
        src="~/assets/images/others/not-empty.svg"
        class="img-fluid"
        alt="not empty"
      />
    </div>
    <div class="not-empty-content mt-30">
      <h2><slot name="head-title">কোন রেসাল্ট পাওয়া যায়নি !</slot></h2>
      <p>
        <slot name="subhead-title"></slot>
      </p>
      <slot name="button"></slot>
    </div>
  </div>
</template>
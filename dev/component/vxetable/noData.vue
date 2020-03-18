<!-- 表格无数据 -->
<template>
  <div class="no-data-wrap">
    <div class="no-data-content">
      <div class="no-data-info" />
      <div class="no-data-span">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
};
</script>
<style lang='scss' scoped>
.no-data-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .no-data-content {
    width: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-data-info {
      width: 160px;
      height: 139px;
      background-image: url("./img/noData.png");
      background-size: 100% 100%;
      margin-bottom: 2px;
    }
    .no-data-span {
      width: 100px;
      height: 28px;
      color:rgba(51,51,51,1);
      font-size: 12px;
      line-height: 28px;
      text-align: center;
    }
  }
}
</style>

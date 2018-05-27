<template>
    <i :class="iconClassName"></i>
</template>
<script>
export default {
    data() {
        return {
            iconClassName: '',
        }
    },
    methods: {
        getButtonIcon: function() {
            if (this.show) {
                this.iconClassName = 'el-icon-success yes'
            } else {
                this.iconClassName = 'el-icon-error no'
            }
        }
    },
    mounted() {
      this.getButtonIcon();
    },
    props: ['show']
}
</script>
<style lang="scss" scoped>
    .yes,.no{
        margin: 1px 0;
        font-size: 20px;
    }
    .yes{
        color: #089c0b;
    }
    .no{
        color: #d81e06
    }
</style>

export default {
  mounted () {
    this.__resizeHanlder = () => {
      setTimeout(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
    }
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.__resizeHanlder)
  }
}

<template>
  <div ref="svgRef" style="width: 100%; height: 100%"></div>
</template>

<script>
  import themeJson from '../theme/wonderland';
  export default {
    name: 'PieCharts',
    props: {
      title: {
        type: Object,
        default: {
          name: '',
          subtitle: '',
          show: false
        }
      },
      tip: {
        type: Object,
        default: {
          title: '',
          show: false
        }
      },
      showLegend: {
        type: Boolean,
        default: false
      },
      radius: {
        type: String,
        default: '60%'
      },
      data: {
        type: Array,
        default: [{
          value: 0,
          name: ''
        }]
      }
    },
    mounted () {
      // 初始化的时候肯定要创建饼图
      this.createChart()
    },
    watch: {
      // 每一项变动，都需要更新饼图
      title () {
        this.createChart()
      },
      tip () {
        this.createChart()
      },
      showLegend () {
        this.createChart()
      },
      radius () {
        this.createChart()
      },
      data () {
        this.createChart()
      }
    },
    methods: {
      createChart () {
        // 注册主题到echarts
        this.echarts.registerTheme('wonderland', themeJson);

        // 使用 svg 渲染器, 如果要使用canvas，直接修改renderer的值为canvas即可。
        let myChart = this.echarts.init(this.$refs.svgRef, 'wonderland', {renderer: 'canvas'});

        let option = {
          series : [
            {
              name: this.tip.title,
              type: 'pie',
              radius: this.radius,
              center: ['50%', '50%'],
              data: this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        if (this.title.show) {
          option.title = {
            text: this.title.name,
            subtext: this.title.subtitle,
            x: 'right'
          };
        }

        if (this.tip.show) {
          option.tooltip = {
            trigger: 'item',
            formatter: this.tip.title ? "{a} <br/>{b} : {c} ({d}%)" : "{b} : {c} ({d}%)"
          }
        }

        if (this.showLegend) {
          option.legend = {
            orient: 'vertical',
            left: 'left',
            data: this.data.map(o => o.name)
          };
        }

        myChart.clear();
        myChart.setOption(option, true);
        window.onresize = function(){
          myChart.resize()
        };
      }
    }
  }
</script>

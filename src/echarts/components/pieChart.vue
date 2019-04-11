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
      monitorBrowserSize: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: [{
          value: 0,
          name: ''
        }]
      }
    },
    data () {
      return {
      }
    },
    mounted () {
      this.createChart()
    },
    methods: {
      createChart () {
        // 注册主题到echarts
        this.echarts.registerTheme('wonderland', themeJson);

        // 使用 svg 渲染器, 如果要使用canvas，直接修改renderer的值为canvas即可。
        let myChart = this.echarts.init(this.$refs.svgRef, 'wonderland', {renderer: 'svg'});

        let option = {
          series : [
            {
              name: this.props.tip.title,
              type: 'pie',
              radius: this.props.radius,
              center: ['50%', '50%'],
              data: this.props.data,
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

        if (this.props.title.show) {
          option.title = {
            text: this.props.title.name,
            subtext: this.props.title.subtitle,
            x: 'right'
          };
        }

        if (this.props.tip.show) {
          option.tooltip = {
            trigger: 'item',
            formatter: this.props.tip.title ? "{a} <br/>{b} : {c} ({d}%)" : "{b} : {c} ({d}%)"
          }
        }

        if (this.props.showLegend) {
          option.legend = {
            orient: 'vertical',
            left: 'left',
            data: this.props.data.map(o => o.name)
          };
        }

        myChart.setOption(option, true);

        if (this.props.monitorBrowserSize) {
          window.onresize = function(){
            myChart.resize()
          };
        }
      }
    }
  }
</script>

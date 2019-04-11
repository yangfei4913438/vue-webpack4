<template>
  <div class="home">
    <a-row class="home-sub-title" type="flex" justify="space-around" align="middle">
      <a-col :span="4" style="text-align: left">
        <a-month-picker @change="changeDate"></a-month-picker>
      </a-col>
      <a-col :span="17" style="font-size: 22px">
        <total />
      </a-col>
      <a-col :span="3" style="text-align: right">
        <a-button type="primary" @click="downloadExcel">{{$t('btn.tableDownload')}}</a-button>
      </a-col>
    </a-row>
    <a-tabs :activeKey="$store.state.home.activeKey" type="card" @change="changeCard">
      <a-tab-pane key="list">
        <span slot="tab">
          <font-awesome-icon :icon="['fas','book']" /> {{$t('btn.listMode')}}
        </span>
        <!-- 新增按钮 -->
        <a-button type="primary" class="add-record">
          <font-awesome-icon :icon="['fas','plus-circle']" style="margin-right: 8px" /> {{$t('btn.add_record')}}
        </a-button>
        <!-- 账目列表标题 -->
        <a-row class="app-record-line">
          <a-col :span="2" class="app-record-th">{{$t('label.type')}}</a-col>
          <a-col :span="10" class="app-record-th">{{$t('label.title')}}</a-col>
          <a-col :span="4" class="app-record-th">{{$t('label.price')}}({{$t('label.yuan')}})</a-col>
          <a-col :span="4" class="app-record-th">{{$t('label.date')}}</a-col>
          <a-col :span="4" class="app-record-th">{{$t('label.operation')}}</a-col>
        </a-row>
        <!-- 账目列表 -->
        <record-list/>
      </a-tab-pane>
      <a-tab-pane key="chart">
        <span slot="tab">
          <font-awesome-icon :icon="['fas','chart-pie']" /> {{$t('btn.chartMode')}}
        </span>
        Tab 2
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  import Total from './components/total';
  import RecordList from './components/record_list';
  import ExportJsonExcel from 'js-export-excel';
  export default {
    name: 'Home',
    props: {},
    components: {
      ACol,
      ARow,
      Total,
      RecordList
    },
    data() {
      return {
      }
    },
    mounted() {
      this.initData()
    },
    watch: {},
    computed: {},
    methods: {
      initData () {
        // 开启加载动画
        this.$store.commit('home/setShowLoading', true);
        // 获取初始化数据
        this.$store.dispatch('home/getInitData', this.$axios);
      },
      changeDate (e, value) {
        this.$store.commit('home/setChooseDate', value);
      },
      changeCard (card) {
        // 同步操作，设置活动的标签页
        this.$store.commit('home/setActiveKey', card);
      },
      // 下载 Excel 表格
      downloadExcel () {
        let list = this.$store.getters['home/getRecordList'];
        if (list && list.length > 0) {
          // 支出项过滤
          const expenseList = list.filter(item => {
            return item.type === 'expense'
          });
          // 收入项过滤
          const incomeList = list.filter(item => {
            return item.type === 'income'
          });
          // 配置项
          let option = {
            // 文件名
            fileName: '收支明细'
          };
          // sheet页配置
          option.datas = [
            {
              sheetData: expenseList,
              sheetName: '支出',
              sheetFilter:['event','price','date'],
              sheetHeader:['事项','金额','日期'],
            },
            {
              sheetData: incomeList,
              sheetName: '收入',
              sheetFilter:['event','price','date'],
              sheetHeader:['事项','金额','日期'],
            }
          ];
          let toExcel = new ExportJsonExcel(option);
          toExcel.saveExcel()
        } else {
          // 空数组提示没有数据
          this.$message.error('指定下载的数据不存在!', 5);
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .home >>> .ant-tabs-tab
    width 200px
    text-align center
  .home
    position relative
    width 80%
    height 100%
    margin 0 auto
    padding 18px
    box-sizing border-box
    overflow-y scroll
    background: #ffffff;
    transition box-shadow .5s ease
    box-shadow: 0 0 8px 2px rgba(0,0,0,.15);
    border-bottom-left-radius 5px
    border-bottom-right-radius 5px
  .home:hover
    box-shadow: 0 8px 8px 8px rgba(0,0,0,.15);
  .home-sub-title
    height 60px
    border-bottom 1px solid #ccc
    margin-bottom 15px
    /*background #25a4bb*/
  .add-record
    position relative
    width 100%
  .app-record-line
    position: relative;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #ccc;
    .app-record-th
      text-align: center;
      font-weight: bold;
</style>

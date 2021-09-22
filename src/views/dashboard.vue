<template lang='html'>
  <section class='Study'>
    <!-- Page Title Header Starts-->
    <div class='row page-title-header'>
      <div class='col-12'>
        <div class='page-header'>
          <h3 class='page-title'>Study</h3>
        </div>
      </div>
    </div>
    <!-- Page Title Header Ends-->
    <div class='col'>
      <div class='row'>
        <div class='col'>
          <div class='col grid-margin stretch-card'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title mb-0'>Video</h4>
                <br/>
                <center>
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/078dfbYp1Rw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </center>
              </div>
            </div>
          </div>
          <div class='col grid-margin stretch-card'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title mb-0'>Script</h4>
              </div>
            </div>
          </div>
        </div>
        <div class='col-md-4 grid-margin stretch-card'>
          <div class='card'>
            <div class='card-body d-flex flex-column'>
                <h4 class='card-title mb-0'>Time Line</h4>
                <br/>
                <div class='col' style='overflow:scroll'>
                  <div v-for="item of timeline" v-bind:key='item' class='card'>
                    <div class='card-body'>
                      <div class='row'>
                      <img width='40%' height='40%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg">
                        <br/>
                        &nbsp;&nbsp;{{item.key_word}} <br/>
                        &nbsp;&nbsp;{{item.time}}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class='col grid-margin stretch-card'>
        <div class='card'>
          <div class='card-body d-flex flex-column'>
              <h4 class='card-title mb-0'>Summary</h4>
          </div>
        </div>
      </div>
      <div class='col grid-margin stretch-card'>
        <div class='card'>
          <div class='card-body d-flex flex-column'>
              <h4 class='card-title mb-0'>Keyword</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang='js'>
import statsLineGraph1 from '../components/charts/dashboard_1/stats-line-graph-1'
import statsLineGraph2 from '../components/charts/dashboard_1/stats-line-graph-2'
import statsLineGraph3 from '../components/charts/dashboard_1/stats-line-graph-3'
import statsLineGraph4 from '../components/charts/dashboard_1/stats-line-graph-4'
import salesStatisticsOverview from '../components/charts/dashboard_1/sales-statistics-overview'
import netProfit from '../components/charts/dashboard_1/net-Profit'
import totalRevenue from '../components/charts/dashboard_1/total-revenue'
import marketOverviewChart from '../components/charts/dashboard_1/market-overview-chart'
import totalTransaction from '../components/charts/dashboard_1/total-transaction'
import realtimeStatistics from '../components/charts/dashboard_1/realtime-statistics'
import usersDoughnutChart from '../components/charts/dashboard_1/usersDoughnutChart'
import JQuery from 'jquery'
let $ = JQuery
export default {
  name: 'dashboard',
  data () {
    return {
      timeline: [
        { key_word: '도입', time: '00:00 - 12:00' },
        { key_word: '비동기 통신', time: '12:00 - 15:00' },
        { key_word: '동기 통신', time: '15:00 - 22:00' },
        { key_word: '마무리', time: '22:00 - 35:00' },
        { key_word: '과제', time: '35:00 - 52:20' }
      ]
    }
  },
  components: {
    statsLineGraph1,
    statsLineGraph2,
    statsLineGraph3,
    statsLineGraph4,
    salesStatisticsOverview,
    netProfit,
    totalRevenue,
    marketOverviewChart,
    totalTransaction,
    realtimeStatistics,
    usersDoughnutChart
  },
  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

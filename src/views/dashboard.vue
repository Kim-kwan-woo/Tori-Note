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
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/2yjZGAGmmPA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </center>
              </div>
            </div>
          </div>
          <div class='col grid-margin stretch-card'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title mb-0'>Script</h4>
                <br/>
                <p>안녕하세요 학생여러분 오늘은 자료구조 중 스택에 대해 학습해 보겠습니다.스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행되는 제한 조건을 가지는 선형 자료 구조입니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div class='col-md-4 grid-margin stretch-card'>
          <div class='card'>
            <div class='card-body d-flex flex-column'>
                <h4 class='card-title mb-0'>Time Line</h4>
                <br/>
                <div class='col' style='overflow-y:auto'>
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
              <br/>
              <div class='col'>
                  <div v-for="item of timeline" v-bind:key='item' class='card'>
                    <div class='card-body'>
                      <div class='row'>
                      <img width='25%' height='25%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg">
                        <div class='cos-xs-7 col-centered'>
                          <br/><br/>
                          <h3>&nbsp;&nbsp;{{item.key_word}}</h3><br/>
                          <h4>&nbsp;&nbsp;{{item.summary}}</h4>
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
          <div class='card-body flex-column'>
              <h4 class='card-title mb-0'>Keyword</h4>
              <br/>
                <div class='col col-centered'>
                <div class='row'>
                <h2 v-for="(item,i) of timeline" v-bind:key='item' v-if="i < 3">#{{item.key_word}}&nbsp;&nbsp;</h2>
                </div>
                </div>
                <pie-chart height="100"></pie-chart>
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
import pieChart from '../components/charts/examples/pieChart'
import JQuery from 'jquery'
let $ = JQuery
export default {
  name: 'dashboard',
  data () {
    return {
      timeline: [
        {key_word: '시작', time: '00:00 - 12:00', summary: '지금부터 수업 시작하겠습니다.'},
        {key_word: '자료 구조', time: '12:00 - 15:00', summary: '오늘은 지난주에 이어 자료구조를 하겠습니다.'},
        {key_word: '스택', time: '15:00 - 22:00', summary: '스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행됩니다.'},
        {key_word: '마무리', time: '22:00 - 35:00', summary: '오늘 수업은 여기서 마무리하겠습니다.'},
        {key_word: '과제', time: '35:00 - 52:20', summary: '다음주까지 나만의 노트 정리하기 과제입니다.'}
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
    usersDoughnutChart,
    pieChart
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

<template lang='html'>
  <section class='Study'>
    <div class='col'>
      <div class='row' style='margin-right:1px;'>
        <div class='col'>
          <div class='col grid-margin stretch-card'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title mb-0'>Video</h4>
                <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light" @click="ShareScreen"><i class="mdi mdi-desktop-mac"></i>Share</b-button></div><br/>
                <video ref="videoElement" controls autoplay></video><br/>
                <button type="button" id="Start" class="btn btn-primary" @click="recordPer10s">Start</button>
                <a id="downloadLink" style="display:none;" download="mediarecorder.mp3" name="mediarecorder.mp3" href></a><br/>
                <a id="screenshotLink" style="display:none;" download="drawImage.jpeg" name="drawImage.jpeg" href></a><br/>
                <canvas></canvas>
              </div>
            </div>
          </div>
        <div class='col grid-margin stretch-card'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title mb-0'>Script</h4><br/>
              <p>안녕하세요 학생여러분 오늘은 자료구조 중 스택에 대해 학습해 보겠습니다.스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행되는 제한 조건을 가지는 선형 자료 구조입니다.</p>
            </div>
          </div>
        </div>
      </div>
      <div class='col-md-4 grid-margin stretch-card'>
        <div class='card'>
          <div class='card-body d-flex flex-column'>
            <h4 class='card-title mb-0'>Time Line</h4><br/>
            <div class='col scroll type1'>
              <div v-for="item of timeline" v-bind:key='item' class='card1'>
                <div class='card-body'>
                  <div class='row'>
                  <img width='40%' height='40%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg">
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
        <div class='card-body d-flex flex-column' style='height:800px;'>
          <h4 class='card-title mb-0'>Summary</h4>
          <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light"><i class="mdi mdi-download"></i>Save</b-button></div><br/>
            <div class='col scroll type1'>
              <div v-for="item of timeline" v-bind:key='item' class='card1'>
                <div class='card-body'>
                  <div class='row'>
                    <img width='25%' height='25%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg">
                    <div class='cos-xs-7 col-centered'><br/>
                      &nbsp;&nbsp;{{item.key_word}}<br/>
                      &nbsp;&nbsp;{{item.summary}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='col stretch-card' style='width:98%; margin-left:10px'>
      <div class='card'>
        <div class='col card-body'>
          <h4 class='card-title mb-0'>Keyword</h4><br/>
          <div class='card-body left-box'>
            <pie-chart height="200" style='position:relative; left:23%;'></pie-chart>
          </div>
          <div class='right-box'>
            <h4 v-for="(item,i) of timeline" v-bind:key='item' v-if="i < 3">#{{item.key_word}}&nbsp;&nbsp;</h4>
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
        {key_word: '스택', time: '15:00 - 22:00', summary: '스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행됩니다.'},
        {key_word: '마무리', time: '22:00 - 35:00', summary: '오늘 수업은 여기서 마무리하겠습니다.'},
        {key_word: '과제', time: '35:00 - 52:20', summary: '다음주까지 나만의 노트 정리하기 과제입니다.'}
      ],
      mediaRecorder: {},
      chunks: [ ],
      localStream: {}
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
    },
    ShareScreen () {
      if (navigator.mediaDevices.getDisplayMedia && window.MediaRecorder !== undefined) {
        navigator.mediaDevices.getDisplayMedia({video: true, audio: true}).then(function (screenStream) {
          this.localstream = screenStream

          this.localstream.getTracks().forEach(function (track) {})
          document.querySelector('video').srcObject = this.localstream
          document.querySelector('video').play()
          document.querySelector('video').muted = true

          try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext
            window.audioContext = new AudioContext()
          } catch (e) {
          }
        }.bind(this))
      }
    },
    BtnRecordClicked () {
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        var options = { mimeType: 'audio/webm;codecs=opus' }
        this.mediaRecorder = new MediaRecorder(this.localstream, options)
      } else {
        this.mediaRecorder = new MediaRecorder(this.localstream)
      }

      this.mediaRecorder.ondataavailable = function (e) {
        this.chunks.push(e.data)
      }.bind(this)

      setTimeout(function () {
        this.BtnStopClicked()
      }.bind(this), 10000)

      this.mediaRecorder.onstop = function () {
        var blob = new Blob(this.chunks, { type: 'audio/mp3' })
        this.chunks = []

        var videoURL = window.URL.createObjectURL(blob)

        document.querySelector('a#downloadLink').href = videoURL
        document.querySelector('a#downloadLink').innerHTML = 'Download mp3 file'

        var rand = Math.floor(Math.random() * 10000000)
        var name = 'audio_' + rand + '.mp3'

        document.querySelector('a#downloadLink').setAttribute('download', name)
        document.querySelector('a#downloadLink').setAttribute('name', name)
      }.bind(this)

      this.mediaRecorder.start(10)
    },
    BtnStopClicked () {
      this.mediaRecorder.stop()
    },
    CaptureScreen () {
      const video = document.querySelector('video')
      const canvas = window.canvas = document.querySelector('canvas')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(function (blob) {}, 'image/jpeg', 0.95)
      canvas.toBlob(function (blob) {
        var screenURL = window.URL.createObjectURL(blob)

        document.querySelector('a#screenshotLink').href = screenURL
        document.querySelector('a#screenshotLink').innerHTML = 'Download jpeg file'

        var rand = Math.floor(Math.random() * 10000000)
        var name = 'screen_' + rand + '.jpeg'

        document.querySelector('a#screenshotLink').setAttribute('download', name)
        document.querySelector('a#screenshotLink').setAttribute('name', name)
      })
    },
    recordPer10s () {

    }
  }
}
</script>

<style scoped lang='scss'>
.scroll{ overflow-y: scroll; }
.type1::-webkit-scrollbar{ width: 6px; }
.type1::-webkit-scrollbar-thumb{ height: 7%; background-color: rgb(223, 223, 223); border-radius: 15px; }
.type1::-webkit-scrollbar-track{ background-color: white; }
.card1 {
    border: solid 1px rgb(223, 223, 223); margin-bottom: 8px;
    .card1-title { color: black; }
    .card1-header { background: black; }
}
.left-box { width:55%; height:90%; float:left; box-sizing:border-box; }
.right-box { width:45%; height:90%; float:right; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center; text-align:left; }
video { background:#222; width:100%; height:400px; }
canvas { display:none; }
</style>

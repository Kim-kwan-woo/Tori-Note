<template lang='html'>
  <section class='Study'>
    <div class='col'>
      <div class='row' style='margin-right:1px;'>
        <div class='col'>
          <div class='col grid-margin stretch-card'>
            <div class='card'>
              <div class='card-body'>
                <h4 class='card-title mb-0'>Video</h4>
                <div v-if="Record" style='position:absolute; top:25px; right:160px;'><b-button class="btn-fw btn-inverse-light" @click="StopPer10s"><i class="mdi mdi-stop"></i>Stop</b-button></div>
                <div v-else style='position:absolute; top:25px; right:160px;'><b-button class="btn-fw btn-inverse-light" @click="AllrecordPer10s"><i class="mdi mdi-step-forward"></i>Start</b-button></div>
                <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light" @click="ShareScreen"><i class="mdi mdi-desktop-mac"></i>Share</b-button></div><br/>
                <video ref="videoElement" controls autoplay></video><br/>
                <canvas></canvas>
              </div>
            </div>
          </div>
        <div class='col grid-margin stretch-card'>
          <div class='card'>
            <div class='card-body'>
              <h4 class='card-title mb-0' id='script'>Script</h4><br/>
              <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light" @click="editScript"><i class="mdi mdi-border-color"></i>Edit</b-button></div>
              <div class='row' style='padding-left:2%; padding-right:2%;'>
                <img width='38%' height='100%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg" style='margin-right:2%;'>
                <textarea rows='4' style='width:60%; border:none;'>안녕하세요 학생여러분 오늘은 자료구조 중 스택에 대해 학습해 보겠습니다.스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행되는 제한 조건을 가지는 선형 자료 구조입니다.</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='col-md-3 grid-margin stretch-card'>
        <div class='card'>
          <div class='card-body d-flex flex-column' style='padding-left:8%; padding-right:8%;'>
            <h4 class='card-title mb-0' style='padding-left:10px;'>Time Line</h4><br/>
            <div class='col scroll type1'>
              <div v-for="item of timeline" v-bind:key='item' class='card1' style='border: solid 1px rgb(255, 255, 255);'>
                <div class='card-body' style='padding:0px;'>
                  <div class='row'>
                  <img width='100%' height='100%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg" @click="imgClicked(item.summary)">
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
            <pie-chart height="200" style='position:relative; left:23%; z-index:100;'></pie-chart>
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
import pieChart from '../components/charts/examples/pieChart'
import JQuery from 'jquery'
import axios from 'axios'

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
      localStream: {},
      mediaRecorder: {},
      chunks: [],
      mediaRecorder_Even: {},
      chunks_Even: [],
      sending_index: {},
      curScript: {},
      StopPer10: false,
      Record: false
    }
  },
  components: {
    pieChart
  },
  methods: {
    toggleProBanner: function () {
      $('body').toggleClass('pro-banner-collapse')
    },
    ShareScreen () {
      this.sending_index = 0
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
    setTimeoutPromise (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
      })
    },
    imgClicked (script) {
      var textarea = document.querySelector('textarea')
      textarea.value = script

      axios.get('http://localhost:3000/')
        .then(res => {
          console.log(res.data)
        })
    },
    editScript () {
      var textarea = document.querySelector('textarea')
      var editScript = textarea.value
      $.ajax({
        type: 'post',
        url: 'http://localhost:3000/',
        data: {
          'editScript': editScript
        },
        dataType: 'json'
      }).catch(error => {
        console.log(error.message)
      })
    },
    BtnRecordClicked () {
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        var options = {
          bitsPerSecond: 80000,
          mimeType: 'audio/webm;codecs=opus' }
        this.mediaRecorder = new MediaRecorder(this.localstream, options)
      } else {
        this.mediaRecorder = new MediaRecorder(this.localstream)
      }
      this.mediaRecorder.start(10)
      this.mediaRecorder.ondataavailable = function (e) {
        this.chunks.push(e.data)
      }.bind(this)
    },
    BtnStopClicked () {
      const AWS = require('aws-sdk')
      const S3 = new AWS.S3({
        endpoint: new AWS.Endpoint('https://kr.object.ncloudstorage.com'),
        region: 'kr-standard',
        credentials: {
          accessKeyId: 'LfBjyBF6ocOQYRbUixDo',
          secretAccessKey: '15bfVslnjweqk144cX9lAx5TjbkNfDvvA7KPFcKG'
        }
      })
      this.mediaRecorder.stop()
      return new Promise((resolve, reject) => {
        this.mediaRecorder.onstop = async function () {
          const file = new Blob(this.chunks, {type: 'audio/webm'})
          this.chunks = []
          const fileName = 'audio_' + this.sending_index + '.webm'
          await S3.putObject({
            Bucket: 'yuki/audio',
            Key: fileName,
            ACL: 'public-read',
            Body: file
          }).promise()
          resolve()
        }.bind(this)
      })
    },
    BtnRecordClicked_Even () {
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        var options = {
          bitsPerSecond: 80000,
          mimeType: 'audio/webm;codecs=opus' }
        this.mediaRecorder_Even = new MediaRecorder(this.localstream, options)
      } else {
        this.mediaRecorder_Even = new MediaRecorder(this.localstream)
      }
      this.mediaRecorder_Even.start(10)
      this.mediaRecorder_Even.ondataavailable = function (e) {
        this.chunks_Even.push(e.data)
      }.bind(this)
    },
    BtnStopClicked_Even () {
      const AWS = require('aws-sdk')
      const S3 = new AWS.S3({
        endpoint: new AWS.Endpoint('https://kr.object.ncloudstorage.com'),
        region: 'kr-standard',
        credentials: {
          accessKeyId: 'LfBjyBF6ocOQYRbUixDo',
          secretAccessKey: '15bfVslnjweqk144cX9lAx5TjbkNfDvvA7KPFcKG'
        }
      })
      this.mediaRecorder_Even.stop()
      return new Promise((resolve, reject) => {
        this.mediaRecorder_Even.onstop = async function () {
          const file = new Blob(this.chunks_Even, {type: 'audio/webm'})
          this.chunks_Even = []
          const fileName = 'audio_' + this.sending_index + '.webm'
          await S3.putObject({
            Bucket: 'yuki/audio',
            Key: fileName,
            ACL: 'public-read',
            Body: file
          }).promise()
          resolve()
        }.bind(this)
      })
    },
    CaptureScreen () {
      const video = document.querySelector('video')
      const canvas = window.canvas = document.querySelector('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
      const imgBase64 = canvas.toDataURL('image/jpeg', 'image/octet-stream')
      const decodImg = atob(imgBase64.split(',')[1])
      let array = []
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i))
      }
      const file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      const fileName = 'img_' + this.sending_index++ + '.jpeg'
      let formData = new FormData()
      formData.append('upload', file, fileName)
      $.ajax({
        type: 'post',
        url: 'http://localhost:3000/upload',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
      }).catch(error => {
        console.log(error.message)
      })
    },
    async OddrecordPer10s () {
      this.BtnRecordClicked()
      await this.setTimeoutPromise(59000)
      await this.BtnStopClicked()
      this.CaptureScreen()
    },
    async EvenrecordPer10s () {
      this.BtnRecordClicked_Even()
      await this.setTimeoutPromise(59000)
      await this.BtnStopClicked_Even()
      this.CaptureScreen()
    },
    async AllrecordPer10s () {
      this.Record = true
      this.StopPer10 = false
      while (this.StopPer10 === false) {
        this.OddrecordPer10s()
        await this.setTimeoutPromise(58770)
        this.EvenrecordPer10s()
        await this.setTimeoutPromise(58770)
      }
    },
    StopPer10s () {
      this.Record = false
      this.StopPer10 = true
      this.chunks = [] // 나중에 수정해야 할지도
      this.chunks_Even = []
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
video { background:#222; width:100%; height:480px; }
canvas { display:none; visibility:hidden; }
</style>

<template lang='html'>
  <section class='Study'>
    <div class='row'>
      <div id="popPosition" class="popPosition card">
        <p>Tori Note가 여러분의 강의력을 높여줄게요!</p>
        <textarea id="title" rows='1' style='width:98%; margin-bottom:15px' placeholder="Input your Note Title..."></textarea><br/>
        <b-button class="btn-fw btn-inverse-light" @click="AllrecordPer10s"><i class="mdi mdi-note-plus"></i>Create</b-button>
      </div>
      <div style='position:relative; top:3px; left:3px; padding:2px;'><img v-on:click="Time_Line=!Time_Line" id="toggle" width='18px' height='18px' src="../assets/images/arrow_r.png"></div>
      <div v-show="Time_Line" class='col-md-1 grid-margin stretch-card timelineDiv' id='timeline'>
        <div class='card'>
          <div class='card-body d-flex flex-column' style='padding-top:5%; padding-left:4%; padding-right:0%;'>
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
      <div class='col grid-margin stretch-card'>
        <div class='card'>
          <div class='card-body'>
            <h4 class='card-title mb-0'>Video</h4>
            <div v-if="Record" style='position:absolute; top:25px; right:160px;'><b-button class="btn-fw btn-inverse-light" @click="StopPer10s"><i class="mdi mdi-stop"></i>Stop</b-button></div>
            <div v-else style='position:absolute; top:25px; right:160px;'><b-button class="btn-fw btn-inverse-light" @click="ShowPopTitle"><i class="mdi mdi-step-forward"></i>Start</b-button></div>
            <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light" @click="ShareScreen"><i class="mdi mdi-desktop-mac"></i>Share</b-button></div><br/>
            <video ref="videoElement" controls autoplay></video><br/>
            <canvas></canvas>
          </div>
        </div>
      </div>
      <div class='col-md-5 grid-margin stretch-card'>
        <div class='card'>
          <div class='card-body'>
            <h4 class='card-title mb-0' id='script'>Script</h4><br/>
            <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light" @click="editScript"><i class="mdi mdi-border-color"></i>Edit</b-button></div>
            <div class='col' style='padding-left:0px; padding-right:0px;'>
              <img width='100%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg" style='margin-right:2%;'>
              <textarea id="script" class='scroll type1' rows='5' style='width:100%; border:none;'>안녕하세요 학생여러분 오늘은 자료구조 중 스택에 대해 학습해 보겠습니다.스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행되는 제한 조건을 가지는 선형 자료 구조입니다.</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import pieChart from '../components/charts/examples/pieChart'
import JQuery from 'jquery'
import S3config from './Key.js'
import axios from 'axios'
import lamejs from 'lamejs'

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
      Record: false,
      Time_Line: true
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
      var textarea = document.querySelector('textarea#script')
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
          accessKeyId: S3config.accessKeyId,
          secretAccessKey: S3config.secretAccessKey
        }
      })
      this.mediaRecorder.stop()
      return new Promise((resolve, reject) => {
        this.mediaRecorder.onstop = async function () {
          var tmpFile = new Blob(this.chunks, {type: 'audio/webm'})
          var file = await this.convertToMP3(tmpFile)
          this.chunks = []
          const fileName = 'audio_' + this.sending_index + '.mp3'
          await S3.putObject({
            Bucket: S3config.Bucket,
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
          accessKeyId: S3config.accessKeyId,
          secretAccessKey: S3config.secretAccessKey
        }
      })
      this.mediaRecorder_Even.stop()
      return new Promise((resolve, reject) => {
        this.mediaRecorder_Even.onstop = async function () {
          const file = new Blob(this.chunks_Even, {type: 'audio/webm'})
          this.chunks_Even = []
          const fileName = 'audio_' + this.sending_index + '.webm'
          await S3.putObject({
            Bucket: S3config.Bucket,
            Key: fileName,
            ACL: 'public-read',
            Body: file
          }).promise()
          resolve()
        }.bind(this)
      })
    },
    CaptureScreen () {
      /*
      const testimg = document.getElementById('123')
      const testdata = [{'imgURL': 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAABWoAAAM...'}]
      testimg.src = testdata[0].imgURL
      */
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
      await this.setTimeoutPromise(9000)
      await this.BtnStopClicked()
      this.CaptureScreen()
    },
    async EvenrecordPer10s () {
      this.BtnRecordClicked_Even()
      await this.setTimeoutPromise(9000)
      await this.BtnStopClicked_Even()
      this.CaptureScreen()
    },
    async AllrecordPer10s () {
      const pop = document.getElementById('popPosition')
      pop.style.display = 'none'
      var textarea = document.querySelector('textarea#title')
      var title = textarea.value
      console.log(title)
      if (title === '') {
        alert('제목을 입력하세요!')
      } else {
        this.Record = true
        this.StopPer10 = false
        $.ajax({
          type: 'post',
          url: 'http://localhost:3000/',
          data: {
            'title': title
          },
          dataType: 'json'
        }).catch(error => {
          console.log(error.message)
        })
        while (this.StopPer10 === false) {
          this.OddrecordPer10s()
          await this.setTimeoutPromise(8770)
          this.EvenrecordPer10s()
          await this.setTimeoutPromise(8770)
        }
      }
    },
    async StopPer10s () {
      this.Record = false
      this.StopPer10 = true
      await this.BtnStopClicked()
      await this.BtnStopClicked_Even()
      this.CaptureScreen()
    },
    ShowPopTitle () {
      const pop = document.getElementById('popPosition')
      pop.style.display = 'block'
    },
    convertToMP3 (blob) {
      return new Promise((resolve, reject) => {
        const audioContext = new AudioContext()
        blob.arrayBuffer().then(function (arrayBuffer) {
          // Convert array buffer into audio buffer.
          audioContext.decodeAudioData(arrayBuffer).then(function (aBuffer) {
            try {
              // audio Buffer To Wav
              const numOfChan = aBuffer.numberOfChannels
              const btwLength = aBuffer.length * numOfChan * 2 + 44
              const btwArrBuff = new ArrayBuffer(btwLength)
              const btwView = new DataView(btwArrBuff)
              const btwChnls = []
              let btwSample
              let btwPos = 0
              let btwOffset = 0
              const setUint16 = (value) => {
                btwView.setUint16(btwPos, value, true)
                btwPos += 2
              }
              const setUint32 = (value) => {
                btwView.setUint32(btwPos, value, true)
                btwPos += 4
              }
              setUint32(0x46464952) // "RIFF"
              setUint32(btwLength - 8) // file length - 8
              setUint32(0x45564157) // "WAVE"
              setUint32(0x20746d66) // "fmt " chunk
              setUint32(16) // length = 16
              setUint16(1) // PCM (uncompressed)
              setUint16(numOfChan)
              setUint32(aBuffer.sampleRate)
              setUint32(aBuffer.sampleRate * 2 * numOfChan) // avg. bytes/sec
              setUint16(numOfChan * 2) // block-align
              setUint16(16) // 16-bit
              setUint32(0x61746164) // "data" - chunk
              setUint32(btwLength - btwPos - 4) // chunk length
              for (let btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++) {
                btwChnls.push(aBuffer.getChannelData(btwIndex))
              }
              while (btwPos < btwLength) {
                for (let btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
                  // interleave btwChnls
                  btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])) // clamp
                  btwSample = (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) || 0 // scale to 16-bit signed int
                  btwView.setInt16(btwPos, btwSample, true) // write 16-bit sample
                  btwPos += 2
                }
                btwOffset++ // next source sample
              }
              const wavHdr = lamejs.WavHeader.readHeader(new DataView(btwArrBuff))
              const data = new Int16Array(btwArrBuff, wavHdr.dataOffset, wavHdr.dataLen / 2)
              // wav to MP3 (only channels 1)
              const channels = wavHdr.channels
              const sampleRate = wavHdr.sampleRate
              const buffer = []
              const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128)
              let remaining = data.length
              const samplesPerFrame = 1152
              let mp3buf
              for (let i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
                const mono = data.subarray(i, i + samplesPerFrame)
                mp3buf = mp3enc.encodeBuffer(mono)
                if (mp3buf.length > 0) {
                  buffer.push(mp3buf)// new Int8Array(mp3buf));
                }
                remaining -= samplesPerFrame
              }
              const d = mp3enc.flush()
              if (d.length > 0) {
                buffer.push(new Int8Array(d))
              }
              const mp3Blob = new Blob(buffer, {type: 'audio/mp3'})
              resolve(mp3Blob)
            } catch (error) {
              console.log(error)
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.scroll {
  overflow-y: scroll;
}
.type1::-webkit-scrollbar {
  width: 6px;
}
.type1::-webkit-scrollbar-thumb {
  height: 7%;
  background-color: rgb(223, 223, 223);
  border-radius: 15px;
}
.type1::-webkit-scrollbar-track {
  background-color: white;
}
.card1 {
  border: solid 1px rgb(223, 223, 223);
  margin-bottom: 5px;
  .card1-title {
    color: black;
  }
  .card1-header {
    background: black;
  }
}
.left-box {
  width: 55%;
  height: 90%;
  float: left;
  box-sizing: border-box;
}
.right-box {
  width: 45%;
  height: 90%;
  float: right;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
video {
  background: #222;
  width: 100%;
  height: 380px;
}
canvas {
  display: none;
  visibility: hidden;
}
#popPosition {
  padding: 3%;
  text-align: center;
  background-color: #fff;
  border: solid 1px rgb(223, 223, 223);
  border-radius: 10px 10px 10px 10px;
  position: absolute;
  height: 210px;
  width: 400px;
  margin: -105px 0px 0px -200px;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: none;
}
</style>

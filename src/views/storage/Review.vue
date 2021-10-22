<template lang="html">
  <section class="Review">
    <div style='position:absolute; top:90px; right:30px;'><b-button class="btn-fw btn-inverse-light" @click="exportToPDF"><i class="mdi mdi-download"></i>PDF</b-button></div>
    <div ref="pdfarea">
      <h3>{{ lecture_name }} {{ date }}</h3>
      <div class="row">
        <div class="col-md grid-margin">
          <div class="card" v-for="item in orderItems" v-bind:key="item.start" style="margin-bottom:25px;">
            <div class="card-body">
              <div style="float:left; width:35%; margin-right:10px;">
                <img width='100%' height='100%' v-bind:src='item.imgURL'>
              </div>
              <div>
                <h4 class='card-title mb-0' id='script'>Script</h4><br/>
                {{ item.script }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import html2pdf from 'html2pdf.js'
import JQuery from 'jquery'
import S3config from '../Key.js'

let $ = JQuery

export default {
  name: 'Review',
  data () {
    return {
      items: [
        {
          imgURL: 'https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg',
          id: 'choi_',
          start: 1,
          end: '3',
          script: '발달해 있음을 알 수 있겠죠. 뿐만 아니라 여러분들 여기에 또 이제 굉장히그 유려한 문체를 볼 수 있는 근거가 하나 있는데 그 근'
        },
        {
          imgURL: 'https://img.insight.co.kr/static/2016/02/15/700/yy1275us791rlld79jxb.jpg',
          id: 'choi_',
          start: 4,
          end: '4',
          script: '그면 사 지적 비라는 게 있습니다 이거는 부여해서'
        }
      ],
      request: false, // storage 한번만 요청
      sound: null
    }
  },
  props: {
    lecture_name: { type: String, default: '' },
    date: { type: String, default: '' }
  },
  created () {
  },
  computed: {
    orderItems: function () {
      if (this.request === false) {
        this.RequestItem()
      }
      return this.items.slice().sort(function (a, b) {
        return a.start - b.start // start 기준으로 오름차순 정렬
      })
    }
  },
  methods: {
    RequestItem () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/storage/note',
        data: {
          'lecture_name': this.lecture_name,
          'date': this.date
        },
        dataType: 'json',
        success: function (data) {
          for (var i = 0; i < data.length; i++) {
            this.items.push({imgURL: data[i].imgURL, id: data[i].id, start: data[i].start, end: data[i].end, script: data[i].script})
          }
          this.request = true
        }.bind(this)
      }).catch(error => {
        console.log(error.message)
      })
    },
    exportToPDF () {
      // window.scrollTo(0, 0);
      console.log('dd')
      html2pdf(this.$refs.pdfarea, {
        margin: 0,
        filename: 'document.pdf',
        image: {type: 'jpg', quality: 0.95},
        // allowTaint 옵션추가
        html2canvas: {
          useCORS: true, scrollY: 0, scale: 1, dpi: 300, letterRendering: true, allowTaint: false
        },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4', compressPDF: true }
      })
    },
    onAudioSelected (e) {
      const AWS = require('aws-sdk')
      const S3 = new AWS.S3({
        endpoint: new AWS.Endpoint('https://kr.object.ncloudstorage.com'),
        region: 'kr-standard',
        credentials: {
          accessKeyId: S3config.accessKeyId,
          secretAccessKey: S3config.secretAccessKey
        }
      })
      const params = {
        Bucket: S3config.Bucket,
        Key: 'audio_0.mp3'
      }

      S3.getObject(params, (err, data) => {
        if (err) {
          console.log(err, err.stack)
        } else {
          let mp3Blob = new Blob([data.Body], {
            type: 'audio/mp3'
          })
          this.$refs.source.src = window.URL.createObjectURL(mp3Blob)
          this.$refs.player.load()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>

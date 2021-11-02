<template lang="html">
  <section class="Review">
    <div style='position:absolute; top:90px; right:30px;'><b-button class="btn-fw btn-inverse-light" @click="exportToPDF"><i class="mdi mdi-download"></i>PDF</b-button></div>
    <div ref="pdfarea">
      <h3>{{ lecture_name }} {{ date }}</h3>
      <div class="row">
        <div class="col-md-12 grid-margin">
          <div class="card" v-for="(item, index) in orderItems" v-bind:key="item.start" style="margin-bottom:25px;">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 grid-margin">
                  <div calss="col">
                    <div class="col-md-5" style="float:left;">
                      <img width='100%' height='100%' v-bind:src='item.imgURL'>
                      <audio v-bind:id='index' controls="controls" src="[blobURL]" type="audio/mp3" name="playbar" style='width: 100%; margin-top:20px;' />
                      <div v-bind:id='index + 1000' @click="playAudio(index, item.id, item.start, item.end)" name="loadbtn" style='position:absolute; bottom:22px; left:31px; z-index:1; display:block'>▶</div>
                    </div>
                    <div class="col-md-7" style="float:right;">
                      <div style='position:absolute; top:0px; right:10px;'><b-button name="editSum" class="btn-fw btn-inverse-light" @click="editSummary(index)"><i class="mdi mdi-border-color"></i>Edit</b-button></div>
                      <h4 class='card-title mb-0' id="Pscript">Summary</h4><br/>
                      <div id="summary" class="editable scroll type1" contenteditable="true" style='width:100%; border:none;'>
                        <div v-if="item.summary[0] === 'NO SUMMARY'" style="text-align:center;">
                          <img width='50%' height='100%' src='../../assets/images/kwantori.gif'>
                          <br/>요약을 생성 중이에요!
                        </div>
                        <div v-else> <!-- 요약이 있는 경우 -->
                          <ol>
                            <li><div name='summary'>{{item.summary[0]}}</div></li>
                            <li><div name='summary'>{{item.summary[1]}}</div></li>
                            <li><div name='summary'>{{item.summary[2]}}</div></li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div style='position:absolute; top:0px; right:10px;'><b-button name="editScr" class="btn-fw btn-inverse-light" @click="editScript(index)"><i class="mdi mdi-border-color"></i>Edit</b-button></div>
                  <h4 class='card-title mb-0' id="Pscript">Script</h4><br/>
                  <textarea v-model="item.script" id="script" name="script" class='scroll type1' style='height:180px; width:100%; border:none;'>
                  </textarea>
                </div>
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
import S3config from '../Key.js'
import JQuery from 'jquery'
import axios from 'axios'

let $ = JQuery

export default {
  name: 'Review',
  data () {
    return {
      items: [
      ],
      request: false, // storage 한번만 요청
      mp3Arr: null
    }
  },
  props: {
    lecture_name: { type: String, default: '' },
    date: { type: String, default: '' }
  },
  computed: {
    orderItems: function () {
      if (this.request === false) {
        this.RequestItem()
        console.log(this.items)
      }
      return this.items.slice().sort(function (a, b) {
        return a.start - b.start // start 기준으로 오름차순 정렬
      })
    }
  },
  methods: {
    test () {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/summary',
        contentType: 'application/json',
        data: JSON.stringify({
          'text': '거기에 왕인 박사가 오는 그 모습을 재현하는 게 아직도 일본에서는 큰 마을의 어떤 행사로 취해지고 있습니다. 정확하게 이제그 상복 시대에 어떤 일본에 영향을 주었던 어떤 그런 모습들을 지금도 확인할 수 있는 어떤 그런 축제가 아닌가 라는 생각이 듭니다. 와이런 것들을 봐도 백제의 어떤 유학의 어떤 문화들이 굉장히 많이 발달했음을 알 수 있겠죠. 뿐만 아니라 여러분들 여기에 또 이제 굉장히 그 유려한 문체를 볼 수 있는 근거가 하나 있는데 그 근거가 뭐냐면 사택 지적 비라는 게 있습니다 네 이거는 부여에서 발견이 된 그런 비석인데요 이 사택 지적비 같은 경우에는 굉장히 문체가 아주 유려해요 그래서 여기에 어떤 불교적인 요소 조교적인 요소. 여러 종교적 요소가 들어갔다고는 하는데. 그게뭐 해석에 따라 달라지기 때문에 그게 중요한 건 아니에요. 다만'
        }),
        success: function (data) {
          console.log(data)
        }
      }).catch(error => {
        console.log(error.message)
      })
    },
    RequestItem () {
      axios.get('http://localhost:3000/storage/note', {
        params: {
          lecture_name: this.lecture_name,
          date: this.date
        }
      })
        .then(function (data) {
          for (var i = 0; i < data.data.length - 1; i++) {
            console.log(data.data[i])
            this.items.push({
              imgURL: data.data[i].imgURL + ',' + data.data[i].image,
              id: data.data[i].id,
              start: data.data[i].start,
              end: data.data[i].end,
              script: data.data[i].script,
              summary: data.data[i].summary
            })
          }
          console.log(this.items.length)
          this.request = true
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    setTimeoutPromise (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
      })
    },
    async exportToPDF () {
      const textarea = document.getElementsByTagName('textarea')
      for (let i = 0; i < textarea.length; i++) {
        textarea[i].style.height = '1px'
        textarea[i].style.height = (2 * textarea[i].scrollHeight) + 'px' // textarea 높이 조절 (스크롤 없도록)
      }
      const editSum = document.getElementsByName('editSum')
      const editScr = document.getElementsByName('editScr')
      const loadbtn = document.getElementsByName('loadbtn')
      for (let i = 0; i < editSum.length; i++) {
        editSum[i].style.display = 'none'
        editScr[i].style.display = 'none'
        loadbtn[i].style.display = 'none'
      }

      html2pdf(this.$refs.pdfarea, {
        margin: 0,
        filename: this.lecture_name + '_' + this.date + '.pdf',
        image: {type: 'jpg', quality: 0.95},
        html2canvas: {
          useCORS: true, scrollY: 0, scale: 1, dpi: 300, letterRendering: true, allowTaint: false
        },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4', compressPDF: true }
      })

      await this.setTimeoutPromise(5000)
      for (let i = 0; i < textarea.length; i++) {
        textarea[i].style.height = '180px'
      }
      for (let i = 0; i < editSum.length; i++) {
        editSum[i].style.display = 'block'
        editScr[i].style.display = 'block'
        loadbtn[i].style.display = 'block'
      }
    },
    loadAudio (S3, params) {
      return new Promise((resolve, reject) => {
        S3.getObject(params, (err, data) => {
          if (err) {
            console.log(err, err.stack)
          } else if (this.mp3Arr === null) {
            this.mp3Arr = data.Body
            resolve()
          } else {
            this.mp3Arr = new Uint8Array([...this.mp3Arr, ...data.Body])
            resolve()
          }
        })
      })
    },
    async playAudio (index, id, start, end) {
      document.getElementById(index + 1000).style.display = 'none'
      const AWS = require('aws-sdk')
      const S3 = new AWS.S3({
        endpoint: new AWS.Endpoint('https://kr.object.ncloudstorage.com'),
        region: 'kr-standard',
        credentials: {
          accessKeyId: S3config.accessKeyId,
          secretAccessKey: S3config.secretAccessKey
        }
      })
      for (var i = Number(start); i <= Number(end); i++) {
        console.log(i)
        const params = {
          Bucket: S3config.Bucket,
          Key: String(id) + String(i) + '.mp3'
        }
        await this.loadAudio(S3, params)
      }
      let mp3Blob = new Blob([this.mp3Arr], {type: 'audio/mp3'})
      this.mp3Arr = null
      document.getElementById(index).src = window.URL.createObjectURL(mp3Blob)
      document.getElementById(index).play()
    },
    editSummary (index) {
      const summary0 = document.getElementsByName('summary')[index * 3].innerText
      const summary1 = document.getElementsByName('summary')[index * 3 + 1].innerText
      const summary2 = document.getElementsByName('summary')[index * 3 + 2].innerText
      this.items[index].summary[0] = summary0
      this.items[index].summary[1] = summary1
      this.items[index].summary[2] = summary2
    },
    editScript (index) {
      const edit = document.getElementsByName('script')[index].value
      this.items[index].script = edit
    }
  }
}
</script>

<style scoped lang="scss">
.scroll{ overflow-y: scroll; }
.type1::-webkit-scrollbar{ width: 6px; }
.type1::-webkit-scrollbar-thumb{ height: 7%; background-color: rgb(223, 223, 223); border-radius: 15px; }
.type1::-webkit-scrollbar-track{ background-color: white; }

textarea { resize: none; }

.bounce {
  animation: bounce_frames 0.5s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(.5, 0.05, 1, .5);
  animation-iteration-count: 1000;
}
@keyframes bounce_frames {
  from {transform: translate3d(0, 0, 0);}
  to {transform: translate3d(0, 50px, 0);}
}
</style>

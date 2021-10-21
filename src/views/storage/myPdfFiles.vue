<template lang="html">
    <section class="myPdfFiles">
      <vue-html2pdf
        :show-layout="true"
        :float-layout="false"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="500"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="500px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
      <section class="pdf-content">
      <div class="popPosition card" id="popPosition">
        <div class='row'>
          <div class='col-md-2 grid-margin stretch-card' id='timeline'>
            <div class='card' style="border: solid 1px rgb(223, 223, 223); box-shadow: none;">
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
              <div class='col grid-margin stretch-card pdf-item'>
                <div class='card' style="border: solid 1px rgb(223, 223, 223); box-shadow: none; text-align: center;">
                  <div class='card-body' style='padding-left:10px; padding-right:10px;'>
                    <h4 class='card-title mb-0' id='script'>자료구조 2019.10.30.</h4><br/>
                    <img width='100%' src="https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg">
                    <audio class="player" controls ref="player" style="width: 100%; margin-top:20px;">
                      <source src="" ref="source">
                    </audio>
                  </div>
                </div>
              </div>
              <div class='col grid-margin stretch-card pdf-item'>
                <div class='card' style="border: solid 1px rgb(223, 223, 223); box-shadow: none;">
                  <div class='card-body'>
                    <h4 class='card-title mb-0' id='script'>Script</h4><br/>
                    <div style='position:absolute; top:25px; right:25px;'><b-button class="btn-fw btn-inverse-light" @click="editScript"><i class="mdi mdi-border-color"></i>Edit</b-button></div>
                    <div class='col' style='padding-left:0px; padding-right:0px;'>
                      <textarea id="script" class='scroll type1' rows='7' style='width:100%; border:none;'>안녕하세요 학생여러분 오늘은 자료구조 중 스택에 대해 학습해 보겠습니다.스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행되는 제한 조건을 가지는 선형 자료 구조입니다.</textarea>
                    </div>
                    <h4 class='card-title mb-0' id='script'>Summary</h4><br/>
                    <div class='col' style='padding-left:0px; padding-right:0px;'>
                      <textarea id="script" class='scroll type1' rows='5' style='width:100%; border:none;'>안녕하세요 학생여러분 오늘은 자료구조 중 스택에 대해 학습해 보겠습니다.스택은 모든 원소들의 삽입과 삭제가 리스트의 한쪽 끝에서만 수행되는 제한 조건을 가지는 선형 자료 구조입니다.</textarea>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div style="text-align: center;">
          <b-button class="btn-fw btn-inverse-link" @click="exportToPDF"><i class="mdi mdi-file-pdf-box"></i>Save</b-button>
          <b-button class="btn-fw btn-inverse-link" @click="closeReview"><i class="mdi mdi-window-close"></i>Exit</b-button>
        </div>
      </div> <!-- 까지 열람 팝업 -->
      </section>
      </vue-html2pdf>
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h3>Storage</h3><br>
                <ul v-for="(date, idx) of sortUniqueDate" :key="idx" >
                  <h5>{{ date.substring(0, 4) }}.{{ date.substring(4, 6) }}.{{ date.substring(6, 8) }}.</h5>
                    <li v-for="item in orderItems" v-bind:key="item.name" v-if="date==item.date">
                      <div @click="showReview(item.name)"><i class="mdi mdi-file-pdf-box"></i> {{ item.name }}</div>
                    </li>
                    <br>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="js">
// import html2pdf from 'html2pdf.js'
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'myPdfFiles',
  components: {
    VueHtml2pdf
  },
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
      items: [
        { name: '2021-09-20-20-00.pdf', date: '20210920' },
        { name: '2021-09-20-19-20.pdf', date: '20210920' },
        { name: '2021-09-18-17-55.pdf', date: '20210918' },
        { name: '2021-09-20-11-30.pdf', date: '20210920' }
      ],
      propTitle: 'mypdf'
    }
  },
  computed: {
    orderItems: function () {
      return this.items.slice().sort(function (a, b) {
        return b.date - a.date // date 기준으로 내림차순 정렬
      })
    },
    sortUniqueDate () {
      const dates = this.orderItems.map(a => a.date)
      const uniqueDates = Array.from(new Set(dates))
      return uniqueDates // 중복 제거해서 날짜만 저장
    }
  },
  methods: {
    showReview (title) {
      console.log(title)
      const pop = document.getElementById('popPosition')
      pop.style.display = 'block'
    },
    closeReview () {
      const pop = document.getElementById('popPosition')
      pop.style.display = 'none'
    },
    // exportToPDF () {
    //   // window.scrollTo(0, 0);
    //   html2pdf(this.$refs.pdfarea, {
    //     margin: 0,
    //     filename: 'document.pdf',
    //     image: {type: 'jpg', quality: 0.95},
    //     // allowTaint 옵션추가
    //     html2canvas: {
    //       useCORS: true, scrollY: 0, scale: 1, dpi: 300, letterRendering: true, allowTaint: false
    //     },
    //     jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4', compressPDF: true }
    //   })
    // }
    async exportToPDF () {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>

<style scoped lang="scss">
.myPdfFiles { li { list-style:none; } }

.scroll{ overflow-y: scroll; }
.type1::-webkit-scrollbar{ width: 6px; }
.type1::-webkit-scrollbar-thumb{ height: 7%; background-color: rgb(223, 223, 223); border-radius: 15px; }
.type1::-webkit-scrollbar-track{ background-color: white; }

.card1 {
    border: solid 1px rgb(223, 223, 223); margin-bottom: 5px;
    .card1-title { color: black; }
    .card1-header { background: black; }
}

#popPosition {background-color:#fff; position:absolute; padding:1%; height:550px; width:1200px; margin:-275px 0px 0px -600px; top:50%; left:50%; z-index:1; display:none; border:solid 1px rgb(223, 223, 223); border-radius:10px 10px 10px 10px;}
</style>

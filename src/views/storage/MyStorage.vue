<template lang="html">
  <section class="myPdfFiles">
    <div class="row">
        <div class='col-md-3 grid-margin stretch-card' v-for="item of items" v-bind:key="item.lecture_name">
          <div class='zoom card nanumgothic' @click="showReview(item.lecture_name, item.date)">
            <div class='card-body' style="padding:0;">
              <img style="margin-bottom:15px;" width='100%' height='60%' src='https://media.vlpt.us/images/hyacinta/post/b66d1d8b-78ab-4b4d-9867-090edf9aeb00/developmentSummary.jpg'>
              <div style="padding-left:15px; padding-right:15px;">
              <div style="text-align:center;"><h4>{{ item.lecture_name }}</h4></div>
              {{ item.date.substring(0, 4) }}.{{ item.date.substring(4, 6) }}.{{ item.date.substring(6, 8) }}.<br/>
              <span v-for="(keyword, idx) in keyword_array" v-bind:key="idx">
                #{{ keyword }}&nbsp;
              </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script lang="js">
import JQuery from 'jquery'

let $ = JQuery

export default {
  name: 'MyStorage',
  data () {
    return {
      items: [
        { lecture_name: '프로그래밍언어개념', date: '20210920' },
        { lecture_name: '운영체제', date: '20210920' },
        { lecture_name: '컴퓨터네트워크', date: '20210918' },
        { lecture_name: '컴퓨터네트워크', date: '20210920' },
        { lecture_name: '모바일컴퓨팅', date: '20210919' },
        { lecture_name: '프로그래밍언어개념', date: '20210920' }
      ],
      tempUnique: [], // 요소 중복 제거
      request: false, // storage 한번만 요청
      keyword_array: ['빅데이터', 'DNA', '오바마']
    }
  },
  computed: {
    orderItems: function () {
      if (this.request === false) {
        this.RequestItem()
      }
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
    RequestItem () {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/storage',
        dataType: 'json',
        success: function (data) {
          for (var i = 0; i < data.length; i++) {
            if (!this.tempUnique.includes(data[i].lecture_name + ';' + data[i].date)) {
              this.tempUnique.push(data[i].lecture_name + ';' + data[i].date)
            }
          }
          for (var j = 0; j < this.tempUnique.length; j++) {
            console.log(this.tempUnique[j])
            var Split = this.tempUnique[j].split(';')
            this.items.push({lecture_name: Split[0], date: Split[1]})
          }
          this.request = true
        }.bind(this)
      }).catch(error => {
        console.log(error.message)
      })
    },
    showReview (lecture, date) {
      this.$router.push({name: 'Review', params: { lecture_name: lecture, date: date }})
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

.nanumgothic * {
 font-family: 'Nanum Gothic', sans-serif;
 font-weight: 500;
}

.zoom {
  transition: transform .2s; /* Animation */
}

.zoom:hover {
  transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  z-index: 1;
}
</style>

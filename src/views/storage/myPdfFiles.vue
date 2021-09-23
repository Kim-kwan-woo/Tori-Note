<template lang="html">
  <section class="myPdfFiles">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3>Storage</h3><br>
              <ul v-for="(date, idx) of sortUniqueDate" :key="idx" >
                <h5>{{ date.substring(0, 4) }}.{{ date.substring(4, 6) }}.{{ date.substring(6, 8) }}.</h5>
                  <li v-for="item in orderItems" v-bind:key="item.name" v-if="date==item.date">
                    <i class="mdi mdi-file-pdf-box"></i>
                    {{ item.name }}
                  </li>
                  <br>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script lang="js">
export default {
    name: 'myPdfFiles',
    data() {
        return {
            items: [
                { name: '2021-09-20-20-00.pdf', date: '20210920' },
                { name: '2021-09-20-19-20.pdf', date: '20210920' },
                { name: '2021-09-18-17-55.pdf', date: '20210918' },
                { name: '2021-09-20-11-30.pdf', date: '20210920' }
            ]
        }
    },
    computed: {
        orderItems: function() {
            return this.items.sort(function(a, b) {
                return b.date - a.date; //date 기준으로 내림차순 정렬
            });
        },
        sortUniqueDate() {
            const dates = this.orderItems.map(a => a.date)
            const uniqueDates = Array.from(new Set(dates))
            return uniqueDates //중복 제거해서 날짜만 저장
        }
    }
}
</script>

<style scoped lang="scss">
.myPdfFiles {
    li { list-style:none; }
}
</style>

<template>
  <div class="goal">
    <div class="goal-left flex">
      <div class="goal-content">
        <div class="goal-target flex align-center">
          <div class="target-content mr-12">
            <span class="target-content__text mr-6">Goal: </span>
            <span class="target-content__goal">10 EXP per day</span>
          </div>
          <div class="image">
            <iconPencil />
          </div>
        </div>

        <div class="mt-24 day-target flex align-center">
          <div
            class="box"
            :class="{
              'current-day': isCurrentDay(day.position),
              active: isActive(day.position)
            }"
            @click="changeActive(day.position)"
            v-for="(day, index) of week"
            :key="index"
          >
            {{ day.short }}
          </div>
        </div>

        <div class="day-info mt-24">
          <div class="info-data flex align-center mt-24">
            <div class="info-data-content flex align-center">
              <div class="box">
                <div class="inline-box">10</div>
              </div>
              <div class="info-text two-line">Lesson complete</div>
            </div>
            <div class="info-data-content flex align-center">
              <div class="box">
                <div class="inline-box">2,7</div>
              </div>
              <div class="info-text two-line">Average learning time</div>
            </div>
            <div class="info-data-content flex align-center">
              <div class="box">
                <div class="inline-box">3</div>
              </div>
              <div class="info-text two-line">Homework complete</div>
            </div>
          </div>
        </div>
      </div>
      <div class="goal-chart">
        <v-chart class="echarts" :option="option" autoresize :loading="loading" />
      </div>
    </div>
    <div class="goal-right">
      <iconThreeDots />
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import VChart from 'vue-echarts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

export default {
  components: {
    VChart
  },
  data() {
    return {
      week: [
        {
          name: 'Monday',
          short: 'M',
          position: '1'
        },
        {
          name: 'Tuesday',
          short: 'T',
          position: '2'
        },
        {
          name: 'Wednesday',
          short: 'W',
          position: '3'
        },
        {
          name: 'Thursday',
          short: 'T',
          position: '4'
        },
        {
          name: 'Friday',
          short: 'F',
          position: '5'
        },
        {
          name: 'Saturday',
          short: 'S',
          position: '6'
        },
        {
          name: 'Sunday',
          short: 'S',
          position: '0'
        }
      ],
      active: null,
      loading: false,
      option: {
        grid: {
          left: 50,
          top: 50,
          right: 10,
          bottom: 30
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    }
  },

  created() {
    this.active = this.$dayjs().format('d')
    this.loading = true
    setInterval(() => {
      this.loading = false
    }, 500)
  },

  methods: {
    isCurrentDay(index) {
      return this.$dayjs().format('d') === index
    },

    isActive(index) {
      return this.active === index
    },

    changeActive(index) {
      this.active = index
    }
  }
}
</script>

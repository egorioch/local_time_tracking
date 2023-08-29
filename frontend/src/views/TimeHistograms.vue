/**
  Компонент, принимающий данные с сервера. 
  В данных находится действительное время работы и связанная с ним прикладная информация

*/

<template>
  <div class="common-histogram-layer">
    <div class="data-input-layer">
      <label class="label-input-field" for="input-field">Дата: </label>
      <input class="input-field" v-model="findDateText" name="input-field" placeholder="2023-05-14" />
      <button class="data-find-button">Найти</button>
    </div>
    <div class="canvas-chart-class">
      <bar-chart :chartData="chartDataComputed" :chartOptions="options" />
    </div>

    <!-- <div class="pagination-layer">
      <div class="buttons">
        <button class="back-button" v-if="hasPreviosPage" @click="decrementPage()">Назад</button>
        <div class="current-page-value">{{ currentPage }}</div>
        <button class="forward-button" v-if="hasNextPage" @click="incrementPage()">Вперёд</button>
      </div>
    </div> -->

    <pagination-component
      :totalPages="10"
      :perPage="10"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
      class="pagination"
    />
  </div>

  

  

</template>

<script>
import BarChart from '@/components/BarChart.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

import { getAllTimeTrackingByEmployees } from "@/scripts/server"

export default {
  components: {
    BarChart,
    PaginationComponent
  },

  async created() {
    const unsortedArray = await getAllTimeTrackingByEmployees();
    this.timeTracking = this.timeTrackingSortedByData(unsortedArray)
  },
  data() {
    return {
      findDateText: '',
      timeTracking: [],

      startPage: 0,
      endPage: 0,
      currentPage: 1,
      hasNextPage: true,
      pagindatedValue: 6,

      options: {
        responsive: true,

        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                // console.log(context)
                const dataset = context.dataset;
                // console.log(dataset.data[context.dataIndex]);
                let currentIndexTime = dataset.data[context.dataIndex];

                return currentIndexTime;
              }
            }
          }
        },
        scales: {
          y: {
            type: 'time', // Установка типа временной шкалы
            time: {
              parser: 'HH', // Формат времени
              unit: 'hour', // Единица измерения времени (например, 'hour', 'minute')
              displayFormats: {
                hour: 'HH', // Формат отображения времени
              },
              tooltipFormat: 'HH:mm:ss', // Формат подсказки при наведении
            },
            // max: "14:00:00" //тут нужно по максимальному значению времени из массива рассчитать
            min: "00:00:00"
          }
        }
      },

    }

  },
  methods: {
    decrementPage() {
      this.employeesSurnames = [];
      this.currentPage = this.currentPage - 1;
    },
    incrementPage() {
      this.employeesSurnames = [];
      this.currentPage = this.currentPage + 1;
    },
    timeTrackingSortedByData(unsortedArray) {
      unsortedArray.sort(function (a, b) {
          let first = new Date(a.date);
          let second = new Date(b.date);
          if (first == second) {
            return 0;
          }
          return first > second ? 1 : -1;
        })

      console.log("unsorted: " + JSON.stringify(unsortedArray))
      return unsortedArray
    },

    // при клике на дочернем компоненте pagination-component
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
    }
  },

  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.pagindatedValue
    },

    endIndex() {
      const indexCurrentPage = this.currentPage * this.pagindatedValue;
      const arrayLength = this.timeTracking.length;

      return this.hasNextPage ? indexCurrentPage : arrayLength;
    },

    hasPreviosPage() {
      return this.currentPage > 1;
    },

    hasNextPage() {
      const indexCurrentPage = this.currentPage * this.pagindatedValue;
      const arrayLength = this.timeTracking.length;

      return indexCurrentPage < arrayLength;
    },

    labels() {
      const employeesSurnames = [];

      for (let i = 0; i < this.timeTracking.length; i++) {
        console.log(this.timeTracking[i])
        employeesSurnames.push(this.timeTracking[i].employee.full_name)
      }
      return employeesSurnames.slice(this.startIndex, this.endIndex);
    },

    chartDataComputed() {
      const chartData = {};

      const totalTime = [];
      for (let i = 0; i < this.timeTracking.length; i++) {
        totalTime.push(this.timeTracking[i].total_time)
      }

      chartData.datasets = [{
        label: 'Рабочее время',
        data: totalTime.slice(this.startIndex, this.endIndex),
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }]
      chartData.labels = this.labels;

      return chartData;
    },


  },


}

</script>


<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;


.canvas-chart-class {
  width: 800px;
  padding: 10px;
}

.common-histogram-layer {
  width: 100%;
  height: 60%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
  font-family: $font;
  margin-top: 50px
}

.data-find-button {
  background-color: #a1f8d1;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 18px;
}

.label-input-field {
  font-size: 20px;
}

.input-field {
  padding: 3px;
  font-size: 20px;
  text-align: center;
}


//пагинация
.buttons {
  display: flex;
  align-items: center;
  margin: 3px;
}

.forward-button,
.back-button {
  margin: 5px;
  background-color: #a1f8d1;
  border-radius: 5px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 18px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

/**
  Компонент, принимающий данные с сервера. 
  В данных находится действительное время работы и связанная с ним прикладная информация

*/

<template>
  <div class="common-histogram-layer">
    <div class="data-input-layer">
      <label class="label-input-field" for="input-field">Дата: </label>
      <input class="input-field" v-model="findDateText" name="input-field" placeholder="2023-05-14" />
      <button class="data-find-button" @click="findData()">Найти</button>
    </div>
    <div class="canvas-chart-class">
      <bar-chart :chartData="chartDataComputed" :chartOptions="options" />
    </div>

    <div class="pagination-layer">
      <div class="buttons">
        <button class="back-button" v-if="hasPreviosPage" @click="decrementPage()">Назад</button>
        <div class="current-page-value">{{ currentPage }}</div>
        <button class="forward-button" v-if="hasNextPage" @click="incrementPage()">Вперёд</button>
      </div>
    </div>
  </div>


  <div>
    <!-- startIndex: {{ startIndex }}, endIndex: {{ endIndex }} -->
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { getAllEmployeesInfo } from "@/scripts/employees_info";

import {
  getTotalTimeArrayFromJson,
  getDataFromServer
} from '@/scripts/active_timedata_from server'

export default {
  components: {
    BarChart,
    PaginationComponent
  },
  
  props: {
    
  },

  created() {
    this.chartData.datasets = [{
      label: 'Рабочее время',
      data: getTotalTimeArrayFromJson(),
      backgroundColor: "rgba(71, 183,132,.5)",
      borderColor: "#47b784",
      borderWidth: 3
    }]
    this.chartData.labels = this.labels;

    this.getEmployeesIdArrayFromJson();
  },
  data() {
    return {
      findDateText: '',
      allData: getDataFromServer(),
      employeesIdArray: [],
      rawEmployeeData: getAllEmployeesInfo(),
      employeesSurnames: [],

      startPage: 0,
      endPage: 0,
      currentPage: 1,
      hasNextPage: true,
      pagindatedValue: 6,

      chartData: {},
      // labels: [],
      datasets: [],

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
    findData() {
      let dataDateAccordingWithTime = [];
      let dataEmployeeIdAccordingWithTime = [];
      this.allData.forEach(element => {

        let findDateText = this.findDateText.substring(0, 10);
        let dateText = element.date.substring(0, 10);

        if (dateText === findDateText) {
          dataDateAccordingWithTime.push(element.total_time);
          dataEmployeeIdAccordingWithTime.push(element.employee_id)
        }
      })

      this.chartData.datasets.data = dataDateAccordingWithTime;
      console.log("this.chartData.datasets.data: " + this.chartData.datasets.data);
      this.chartData.labels = dataEmployeeIdAccordingWithTime;

      // this.renderChart(this.chartData, this.options)
    },

    getEmployeesIdArrayFromJson() {
      this.allData.forEach((element) => {
        this.employeesIdArray.push(element.employee_id);
      });

      console.log("EMPLOYEEidArray: " + this.employeesIdArray)
    },

    matchSurnameToEmployeeId() {
      this.employeesIdArray.forEach((element) => {
        this.employeesSurnames.push(this.rawEmployeeData[element].full_name)
      })

      console.log("массив имен: " + this.employeesSurnames);
    },

    decrementPage() {
      this.employeesSurnames = [];
      this.currentPage = this.currentPage - 1;
    },
    incrementPage() {
      this.employeesSurnames = [];
      this.currentPage = this.currentPage + 1;
    }

  },

  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.pagindatedValue
    },

    endIndex() {
      const indexCurrentPage = this.currentPage * this.pagindatedValue;
      const arrayLength = this.employeesIdArray.length;

      return this.hasNextPage ? indexCurrentPage : arrayLength;
    },

    hasPreviosPage() {
      return this.currentPage > 1;
    },

    hasNextPage() {
      const indexCurrentPage = this.currentPage * this.pagindatedValue;
      const arrayLength = this.employeesIdArray.length;

      return indexCurrentPage < arrayLength;
    },

    labels() {
      this.matchSurnameToEmployeeId();
      return this.employeesSurnames.slice(this.startIndex, this.endIndex);
    },

    chartDataComputed() {
      const chartData = {};

      chartData.datasets = [{
        label: 'Рабочее время',
        data: getTotalTimeArrayFromJson().slice(this.startIndex, this.endIndex),
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }]
      chartData.labels = this.labels;

      return chartData;
    }
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
  margin: 30px
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

.choose-histogram-layer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  align-content: center;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
</style>

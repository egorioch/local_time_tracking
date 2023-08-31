/**
  Компонент, принимающий данные с сервера. 
  В данных находится действительное время работы и связанная с ним прикладная информация

*/

<template>
  <div class="common-layer">

    <div class="common-layer__datalist-container">
      <div class="concrete-datalist">
        <p class="header-like"></p>
        <datalist-component :date="fioArray" :input-type="'text'" :warning-message-template="'Нет такого работника!'" />
      </div>

      <div class="concrete-datalist">
        <p class="header-like"></p>
        <datalist-component :date="dateArray" :input-type="'date'" :input_style="__input_style"
          :warning-message-template="'Нельзя выбрать эту дату!'" @choosedvaluedate="choosedValueDate" />
      </div>

      <div class="concrete-datalist">
        <p class="header-like"></p>
        <datalist-component :date="dateArray" :input-type="'date'" :input_style="__input_style"
          :warning-message-template="'Нельзя выбрать эту дату!'" @choosedvaluedate="choosedValueDate" />
      </div>
    </div>

    <div class="common-layer__chart">

      <div class="canvas-chart-class">
        <bar-chart :chartData="chartDataComputed" :chartOptions="options" />
      </div>
    </div>

    <pagination-component :totalPages="countTotalPages" :perPage="1" :currentPage="currentPage"
      @pagechanged="onPageChange" class="pagination" />

  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import DatalistComponent from '@/components/DatalistComponent.vue';

import { getAllTimeTrackingByEmployees } from "@/scripts/server"

export default {
  components: {
    BarChart,
    PaginationComponent,
    DatalistComponent
  },

  async created() {
    const unsortedArray = await getAllTimeTrackingByEmployees();
    this.timeTracking = this.timeTrackingSortedByData(unsortedArray);
    this.primaryTimeTrackingArray = this.timeTracking;
  },
  data() {
    return {
      findDateText: '',
      timeTracking: [],
      primaryTimeTrackingArray: [],

      startPage: 0,
      endPage: 0,
      currentPage: 1,
      hasNextPage: true,
      paginatedValue: 6,
      choosedDate: '',

      options: {
        responsive: true,

        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const dataset = context.dataset;
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
              parser: 'HH:mm', // Формат времени
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

      // стили для дочерних компонентов
      __input_style: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1'
      }

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

      return unsortedArray
    },

    // при клике на дочернем компоненте pagination-component
    onPageChange(page) {
      this.currentPage = page;
    },

    // выбирает временной отрезок, в зависимости от выбранной даты
    choosedValueDate(choosedDate) {
      //возвращаем массив с данными к исходному после нажатой кнопки
      this.timeTracking = this.primaryTimeTrackingArray;
      this.currentPage = 1;
      const arrayByDate = [];

      console.log("choosedDate in time: " + choosedDate);
      for (let i = 0; i < this.timeTracking.length; i++) {
        if (this.timeTracking[i].date === choosedDate) {
          arrayByDate.push(this.timeTracking[i])
        }
      }

      this.timeTracking = arrayByDate;
    },

  },

  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.paginatedValue
    },

    endIndex() {
      const indexCurrentPage = this.currentPage * this.paginatedValue;
      const arrayLength = this.timeTracking.length;

      return this.hasNextPage ? indexCurrentPage : arrayLength;
    },

    labels() {
      const employeesSurnames = [];

      for (let i = 0; i < this.timeTracking.length; i++) {
        employeesSurnames.push(this.timeTracking[i].employee.full_name)
      }
      return employeesSurnames.slice(this.startIndex, this.endIndex);
    },

    // Следит за изменения в основном массиве с данными
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
        borderWidth: 3,
      }]
      chartData.labels = this.labels;

      return chartData;
    },

    // подсчитывает количество страниц, в зависимости от начальных параметров
    countTotalPages() {
      let pages = this.timeTracking.length / this.paginatedValue;
      if (this.timeTracking.length - pages * this.paginatedValue > 0) {
        pages = pages + 1;
      }

      return pages;
    },

    // возвращает массив со всеми уникальными датами time_tracking
    dateArray() {
      const primaryDateArray = this.primaryTimeTrackingArray;
      const dateArray = [];
      for (let i = 0; i < primaryDateArray.length; i++) {
        dateArray.push(primaryDateArray[i].date);
      }

      return [...new Set(dateArray)];
    },

    // возвращает массив со всеми уникальными ФИО time_tracking
    fioArray() {
      const setArrayOfFio = [...new Set(this.primaryTimeTrackingArray)]
      const fioArray = [];
      for (let i = 0; i < setArrayOfFio.length; i++) {
        fioArray.push(setArrayOfFio[i].full_name);
      }

      return fioArray;
    }
  },
}

</script>


<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;


.canvas-chart-class {
  width: 800px;
  padding: 10px;
  display: flex;
  // flex-grow: 0.5;
}

.common-layer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  // justify-content: center;
  // overflow: auto;
  font-family: $font;
  margin-top: 50px;

  &__chart {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &__datalist-container {
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: space-around;
    align-items: center;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

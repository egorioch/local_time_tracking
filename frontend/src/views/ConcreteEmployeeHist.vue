/**
  snp - surname, name, patronymic
*/
<template>
  <div class="common-layout">
    <histogram-tools>
      <template #header-buttons>
        <input type="text" class="filter-value" v-model="filterValue" @keyup.enter="getEmployeeHoursByEmployeeSNP()" />
        <button class="find-by-filter-button" @click="getEmployeeHoursByEmployeeSNP(), histIsVisible = false">
          Найти
        </button>
          <select-component :options="buttonArray" @received-option-value="userOptionChoose"></select-component>
      </template> 
      <template #hist-section class="common-layout">


        <div class="buttons-employees" v-if="surnameNotChoosed" v-for="name in employeesNamesArray">
          <button @click="chooseName(name), histIsVisible = true" class="button-employee">{{ name }}</button>
        </div>

        <div class="employee-not-found" v-if="employeesNotFound">Совпадений нет</div>


        <div class="common-histogram-layer" v-if="histIsVisible">
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

      </template>
    </histogram-tools>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart';
import HistogramTools from '@/components/HistogramTools.vue';
import ButtonsComponent from '@/components/ButtonsComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue'
import { getDataFromServer } from '@/scripts/active_timedata_from server';
import { getAllEmployeesInfo } from "@/scripts/employees_info";

export default {
  components: {
    BarChart,
    HistogramTools,
    ButtonsComponent,
    SelectComponent
  },

  data() {
    return {
      rawHoursData: getDataFromServer(),
      rawEmployeeInfoData: getAllEmployeesInfo(),
      filterValue: '',
      filterAction: '',

      concurenceEmployees: [],
      employeesNamesArray: [],

      employeesNotFound: false,
      surnameNotChoosed: true,

      choosedEmployeeName: '',
      choosedEmployeeId: null,

      //число часов и даты
      hours: [],
      dates: [],

      //гистограмма
      startPage: 0,
      endPage: 0,
      currentPage: 1,

      // hasNextPage: true,
      paginatedValue: 6,
      histIsVisible: false,

      //условия сортировки
      buttonArray: ['ФИО', 'Отдел', 'Должность'], //full_name, department, role 
      sortBy: 'full_name',

      options: {
        responsive: true,

        /* график действительно адаптируется под мобильные экраны, но для более точной
        настройки приходится уточнить количество и точность подписей на осях */
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
          x: {
            type: 'time', // Установка типа временной шкалы
            time: {
              // parser: 'DD', // Формат времени
              unit: 'day', // Единица измерения времени (например, 'hour', 'minute')
              displayFormats: {
                'day': 'YYYY-MM-DD', // Формат отображения времени
              },
              tooltipFormat: 'DD', // Формат подсказки при наведении
            },
          },
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
            min: "00:00:00"
          }
        }
      },
    }
  },

  created() {

  },

  methods: {

    //создаем кнопки-имена при множественном совпадению по фильтру
    //метод упростится при перекрёстном запросе на сервере(число часов по employee_id)
    // id(from employee) = employee_id(from time_tracking)
    //SNP - surname, name, patronymic
    getEmployeeHoursByEmployeeSNP() {
      this.employeesNamesArray = [];
      this.concurenceEmployees = [];
      this.concurenceEmployees = this.employeeIdByFilterValue();
      this.concurenceEmployees.length === 0 ?
        this.employeesNotFound = true : this.employeesNotFound = false;


      this.concurenceEmployees.forEach((element) => {
        this.employeesNamesArray.push(element.full_name)
      })


    },
    //возвращаем массив значений совпадающих по фильтру
    employeeIdByFilterValue() {
      let concurenceEmployees = []

      this.rawEmployeeInfoData.forEach((element) => {
        if (element.full_name.trim().toLowerCase()
          .includes(this.filterValue.trim().toLowerCase())) {
          concurenceEmployees.push(element)
        }
      })

      return concurenceEmployees;
    },

    chooseName(name) {
      this.filterValue = "";

      this.choosedEmployeeName = name;
      this.getEmployeeIdByName();
      this.employeesNamesArray = [];
      this.getEmployeeHoursByDays();

    },

    //фильтрация: получение id работника 
    getEmployeeIdByName() {
      let found = false;
      let i = 0;

      //перебирать каждый элемент(как это происходит тут) - не надо.
      //скорое решение
      while (found === false) {
        if (this.rawEmployeeInfoData[i].full_name === this.choosedEmployeeName) {

          this.choosedEmployeeId = this.rawEmployeeInfoData[i].id;
          found = true;
          // break;
        }
        i++;
      }
    },

    //получение часов и дат(в которые отработаны часы) по конкретному id работника
    getEmployeeHoursByDays() {
      this.rawHoursData.forEach((element) => {
        if (element.employee_id === this.choosedEmployeeId) {
          this.hours.push(element.total_time);
          this.dates.push(element.date);
        }
      })

      console.log("hours: " + this.hours);
      console.log("dates: " + this.dates);
    },

    //для пагинации
    decrementPage() {
      this.employeesSurnames = [];
      this.currentPage = this.currentPage - 1;
    },
    incrementPage() {
      this.employeesSurnames = [];
      this.currentPage = this.currentPage + 1;
    },

    //выбор кнопки фильтрации пользователем
    userButtonChoose(buttonName) {
      console.log('buttonName: ' + buttonName);
    },

    userOptionChoose(optionValue) {
      console.log("optionValue: " + optionValue)
    }
  },

  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.paginatedValue
    },

    endIndex() {
      const indexCurrentPage = this.currentPage * this.paginatedValue;
      const arrayLength = this.hours.length;

      return this.hasNextPage ? indexCurrentPage : arrayLength;
    },

    hasPreviosPage() {
      return this.currentPage > 1;
    },

    hasNextPage() {
      const indexCurrentPage = this.currentPage * this.paginatedValue;
      const arrayLength = this.hours.length;

      return indexCurrentPage < arrayLength;
    },

    labels() {
      console.log('this.dates is changed')
      return this.dates.slice(this.startIndex, this.endIndex);
    },

    changedHours() {
      return this.hours.slice(this.startIndex, this.endIndex);
    },

    chartDataComputed() {
      const chartData = {};

      chartData.datasets = [{
        label: this.choosedEmployeeName,
        data: this.changedHours,
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }]
      chartData.labels = this.labels;

      return chartData;
    }
  },

  watch: {
    histIsVisible(newVal, oldVal) {
      console.log("newVal: " + newVal + ", hours: " + this.hours + ", dates: " + this.dates);
      if (newVal === false) {
        this.dates = [];
        this.hours = [];
      }

    }
  }

}
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;

.filter-value {
  padding: 5px;
  width: 30%;
}

.current-page-value {
  padding: 5px;
}

button {
  background-color: #a1f8d1;
  border-radius: 5px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 20px;
  margin-left: 10px;
}

.employee-not-found {
  font-size: 25px;
}

.buttons-employees {
  display: flex;
  justify-content: center;
}

.button-employee {
  margin: 5px;
  border-color: #96ecc5;
  background-color: #e3fff2;
}

.pagination-layer {
  padding: 10px;
}

.buttons {
  display: flex;
  // align-items: center;
  justify-content: center;
  align-content: center;
  margin: 3px;
  font-family: $font;
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

.canvas-chart-class {
  margin: 20px;
}

.buttons-component-common-layout {
  display: block;
  width: fit-content;
}
</style>
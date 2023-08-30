import { createRouter, createWebHistory } from 'vue-router'
// import BarChart from '@/components/BarChart.vue'
import TimeHistogram from '@/views/TimeHistograms.vue'
import AbsenceReason from '@/components/AbsenceReason'
import AuthorizationView from '@/views/AuthorizationView.vue'
import NotesTest from '@/components/NotesTest.vue'
import PaginationComponent from "@/components/PaginationComponent";
import MainPage from "@/views/MainPage";
import HistogramTools from '@/components/HistogramTools'
import ConcreteEmployeeHist from '@/views/ConcreteEmployeeHist'
import DataWindowComponent from '@/components/DataWindowComponent'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/hist",
      name: "TimeHistogram",
      component: TimeHistogram

    },
    {
      path: "/card",
      name: "AbsenceReason",
      component: AbsenceReason
    },
    {
      path: "/login",
      name: "AuthorizationView",
      component: AuthorizationView
    },
    {
      path: "/notes",
      name: "NotesTest",
      component: NotesTest
    },
    {
      path: "/pagination",
      name: "PaginationComponent",
      component: PaginationComponent
    },
    {
      path: "/main",
      name: "MainPage",
      component: MainPage
    }, 
    {
      path: "/tools",
      name: "HistogramTools",
      component: HistogramTools
    },
    {
      path: "/employee",
      name: "ConcreteEmployeeHist",
      component: ConcreteEmployeeHist
    },
    {
      path: "/data_window",
      name: "DataWindowComponent",
      component: DataWindowComponent
    }
    
  ]
});


export default router;

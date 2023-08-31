<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li class="pagination-item" v-for="page in pages" :key="page.name">
      <button type="button" @click="onClickPage(page.name)" 
        :disabled="page.isDisabled" :class="{ active: page.name == currentPage }">
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
      </button>
    </li>
  </ul>
</template>

<script>
export default {

  data() {
    return {
      active_style_button: {
        backgroundColor: "#47b784"
      },
      activeFlag: false
    }
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },

  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // Когда находимся на последней странице, это возвращаемое значение будет первой доступной для перехода страницей
      if (this.currentPage === this.totalPages) {
        return this.totalPages - Math.min(this.maxVisibleButtons, this.totalPages) + 1;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },

    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.totalPages;
    },

  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  },

  watch: {
    currentPage(newVal) {
      // this.activeFlag = true;
      console.log("newVal: " + newVal)
    }
  }
};
</script>


<style scoped>
.pagination {
  margin-top: 20px;
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #47b785;
  color: #ffffff;
}

button {
  margin: 0px 1px 0px 1px;
  background-color: #47b7851f;
  border: 1px solid #47b785;
  color: rgb(48, 47, 47);
  transition: all .2s ease;
}

button:hover {
  background-color: antiquewhite;
}
</style>
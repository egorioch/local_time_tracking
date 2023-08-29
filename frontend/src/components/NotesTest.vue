<template>
  <div class="notes-container">
    <div v-for="note in notes" :key="note.text"> {{ note.text }}</div>
    <hr />
    <div>
      <input v-model="noteText" />
      <button @click="addNote()">Add</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      noteText: ''
    }
  },
  computed: {
    notes() {
      return this.$store.getters.notes;
    }
  },
  methods: {
    addNote() {
      let noteObject = {};
      noteObject.text = this.noteText;
      this.$store.dispatch('addNote', noteObject)
    }
  }
}
</script>
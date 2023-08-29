<template>
  <div class="common-layout">
    <header class="header-layout">
      <p>Фильтр: </p>
      <slot name="header-buttons" class="header-buttons">
        <div class="header-buttons-class">
          <button>ФИО</button>
          <button>Отдел</button>
          <button>Должность</button>
        </div>
      </slot>
      
    </header>
    <hr />
    <section>
      <slot name="hist-section"> 

      </slot>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$font: 'Open Sans', sans-serif;
.header-layout { 
  display: flex;
  align-items: baseline;
  padding: 10px;
  justify-content: center;
  
}
.header-buttons {
  display: flex;
  padding: 10px;

}
p {
  font-size: 22px;
  font-family: $font;
  margin-right: 10px;
}

button {
  background-color: #a1f8d1;
  border-radius: 5px;
  border-color: #57cf99;
  font-family: $font;
  font-size: 20px;
  margin-left: 10px;
}

.find-by-filter-button {
  display: block;
  position: relative;
  justify-content: center;
}
</style>
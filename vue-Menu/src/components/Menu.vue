<template>
  <div>
    <div
      v-for="(el, idx) in dishes"
      :key="idx"
    >
      {{ el.name }}
      <div
        v-for="(el, idx) in el.dish"
        :key="idx"
      >
      {{ el.name}} {{ el.description }} {{ el.price }} {{ el.weight }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuComp",
  data() {
    return {
      dishes: []
    }
  },
  created() {
    axios.get("http://localhost:3000/categories")
    .then((response) => {
        this.dishes = response.data
            console.log(this.dishes)
        })
    }
}
</script>

<style></style>

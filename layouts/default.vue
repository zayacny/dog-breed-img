<template>
<div class="main">
  <!-- header select block -->
  <div class="header">
    <select
    class="select-breed"
    v-model="selectedBreed"
    @change="onChange($event)">
      <option disabled value="">Choose dog's breed</option>
      <option v-for="(value, key) in breeds" :key="key">
        {{key}}
      </option>
    </select>
    <span class="select-breed" v-if="subBreed.on">Choose sub-breed, please :</span>
    <select
    v-if="subBreed.on"
    class="select-breed"
    v-model="subBreed.breed"
    @change="onChangeSub($event)">
      <option v-for="breed in subBreeds" :key="breed" >
        {{breed}}
      </option>
    </select>
  </div>
  <!-- images block -->
  <div id="wrap">
    <div id="card" v-for="url of images" :key="url">
      <img :src="url" alt="random_dog_photo">
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {

  data () {
    return {
      selectedBreed:'',
      subBreeds:[],
      subBreed: {
        on:false,
        breed: null }
    }
  },
  computed: mapState(['breeds', 'images']),
  async created () {
    await this.getBreeds()
    await this.getRandomImg()
  },
  methods: {
    ...mapActions(['getBreeds', 'getRandomImg', 'getBreedImg']),

    onChange: async function(event) {
      const target = event.target.value
      const arr = this.breeds[target]
    await this.getBreedImg({ breed: target, sub: false })
    if (arr.length > 0) {
      this.subBreed.on = true
      this.subBreeds = { ...arr }
      } else {
        this.subBreed.on = false
      }
    },

    onChangeSub: async function(event) {
      this.subBreed.breed = event.target.value
      await this.getBreedImg({ breed: this.selectedBreed, sub: this.subBreed })
    }
  }
}

</script>

<style>
html {
  font-size: 1rem;
  height: 100%;
}
.select-breed {
  margin: 0 auto;
  display: flex;
  width: 150px;
  margin: 30px auto;
}
#wrap {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: 0 auto;
}
#card img {
  height: 100px;
  width: 100px;
  background-color: grey;
  margin: 5px;
  padding: 3px;
  object-fit: cover;
}

</style>

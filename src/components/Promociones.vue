<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <!-- inicio el for -->
            <div v-for="promoData in promos" :key="promoData.key" class="nonloop-block-15 owl-carousel">
                <div class="media-with-text p-md-5">
                    <div class="img-border-sm mb-4">
                        <a href="#!" class="image-play">
                            <img :src="promoData.image || '../../public/assets/images/img_1.jpg'" alt="" class="img-fluid">
                        </a>
                    </div>
                    <h2 class="heading mb-0"><a href="#!">{{promoData.name}}</a></h2>
                    <span class="mb-3 d-block post-date">{{promoData.createdAt}}</span>
                    <p>{{promoData.description}}</p>
                </div>                
            </div>
            <!-- fin del for -->            
        </div>
        <div>
            <label for="">
                Promocion
            </label>
            <input type="text" v-model="promo">
            <label for="">
                Descripcion
            </label>
            <input type="text" v-model="description">
            <br><br>
            <label for="image">Imagen</label>
            <input type="file" @change="getFiles()" ref="files">
            <button @click="addPromo">Add</button>
        </div>
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    name: "Promociones",
    data () {
      return {
        files: [],
        promo: null,
        description: null,
        promos: [],
        promosOnChildAdded: null,
        promosOnChildRemoved: null,
        promosRef: db.child("promos")
      }
    },
    methods:{
        getFiles() {
            this.files = this.$refs.files.files
        },    
    async addPromo() {
            const key = this.promosRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("promos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.promo,
                    description: this.description,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.promosRef.child(key).set(update)
            } catch (ex) {
                return console.error(ex)
            }
            alert("Promoción Agregada con éxito.")
        },
        getPromos() {
           this.promosOnChildAdded = this.promosRef.on("child_added", snapshot => {
               const data = snapshot.val()
               const key = snapshot.key
               data.key = key
               this.promos.push(data)
           })

           this.promosOnChildRemoved = this.promosRef.on("child_removed", snapshot => {
               const index = this.promos.findIndex(e => e.key == snapshot.key)
               this.promos.splice(index, 1)
           })
        },
    },  
    created() {
        this.getPromos()
    },
    beforeDestroy() {
        this.promosRef.off("child_added", this.promosOnChildAdded)
        this.promosRef.off("child_removed", this.promosOnChildRemoved)
    }
}
</script>

<style scoped>

</style>

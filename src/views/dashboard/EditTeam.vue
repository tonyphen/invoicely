<template>
  <div class="page-edit-team">
     <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
                <li>
          <router-link to="/dashboard/my-account">My Account</router-link>
        </li>
        <li class="is-active">
          <router-link to="/dashboard/my-account/edit-team" aria-current="true">Edit Team</router-link>
        </li>
      </ul>
    </nav>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Edit Team</h1>
      </div>
      
      <div class="column is-12">
        <div class="field">
          <label>Name</label>
          <div class="control">
            <input type="text" class="input" v-model="team.name">
          </div>
        </div>
        <div class="field">
          <label>Org. Number</label>
          <div class="control">
            <input type="text" class="input" v-model="team.org_number">
          </div>
        </div>
        <div class="field">
          <label>First invoice number</label>
          <div class="control">
            <input type="number" class="input" v-model="team.first_invoice_number">
          </div>
        </div>
        <div class="field">
          <label>Bank account</label>
          <div class="control">
            <input type="text" class="input" v-model="team.bankaccount">
          </div>
        </div>
        <div class="field">
          <label>Email</label>
          <div class="control">
            <input type="email" class="input" v-model="team.email">
          </div>
        </div>
        <div class="field">
          <label>Address 1</label>
          <div class="control">
            <input type="text" class="input" v-model="team.address1">
          </div>
        </div>
                <div class="field">
          <label>Address 2</label>
          <div class="control">
            <input type="text" class="input" v-model="team.address2">
          </div>
        </div>
        <div class="field">
          <label>Zip code</label>
          <div class="control">
            <input type="text" class="input" v-model="team.zipcode">
          </div>
        </div>
        <div class="field">
          <label>Place</label>
          <div class="control">
            <input type="text" class="input" v-model="team.place">
          </div>
        </div>

        <div class="field">
          <label>Name</label>
          <div class="control">
            <button type="text" class="button is-success" @click="submitForm">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from 'bulma-toast'

export default {
  name: "EditTeam",
  data(){
    return {
      team: {}
    }
  },
  async mounted(){
    await this.getOrCreateTeam()
  },
  methods:{
    getOrCreateTeam(){
    axios
      .get('/api/v1/teams/')
      .then(response =>{
        this.team = response.data[0]
      })
      .catch(error =>{
        console.log(JSON.stringify(error))
      })
    },
    submitForm(){
      axios.patch(`/api/v1/teams/${this.team.id}/`, this.team).then(response=>{
        toast({
          message: 'The changes were saved',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-center'
        })
        this.$router.push('/dashboard/my-account')
      })
      .catch(error=>{
        console.log(JSON.stringify(error))
      })
    }


  }
}
</script>

<style scoped>

</style>
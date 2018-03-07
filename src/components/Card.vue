<template>
  <div>
    <div class="card">
      <div v-bind:key="card.title" v-for="card in cards">
        <h1>{{ card.title }}</h1>
        <p>
          {{ card.greetingText }}
        </p>
        <span class="author">{{ card.author }}</span>
      </div>
    </div>
    <div class="comments">
      <h2>{{cards.length}} Kommentare</h2>
      <input type="text" v-model="msg">
      <md-button class="md-raised md-primary" v-on:click="onClick">Kommentieren</md-button>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import 'vue-form-generator/dist/vfg.css'

export default {
  data: () => ({
    msg: 'hhh',
    test: 'hello',
    model: {
      id: 1,
      name: 'John Doe',
      comment: 'J0hnD03!x4',
      skills: ['Javascript', 'VueJS'],
      email: 'john.doe@gmail.com',
      status: true
    },
    schema: {
      fields: [{
        type: 'input',
        inputType: 'text',
        label: 'Name',
        model: 'name',
        placeholder: 'Your name',
        featured: true,
        required: true
      }, {
        type: 'textArea',
        inputType: 'textArea',
        label: 'comment',
        model: 'comment',
        placeholder: 'Your name',
        featured: true,
        required: true
      }, {
        type: 'submit',
        label: '',
        buttonText: 'Submit',
        validateBeforeSubmit: true
      }]
    }
  }),
  created () {
    this.fetchCards()
  },
  computed: {
    ...mapGetters({
      cards: 'cards'
    }),
    ...mapActions({
      saveCard: 'saveCard'
    })
  },
  methods: {
    onClick () {
      console.log(this.msg)
    },
    fetchCards () {
      this.$http.get(`http://localhost:8089/cards/${this.$route.params.id}`).then(response => {
        this.$store.dispatch('saveCard', response.body)
      }, response => {

      })
    }
  }
}
</script>

<style scoped>
  .card {
    background: #f34d52;
    width: 100%;
    padding: 50px;
  }

  h1 {
    font-size: 48px;
    color: white;
  }

  p {
    color: white;
    font-size: 24px;
  }

  .author {
    display: block;
    text-align: right;
    font-size: 14px;
    color: white;
    font-weight: bold;
  }

  .comments {
    padding: 50px;
    background: #fff;
  }

  .md-field {
    margin-bottom: 0px !important;
  }

  .md-field + .md-has-textarea:not(.md-autogrow) {
    margin-top: 0px !important;
  }

  .md-field.md-has-textarea:not(.md-autogrow) .md-textarea {
    padding-left: 0px !important;
  }

  .md-field.md-has-textarea:not(.md-autogrow) label {
    left: 0px !important;
  }

  pre {
    overflow: auto;
  }

  pre .string {
    color: #885800;
  }

  pre .number {
    color: blue;
  }

  pre .boolean {
    color: magenta;
  }

  pre .null {
    color: red;
  }

  pre .key {
    color: green;
  }

  h1 {
    text-align: center;
    font-size: 36px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 500;
  }

  fieldset {
    border: 0;
  }

  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    border-color: #ddd;
  }

  .panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;

    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .panel-body {
    padding: 15px;
  }

  .field-checklist .wrapper {
    width: 100%;
  }
</style>

<template>
  <div>
    <div class="card">
        <h1>{{ card.title }}</h1>
        <p>
          {{ card.greetingText }}
        </p>
        <span class="author">{{ card.author }}</span>
        <span class="author">{{ formatDate(card.created) }}</span>
    </div>
    <div class="commentForm">
      <md-field>
        <label>Name</label>
        <md-input v-model="comment.author"></md-input>
      </md-field>
      <md-field>
        <label>Dein Kommentar...</label>
        <md-textarea v-model="comment.text"></md-textarea>
      </md-field>
      <md-button class="md-raised md-primary" v-on:click="sendComment">Kommentieren</md-button>

    </div>
    <div class="comments">
      <div v-bind:id="comment.id" class="comment" v-bind:key="comment.id" v-for="comment in comments">
        <p>
          {{ comment.text }}
        </p>
        <span class="author">{{ comment.author }}</span>
        <span class="author">{{ formatDate(comment.created) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
moment.locale('de')

export default {
  data: () => ({
    comment: {
      author: '',
      text: ''
    },
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
    this.fetchCard()
  },
  computed: {
    ...mapGetters({
      card: 'card',
      comments: 'comments'
    }),
    ...mapActions({
      saveCard: 'saveCard'
    })
  },
  methods: {
    sortedComments (comments) {
      function compare (a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }
      return comments.sort(compare)
    },
    formatDate (date) {
      return moment(date).format('LLL')
    },
    sendComment () {
      this.$http.post(`http://localhost:8089/cards/${this.$route.params.cardId}/comments`, this.comment).then(commentsResponse => {
        this.fetchCard()
      }, response => {

      })
    },
    fetchCard () {
      this.$http.get(`http://localhost:8089/cards/${this.$route.params.cardId}`).then(cardResponse => {
        this.$http.get(`http://localhost:8089/cards/${this.$route.params.cardId}/comments`).then(commentsResponse => {
          let card = cardResponse.body
          card['comments'] = commentsResponse.body
          this.$store.dispatch('saveCard', card)
        }, response => {

        })
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

  .card h1 {
    font-size: 48px;
    color: white;
  }

  .card p {
    color: white;
    font-size: 24px;
  }

  .card .author {
    display: block;
    text-align: right;
    font-size: 14px;
    color: white;
    font-weight: bold;
  }

  .commentForm {
    padding: 50px;
    background: #ffcdd2;
  }

  .comment {
    background: #fff;
    color: #424242;
    padding: 48px;
    font-size: 24px;
  }

  .comment .author {
    display: block;
    text-align: right;
    font-size: 14px;
    color: #424242;
    font-weight: bold;
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

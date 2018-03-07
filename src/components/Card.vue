<template>
  <div class="hello">
    <div class="md-layout">
      <div class="md-layout-item">

      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Card without hover effect</div>
          </md-card-header>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed
            accusantium quasi non.
          </md-card-content>

        </md-card>
      </div>
      <div class="md-layout-item">

      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">

      </div>
      <div class="md-layout-item">
        <md-card>
          <md-card-header>
            <div class="md-title">Kommentare</div>
          </md-card-header>

          <md-card-content>
            <md-field>
              <label>Name</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>Kommentar</label>
              <md-textarea></md-textarea>
            </md-field>
          </md-card-content>

          <md-card-actions>
            <md-button>Absenden</md-button>
          </md-card-actions>
        </md-card>
      </div>
      <div class="md-layout-item">

      </div>
    </div>
  </div>
</template>

<style scoped>
  .md-field {
    margin-bottom: 0px!important;
  }
  .md-field+.md-has-textarea:not(.md-autogrow) {
    margin-top: 0px!important;
  }
  .md-field.md-has-textarea:not(.md-autogrow) .md-textarea {
    padding-left: 0px!important;
  }
  .md-field.md-has-textarea:not(.md-autogrow) label {
    left: 0px!important;
  }
</style>

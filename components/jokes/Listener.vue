<template>
  <div class="app-listener">
    <!-- Alert -->
    <v-alert
      v-if="extraInfo.message"
      dismissible
      border="top"
      colored-border
      :type="extraInfo.error ? 'error' : 'info'"
      elevation="2"
    >
      {{ extraInfo.message }}
    </v-alert>
    <div class="app-listener-container">
      <p
        v-for="(p, index) in text"
        :key="index"
        class="app-listener-piece"
        draggable="true"
        @dragstart="(e) => drag(e, index)"
        @drop="(e) => drop(e, index)"
        @dragover="allowDrop"
      >
        {{ p }}
      </p>
    </div>
    <div class="app-listener-actions">
      <v-btn class="mx-2" dark small color="primary" @click="start">
        Start
        <v-icon dark> mdi-play </v-icon>
      </v-btn>
      <v-btn class="mx-2" dark small color="secondary" @click="stop">
        Stop
        <v-icon dark> mdi-stop </v-icon>
      </v-btn>
    </div>
    <div class="app-listener-actions">
      <v-btn dark large color="info" @click="doSave">
        <v-icon class="mr-4" dark> mdi-content-save </v-icon>
        Save
      </v-btn>
    </div>
    <v-input
      v-if="presave"
      prepend-icon="mdi-edit"
      hint="Enter a title"
      :persistent-hint="true"
    >
      <v-text-field
        v-model="input"
        label="Title"
        @keypress.enter="doSave"
      ></v-text-field>
    </v-input>
    <div class="app-listener-speech">
      <h3>Recognised text</h3>
      <p>{{ textRecognised }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue, Watch } from 'nuxt-property-decorator'
import SpeechToText from 'speech-to-text'
import { fetchCreateJoke } from '~/lib/api/backend'
import { Joke } from '~/lib/models/joke'
import { Lang } from '~/lib/models/lang'

@Component({
  name: 'ListenerComponent',
})
export default class ListenerComponent extends Vue {
  @Getter('apiUrl') apiUrl: string
  @Getter('selectedLang') selectedLang: Lang
  listener: any
  textRecognised: string = ''
  text: string[] = []
  draggingIndex: number | undefined
  input = ''
  presave = false
  extraInfo = {
    error: false,
    message: '',
  }

  /* Handlers */
  drag(ev: DragEvent, index: number) {
    /*  const target = ev?.target as HTMLElement;
    if (target)
      ev?.dataTransfer?.setData('piece', target.innerText) */
    const piece = this.text[index]
    ev?.dataTransfer?.setData('piece', piece)
    this.draggingIndex = index
  }

  drop(ev: DragEvent, index: number) {
    ev.preventDefault()
    if (this.draggingIndex !== index) {
      const piece = ev?.dataTransfer?.getData('piece')
      const text = this.text[index]
      this.text[index] = text + '' + piece
      this.text.splice(this.draggingIndex || 0, 1)
      this.draggingIndex = undefined
    }
  }

  allowDrop(ev: any) {
    ev.preventDefault()
  }

  onAnythingSaid(text: string) {
    this.textRecognised = text
  }

  onEndEvent() {
    this.extraInfo.message = 'End of line recorded'
    // eslint-disable-next-line no-console
    console.log('onEndEvent')
  }

  onFinalised(text: string) {
    this.text.push(text)
  }

  /* Methods */
  start() {
    this.listener.startListening()
  }

  stop() {
    this.listener.stopListening()
  }

  async doSave() {
    if (this.presave && this.input.length) {
      try {
        const { code, countryCode } = this.selectedLang
        const joke: Joke = {
          title: this.input,
          text: this.text,
          country: countryCode,
          lang: code,
        }
        const { data: jokeCreated } = await fetchCreateJoke(this.apiUrl, joke)
        this.extraInfo.message =
          'Joke with title "' + jokeCreated.title + '" has been created'
        this.clean()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    } else {
      this.presave = true
    }
  }

  clean() {
    this.text = []
    this.textRecognised = ''
    this.presave = false
    this.input = ''
  }

  /* Watchers */
  @Watch('extraInfo.message')
  async onChangeExtraInfoMessage(currValue: string, _prevValue: string) {
    if (currValue) {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          this.extraInfo = {
            error: false,
            message: '',
          }
          resolve()
        }, 3000)
      )
    }
  }

  /* Lifecycles */
  mounted() {
    if (!this.selectedLang) {
      this.$router.push('/')
    }
    // check speech recognision is available
    try {
      if (!('webkitSpeechRecognition' in window)) {
        throw new Error(
          "This browser doesn't support speech recognition. Try Google Chrome."
        )
      }
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.selectedLang.code
      )
    } catch (error: any) {
      this.extraInfo = {
        error: true,
        message: error.message || 'Unexpected error',
      }
      console.error('error inside mounted in Listener.vue', error)
    }
  }
}
</script>

<style lang="scss">
.app-listener {
  .app-listener-container {
    margin: 0.5rem;
    .app-listener-piece {
      display: inline-block;
      margin: 5px;
      font-style: italic;
      background: rgb(90, 80, 73);
      padding: 0.5rem;
      border-radius: 10px;
    }
  }
  .app-listener-actions {
    display: flex;
    justify-content: center;
    margin: 2rem;
  }
  .app-listener-speech {
    text-align: center;
    background: rgb(90, 80, 73);
    padding: 2rem;
    margin: 1rem;
    border-radius: 10px;
  }

  @media screen and ($mobile-max-width) {
    .app-listener-speech {
      padding: 2rem 4rem;
      margin: 2rem;
    }
  }
}
</style>

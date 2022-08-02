import {Injectable, OnDestroy, OnInit} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private keyVoiceName: string = 'bp-srt-default-voice'
  private currentRate: number = 1
  private allVoices: SpeechSynthesisVoice[] = []

  public filteredVoices: SpeechSynthesisVoice[] = []
  public currentVoice: SpeechSynthesisVoice | null = null

  constructor() {}

  getVoices(
    localService: boolean | null = null,
    langService: string | null = null
  ) {
    this.filteredVoices = []
    this.allVoices = speechSynthesis.getVoices()

    for (let i = 0; i < this.allVoices.length; i++) {
      if (localService !== null && localService !== undefined) {
        if (this.allVoices[i].localService !== localService) {
          continue
        }
      }
      if (langService !== null && langService !== undefined) {
        if (this.allVoices[i].lang !== langService) {
          continue
        }
      }
      this.filteredVoices.push(this.allVoices[i])
    }
    return this.filteredVoices
  }

  setCurrentVoice(voice: SpeechSynthesisVoice | null) {
    if (voice) {
      this.currentVoice = voice
    } else {
      if (this.filteredVoices.length) {
        this.currentVoice = this.filteredVoices[0]
      }
    }
    if (this.currentVoice) {
      localStorage.setItem(this.keyVoiceName, this.currentVoice.voiceURI)
    } else {
      localStorage.removeItem(this.keyVoiceName)
    }
  }

  getCurrentVoice() {
    let savedVoiceUri = localStorage.getItem(this.keyVoiceName)
    let savedVoice: SpeechSynthesisVoice | null = null
    if (this.filteredVoices.length) {
      savedVoice = this.filteredVoices[0]
      if (savedVoiceUri) {
        for (let i = 0; i < this.filteredVoices.length; i++) {
          if (this.filteredVoices[i].voiceURI == savedVoiceUri) {
            savedVoice = this.filteredVoices[i]
            break
          }
        }
      }
    }
    return savedVoice
  }

  public speak(text: string): void {
    console.log(text)
    if (!this.currentVoice || !text) {
      return
    }

    this.stop()
    SpeechService.synthesizeSpeechFromText(
      this.currentVoice,
      this.currentRate,
      text
    )
  }

  public stop(): void {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }
  }

  private static synthesizeSpeechFromText(
    voice: SpeechSynthesisVoice,
    rate: number,
    text: string
  ): void {
    let utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.rate = rate

    speechSynthesis.speak(utterance)
  }
}

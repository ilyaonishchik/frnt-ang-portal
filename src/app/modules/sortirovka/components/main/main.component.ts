import {Component, OnDestroy, OnInit} from '@angular/core'
import {SpeechService} from '../../../../services/speech.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public selectedVoice: SpeechSynthesisVoice | null
  public text: string
  public voices: SpeechSynthesisVoice[] = []
  private _voices: SpeechSynthesisVoice[] = []

  constructor(private speechService: SpeechService) {
    this.selectedVoice = null
    this.text = 'Проверка произношения текста.'
  }

  public demoSelectedVoice(): void {
    if (!this.selectedVoice) {
      console.warn('Expected a voice, but none was selected.')
      return
    }
    let demoText = 'Приветствую Всех здесь собравшихся!'
    this.speak(demoText)
  }

  ngOnInit(): void {
    this.voices = this.speechService.getVoices()

    if (!this.voices.length) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = this.speechService.getVoices(true, 'ru-RU')
        this.selectedVoice = this.speechService.getCurrentVoice()
        console.log('ngOnInit ' + this.selectedVoice?.voiceURI)
      })
    }
  }

  public speak(text: string): void {
    this.speechService.setCurrentVoice(this.selectedVoice)
    this.speechService.speak(text)
  }

  public stop(): void {
    this.speechService.stop()
  }

  ngOnDestroy() {
    this.stop()
  }
}

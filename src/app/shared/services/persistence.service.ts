import {Injectable} from '@angular/core'

const TOKEN_KEY = 'auth-token'
const REFRESH_TOKEN_KEY = 'auth-refresh-token'

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  currentStorage!: Storage
  constructor() {
    this.currentStorage = localStorage
  }

  set(key: string, value: any): void {
    try {
      this.currentStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Error saving to storage', e)
    }
  }

  get(key: string): any {
    try {
      const value = this.currentStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
      return value
    } catch (e) {
      console.error('Error getting value from storage', e)
      return null
    }
  }

  setAccessToken(token: string): void {
    this.currentStorage.removeItem(TOKEN_KEY)
    this.currentStorage.setItem(TOKEN_KEY, token)
  }

  getAccessToken(): string | null {
    return this.currentStorage.getItem(TOKEN_KEY)
  }

  setRefreshToken(token: string): void {
    this.currentStorage.removeItem(REFRESH_TOKEN_KEY)
    this.currentStorage.setItem(REFRESH_TOKEN_KEY, token)
  }

  getRefreshToken(): string | null {
    return this.currentStorage.getItem(REFRESH_TOKEN_KEY)
  }

  clear(): void {
    this.currentStorage.clear()
  }
}

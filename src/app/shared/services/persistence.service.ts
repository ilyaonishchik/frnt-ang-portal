import {Injectable} from '@angular/core'
import {IUserFull} from '../interfaces/user.interface'

const TOKEN_KEY = 'auth-token'
const REFRESH_TOKEN_KEY = 'auth-refresh-token'
const CURRENT_USER_KEY = 'current-user'

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  currentStorage!: Storage
  constructor() {
    this.currentStorage = localStorage
  }

  set(key: string, value: any, session = false): void {
    try {
      const _value: string = JSON.stringify(value)
      if (session) {
        sessionStorage.setItem(key, _value)
      } else {
        localStorage.setItem(key, _value)
      }
    } catch (e) {
      console.error('Error saving to storage', e)
    }
  }

  get(key: string, session = false): any {
    let _value: any = null
    try {
      if (session) {
        _value = sessionStorage.getItem(key)
      } else {
        _value = localStorage.getItem(key)
      }

      if (_value) {
        return JSON.parse(_value)
      }
      return _value
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

  clearTokens(): void {
    this.currentStorage.removeItem(TOKEN_KEY)
    this.currentStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  clear(session = false): void {
    if (session) {
      sessionStorage.clear()
    } else {
      localStorage.clear()
    }
  }

  setCurrentUser(user: IUserFull): void {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  }

  getCurrentUser(): IUserFull | null {
    const user = sessionStorage.getItem(CURRENT_USER_KEY)
    if (user) {
      return JSON.parse(user)
    } else {
      return null
    }
  }
}

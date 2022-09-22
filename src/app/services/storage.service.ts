import {Injectable} from '@angular/core'

const TOKEN_KEY = 'auth-token'
const REFRESH_TOKEN_KEY = 'auth-refresh-token'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  currentStorage!: Storage

  constructor() {
    this.currentStorage = localStorage
    // this.currentStorage = sessionStorage
  }

  clean(): void {
    this.currentStorage.clear()
  }

  public saveToken(token: string): void {
    this.currentStorage.removeItem(TOKEN_KEY)
    this.currentStorage.setItem(TOKEN_KEY, token)
  }

  public getToken(): string | null {
    return this.currentStorage.getItem(TOKEN_KEY)
  }

  public saveRefreshToken(token: string): void {
    this.currentStorage.removeItem(REFRESH_TOKEN_KEY)
    this.currentStorage.setItem(REFRESH_TOKEN_KEY, token)
  }

  public getRefreshToken(): string | null {
    return this.currentStorage.getItem(REFRESH_TOKEN_KEY)
  }

  public saveKeyValue(key: string, value: string) {
    this.currentStorage.removeItem(key)
    this.currentStorage.setItem(key, value)
  }

  public getKeyValue(key: string): string | null {
    return this.currentStorage.getItem(key)
  }
}

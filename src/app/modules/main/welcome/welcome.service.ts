import {Injectable} from '@angular/core'
import {LinkInterface} from './link.interface'

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  links: LinkInterface[] = [
    {
      name: 'ПТКС РПО',
      website: 'http://tracksys.belpost.by/belpost',
      desc: 'Основная ссылка',
    },
    {
      name: 'ПТКС РПО 1',
      website: 'http://172.16.100.26/belpost',
      desc: 'Дополнительная ссылка',
    },
    {
      name: 'ПТКС РПО 2',
      website: 'http://172.16.100.27/belpost',
      desc: 'Дополнительная ссылка',
    },
    {name: 'Розница печатных СМИ', website: 'http://172.16.188.140/portal'},
    {
      name: 'Мониторинг услуг',
      website: 'http://172.16.188.140/stat/index.php/user/login.html',
    },
    {name: 'Учёт обмена', website: 'http://msp.belpost.by/Uslugi/Vhod.aspx'},
    {name: 'Ходовик', website: 'http://hodovik.belpost.by/Login.aspx'},
    {name: 'Регистрация в НПЭС', website: 'https://arm.npas.belpost.by/login'},
    {name: 'РУП "Белпочта"', website: 'https://www.belpost.by'},
    {name: 'Интернет-магазин', website: 'https://shop.belpost.by'},
    {
      name: 'Слежение за ПО',
      website: 'https://webservices.belpost.by/searchRu.aspx',
    },
    {
      name: 'Адресный справочник',
      website: 'http://ex.belpost.by/addressbook/index',
    },
    {name: 'Руководство по приёму МЖД ПО', website: 'http://mup.belpost.by'},
    {
      name: 'Почтовые денежные переводы',
      website:
        'https://www.belpost.by/services/Finansovyyeuslugi0/Pochtovyyedenezhnyyeperev0',
    },
    {
      name: 'Почтовые отправления',
      website: 'https://www.belpost.by/services/Pochtovyyeotpravleniya0',
    },
    {name: 'Тарифы', website: 'https://belpost.by/Tarify2'},
    {name: 'Тарификатор', website: 'http://tarifikator.belpost.by'},
    {
      name: 'Отделения и почтовые коды',
      website: 'https://www.belpost.by/Otdeleniyaipochtovyyekody',
    },
    {
      name: 'Пределы веса',
      website:
        'https://www.belpost.by/Okompanii/Spravochnayainformatsiya2/Predelyvesa',
    },
    {
      name: 'Сроки пересылки',
      website:
        'https://www.belpost.by/Okompanii/Spravochnayainformatsiya2/Srokiperesylki',
    },
    {
      name: 'Правила адресования',
      website:
        'https://www.belpost.by/Okompanii/Spravochnayainformatsiya2/Pravilaadresovaniya',
    },
    {
      name: 'Правила оказания услуг почтовой связи общего пользования',
      website:
        'https://www.belpost.by/Okompanii/Normativnyyepravovyyeakty/Pravilaokazaniyauslugpoch',
    },
    {
      name: 'Документы для внутреннего использования',
      website: 'https://blog.belpost.by/files',
    },
    {
      name: 'Документы по филателии',
      website: 'https://www.belpost.by/philately',
    },
    {
      name: 'Сайты почтовых служб мира',
      website:
        'https://www.belpost.by/Okompanii/Spravochnayainformatsiya2/Saytypochtovykhadministra0',
    },
  ]

  constructor() {}

  getLinks() {
    return this.links
  }
}

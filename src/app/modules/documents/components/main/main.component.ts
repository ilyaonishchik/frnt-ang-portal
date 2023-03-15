import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {environment} from 'environments/environment'
import {LazyLoadEvent, SelectItem, TreeNode} from 'primeng/api'
import {DataView} from 'primeng/dataview'
import {DocsService} from '@modules/documents/services/docs.service'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {StorageService} from '@shared/services/storage.service'
import {Observable, Subscription} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  categoriesSelector,
  filesSelector,
  isLoadingSelector,
} from '@modules/documents/store/selectors'
import {
  getCategoriesAction,
  getFilesAction,
} from '@modules/documents/store/actions/docs.actions'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {RbacService} from '@shared/services/rbac.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // providers: [TreeDragDropService],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('dv') dvFiles!: DataView

  private emptyEvent!: LazyLoadEvent

  categoriesSubscription!: Subscription
  filesSubscription!: Subscription

  categories: TreeNode<string>[] = []
  selectedCategory: TreeNode | null = null
  defaultCategory = '1'

  isLoading$!: Observable<boolean>

  files: ITableItems<IFile> = {items: [], count: 0, first: 0}
  progress = 0

  uploadDialog = false
  canUpload = false

  storagePrefix = environment.urlApiStorage
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  filterTimeOut: any

  sortOptions: SelectItem[] = []
  sortKey = ''
  sortOrder = 1
  sortField = 'file_name'

  // columns: IColumn[] = [
  //   {field: 'file_name', header: 'Name'},
  //   {field: 'file_size', header: 'Size'},
  //   {field: 'file_type', header: 'Type'},
  // ]

  constructor(
    private docsService: DocsService,
    private storageService: StorageService,
    private rbacService: RbacService,
    private store: Store
  ) {}

  ngOnInit() {
    this.emptyEvent = {
      first: 0,
      rows: this.rowsPerPageCount,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    }
    this.initializeValues()
    this.sortOptions = [
      {label: 'Имя по убыванию', value: '!name'},
      {label: 'Имя по возрастанию', value: 'name'},
    ]
    this.store.dispatch(
      getCategoriesAction({category_id: this.defaultCategory})
    )
  }

  initializeValues(): void {
    this.canUpload = this.rbacService.checkPermission('docs-file:upload')
    this.isLoading$ = this.store.select(isLoadingSelector)
    // console.debug('Подписываемся на получение категорий...')
    this.categoriesSubscription = this.store
      .select(categoriesSelector)
      .subscribe((items: ICategory[] | null) => {
        // console.debug('Получаем список категорий...')
        if (items) {
          this.categories = this.docsService.toTreeNode(items)
          this.selectedCategory = this.categories[0]
        } else {
          this.categories = []
          this.selectedCategory = null
        }
      })
    // console.log('Подписываемся на получение файлов...')
    this.filesSubscription = this.store
      .select(filesSelector)
      .subscribe((files) => {
        // console.log('Список файлов получен')
        // console.log(files.count)
        this.files = files
      })
    // this.refreshItems()
  }

  getFilesOfCategory(
    event: LazyLoadEvent | null,
    category: string | null = null
  ) {
    const new_category = category
      ? category
      : this.selectedCategory?.key
      ? this.selectedCategory.key
      : this.defaultCategory

    this.store.dispatch(
      getFilesAction({
        event: event,
        category_id: new_category,
      })
    )
  }

  refreshItems(): void {
    this.store.dispatch(
      getCategoriesAction({category_id: this.defaultCategory})
    )
    this.nodeSelect()
  }

  expandAll() {
    this.categories.forEach((node) => {
      this.expandRecursive(node, true)
    })
  }

  collapseAll() {
    this.categories.forEach((node) => {
      this.expandRecursive(node, false)
    })
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand)
      })
    }
  }

  nodeSelect(): void {
    // console.log('nodeSelect: ', this.selectedCategory)
    if (this.selectedCategory && this.selectedCategory.key) {
      // console.log('Выбрали категорию...')
      this.emptyEvent = {...this.emptyEvent, rows: this.dvFiles.rows}
      this.getFilesOfCategory(this.emptyEvent, this.selectedCategory.key)
    }
  }

  onSortChange(event: any): void {
    const value = event.value
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1
      this.sortField = value.substring(1, value.length)
    } else {
      this.sortOrder = 1
      this.sortField = value
    }
  }

  onFilter(event: Event): void {
    let timeOut = 0
    let new_event: LazyLoadEvent = {
      first: 0,
      rows: this.emptyEvent.rows,
      sortField: this.emptyEvent.sortField,
      sortOrder: this.emptyEvent.sortOrder,
    }
    const filter = (event.target as HTMLInputElement).value
    if (filter) {
      timeOut = 1000
      new_event = {
        ...new_event,
        filters: {file_name: {value: filter, matchMode: 'contains'}},
      }
    }

    if (this.filterTimeOut) {
      clearTimeout(this.filterTimeOut)
    }
    this.filterTimeOut = setTimeout(() => {
      this.getFilesOfCategory(new_event)
      this.filterTimeOut = null
    }, timeOut)
  }

  // uploadFile(event: any): void {
  //   console.log('Files: ', event.files)
  //   // this.storageService.uploadFile(event.files[0])
  // }

  // __downloadFile(s: string) {
  //   if (s) {
  //     this.storageService
  //       .downloadFile(s)
  //       .pipe(take(1))
  //       .subscribe((response) => {
  //         const blob: Blob = response.body as Blob
  //         const link = document.createElement('a')
  //         link.href = URL.createObjectURL(blob)
  //         const contentDisposition = response.headers.get('content-disposition')
  //         if (contentDisposition) {
  //           link.download = getFileName(contentDisposition)
  //         }
  //         link.click()
  //         URL.revokeObjectURL(link.href)
  //       })
  //   }
  // }

  downloadFile(uuid: string, name: string) {
    const link = document.createElement('a')
    link.href = `${environment.urlApiStorage}/files/download/${uuid}`
    link.download = name
    link.click()
  }

  // ___downloadFileStream(s: string) {
  //   if (s) {
  //     this.storageService
  //       ._downloadFileStream(s)
  //       .subscribe((blob) => saveAs(blob))
  //   }
  // }

  // __downloadFileStream(s: string) {
  //   if (s) {
  //     this.storageService.downloadFileStream(s).subscribe((response) => {
  //       const blob: Blob = response.body as Blob
  //       const contentDisposition = response.headers.get('content-disposition')
  //       if (contentDisposition) {
  //         saveAs(blob, getFileName(contentDisposition))
  //       } else {
  //         saveAs(blob)
  //       }
  //     })
  //   }
  // }

  uploadResult(event: boolean): void {
    if (event) {
      this.nodeSelect()
    }
  }

  ngOnDestroy(): void {
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe()
    }
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
  }
}

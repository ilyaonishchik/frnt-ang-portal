import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Observable, Subject, takeUntil} from 'rxjs'
import {Store} from '@ngrx/store'
import {LazyLoadEvent, SelectItem, TreeNode} from 'primeng/api'
import {DataView} from 'primeng/dataview'

import {environment} from 'environments/environment'
import {DocsService} from '@modules/documents/services/docs.service'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {StorageService} from '@shared/services/storage.service'
import {
  categoriesSelector,
  filesSelector,
  isLoadingSelector,
} from '@modules/documents/store/selectors'
import {
  clearDocsStateAction,
  getCategoriesAction,
  getFilesAction,
} from '@modules/documents/store/actions/docs.actions'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {AuthService} from '@modules/auth/services/auth.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('dv') dvFiles!: DataView

  private emptyEvent!: LazyLoadEvent
  private readonly unsubscribe$: Subject<void> = new Subject()

  categories: TreeNode[] = []
  selectedCategory: TreeNode | null = null
  defaultCategory = ''

  isLoading$!: Observable<boolean>
  canUpload$!: Observable<boolean>

  files: ITableItems<IFile> = {items: [], count: 0, first: 0}
  progress = 0

  uploadDialog = false

  storagePrefix = environment.urlApiStorage
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  filterTimeOut: any

  sortOptions: SelectItem[] = []
  sortKey = ''
  sortOrder = 1
  sortField = 'file_name'

  constructor(
    private docsService: DocsService,
    private authService: AuthService,
    private storageService: StorageService,
    private store: Store
  ) {}

  ngOnInit() {
    this.initializeValues()
    this.initializeSubscriptions()
    this.dispatchValues()
  }

  private initializeValues(): void {
    this.emptyEvent = {
      first: 0,
      rows: this.rowsPerPageCount,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    }
    this.sortOptions = [
      {label: 'Имя по убыванию', value: '!file_name'},
      {label: 'Имя по возрастанию', value: 'file_name'},
      {label: 'Сперва новые', value: '!dt_cr'},
      {label: 'Сперва старые', value: 'dt_cr'},
    ]
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.canUpload$ = this.authService.checkPermission('front:docs-file:upload')

    this.authService
      .checkPermission('front:docs-categories:view-all')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.defaultCategory = value ? '0' : '1'
      })

    this.store
      .select(categoriesSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: ICategory[] | null) => {
        if (items) {
          this.categories = this.docsService.toTreeNode(items)
          this.selectedCategory = this.categories[0]
        } else {
          this.categories = []
          this.selectedCategory = null
        }
      })

    this.store
      .select(filesSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((files) => {
        this.files = files
      })
  }

  private dispatchValues(): void {
    this.store.dispatch(
      getCategoriesAction({category_id: this.defaultCategory})
    )
  }

  getFilesOfCategory(
    event: LazyLoadEvent | null,
    category: string | null = null,
    use_cache = true
  ) {
    const new_category = category
      ? category
      : this.selectedCategory?.key
      ? this.selectedCategory.key
      : this.defaultCategory
    // this.store.dispatch(
    //   getFilesAction({
    //     event: event,
    //     category_id: new_category,
    //     use_cache,
    //   })
    // )
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

  nodeSelect(use_cache = false): void {
    // if (this.selectedCategory && this.selectedCategory.key) {
    //   this.emptyEvent = {...this.emptyEvent, rows: this.dvFiles.rows}
    //   this.getFilesOfCategory(
    //     this.emptyEvent,
    //     this.selectedCategory.key,
    //     use_cache
    //   )
    // }
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

  downloadFile(uuid: string, name: string): void {
    this.storageService.downloadFile(uuid, name)
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
      this.nodeSelect(false)
    }
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
    this.store.dispatch(clearDocsStateAction())
  }
}

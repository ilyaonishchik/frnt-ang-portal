// import {saveAs} from 'file-saver'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {IColumn} from '@shared/interfaces/column.interface'
import {environment} from 'environments/environment'
import {
  LazyLoadEvent,
  SelectItem,
  TreeDragDropService,
  TreeNode,
} from 'primeng/api'
import {DocsService} from '@modules/documents/services/docs.service'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {StorageService} from '@shared/services/storage.service'
import {Observable, Subscription, take} from 'rxjs'
import {getFileName} from '@shared/functions/string.function'
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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TreeDragDropService],
})
export class MainComponent implements OnInit, OnDestroy {
  categoriesSubscription!: Subscription
  filesSubscription!: Subscription
  categories: TreeNode<string>[] = []
  selectedCategory: TreeNode | null = null

  isLoading$!: Observable<boolean>

  // files: IFile[] = []
  files: ITableItems<IFile> = {items: [], count: 0, first: 0}
  progress = 0
  // totalRecords = 0
  // firstRecord = 0

  uploadDialog = false

  storagePrefix = environment.urlApiStorage
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  filterTimeOut: any

  sortOptions: SelectItem[] = []
  sortOrder = 1
  sortField = 'file_name'

  columns: IColumn[] = [
    {field: 'file_name', header: 'Name'},
    {field: 'file_size', header: 'Size'},
    {field: 'file_type', header: 'Type'},
  ]

  constructor(
    private docsService: DocsService,
    private storageService: StorageService,
    private store: Store
  ) {}

  ngOnInit() {
    this.initializeValues()
    this.sortOptions = [
      {label: 'Имя по убыванию', value: '!name'},
      {label: 'Имя по возрастанию', value: 'name'},
    ]
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.categoriesSubscription = this.store
      .select(categoriesSelector)
      .subscribe((items: ICategory[] | null) => {
        if (items) {
          this.categories = this.docsService.toTreeNode(items)
          this.selectedCategory = this.categories[0]
          this.nodeSelect()
        }
      })
    this.filesSubscription = this.store
      .select(filesSelector)
      .subscribe((files) => {
        // this.firstRecord = files.first
        // this.totalRecords = files.count
        this.files = files
      })
    this.refreshItems()
  }

  getFilesOfCategory(
    event: LazyLoadEvent | null,
    category: string | null = null
  ) {
    if (!category) {
      category = this.selectedCategory?.key ? this.selectedCategory.key : '0'
    }
    this.store.dispatch(
      getFilesAction({
        event: event,
        category_id: category,
      })
    )
  }

  refreshItems(): void {
    this.store.dispatch(getCategoriesAction())
  }

  showItems(event: any): void {
    console.log(event.dragNode.key)
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
    if (this.selectedCategory && this.selectedCategory.key) {
      this.getFilesOfCategory(
        {sortField: this.sortField, first: 0},
        this.selectedCategory.key
      )
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
      sortField: this.sortField,
      first: 0,
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

  uploadFile(event: any): void {
    console.log('Files: ', event.files)
    // this.storageService.uploadFile(event.files[0])
  }

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

  uploadProgress(event: any): void {
    console.log(event)
    this.progress = event
  }

  ngOnDestroy(): void {
    if (this.filesSubscription) {
      this.filesSubscription.unsubscribe()
    }
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
  }

  uploadResult(event: boolean): void {
    if (event) {
      this.nodeSelect()
    }
  }
}

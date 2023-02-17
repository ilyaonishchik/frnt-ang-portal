import {Component, OnInit} from '@angular/core'
import {IColumn} from '@shared/interfaces/column.interface'
import {environment} from 'environments/environment'
import {SelectItem, TreeDragDropService, TreeNode} from 'primeng/api'
import {DataView} from 'primeng/dataview'
import {DocsService} from '@modules/documents/services/docs.service'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {StorageService} from '@shared/services/storage.service'
import {take} from 'rxjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TreeDragDropService],
})
export class MainComponent implements OnInit {
  categories: TreeNode<string>[] = []
  selectedCategory!: TreeNode

  files: IFile[] = []

  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  sortOptions: SelectItem[] = []
  sortOrder = 0
  sortField = ''

  columns: IColumn[] = [
    {field: 'name', header: 'Name'},
    {field: 'size', header: 'Size'},
    {field: 'type', header: 'Type'},
  ]

  constructor(
    private docsService: DocsService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.initializeValues()
    this.sortOptions = [
      {label: 'Имя по убыванию', value: '!name'},
      {label: 'Имя по возрастанию', value: 'name'},
    ]
  }

  initializeValues(): void {
    this.docsService.getCategories().then((items) => {
      if (items) {
        this.categories = items
        this.selectedCategory = this.categories[0]
        this.nodeSelect()
      }
    })
  }

  getFilesOfCategory(category: number | string) {
    this.docsService.getFiles(category).then((items) => {
      if (items) {
        this.files = items
      }
    })
  }

  refreshItems(): void {
    this.initializeValues()
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
      this.getFilesOfCategory(this.selectedCategory.key)
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

  onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value)
  }

  downloadFile(s: string) {
    if (s) {
      this.storageService
        .downloadFile(s)
        .pipe(take(1))
        .subscribe((response) => {
          const blob: Blob = response.body as Blob
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          const contentDisposition = response.headers.get('content-disposition')
          if (contentDisposition) {
            link.download = contentDisposition
              .split(';')[1]
              .split('filename')[1]
              .split('=')[1]
              .split('"')[1]
              .trim()
          }
          link.click()
          URL.revokeObjectURL(link.href)
        })
    }
  }
}

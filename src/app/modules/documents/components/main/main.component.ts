import {Component, OnInit} from '@angular/core'
import {IColumn} from '@shared/interfaces/column.interface'
import {environment} from 'environments/environment'
import {TreeDragDropService, TreeNode} from 'primeng/api'
import {DocsService} from '@modules/documents/services/docs.service'

interface DocFile {
  id: number
  name: string
  size: number
  type: string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TreeDragDropService],
})
export class MainComponent implements OnInit {
  categories: TreeNode<string>[] = []
  selectedCategory!: TreeNode

  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions
  columns: IColumn[] = [
    {field: 'name', header: 'Name'},
    {field: 'size', header: 'Size'},
    {field: 'type', header: 'Type'},
  ]
  files: DocFile[] = [
    {id: 1, name: 'Name file', size: 250, type: 'DOC'},
    {id: 2, name: 'Name file', size: 250, type: 'DOC'},
    {id: 3, name: 'Name file', size: 250, type: 'DOC'},
    {id: 4, name: 'Name file', size: 250, type: 'DOC'},
  ]

  constructor(private docsService: DocsService) {}

  ngOnInit() {
    this.initializeValues()
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
    if (this.selectedCategory) {
      console.log(this.selectedCategory.key)
    }
  }
}

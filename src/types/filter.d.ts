interface IPagination {
  page: number
  page_count: number
  page_size: number
  total_document: number
}

interface IQuery {
  filter?:  Record<string, string>
  sort?: string
  page?: number
  page_size?: number
}
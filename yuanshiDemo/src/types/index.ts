export interface TaskItem {
  id: string
  project: string
  overtime: boolean
  hours: number
  created_at: string
}

export interface User {
  username: string
  role: 'admin' | 'user'
}

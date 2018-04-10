import gql from 'graphql-tag'

export const ALL_TODOS_QUERY = gql`
{
  todos {
    id
    title
    completed
  }
}
`

export const ADD_TODO_MUTATION = gql`
mutation addTodo($title: String!){
    addTodo(title: $title) {
      id
      title
      completed
    }
}
`

export const DELETE_TODO_MUTATION = gql`
mutation deleteTodo($index: Int!){
    deleteTodo(index: $index) {
      id
      title
      completed
    }
}
`

export const COMPLETE_TODO_MUTATION = gql`
mutation completeTodo($index: Int!){
    completeTodo(index: $index) {
      id
      title
      completed
    }
}
`
export const EDIT_TODO_MUTATION = gql`
mutation editTodo($id: Int!, $title: String, $completed: Boolean){
    editTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
}
`


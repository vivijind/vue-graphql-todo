const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const { graphql, introspectionQuery } = require('graphql')

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8')

const todos = [
  {
    id: 0,
    title: "graphQL介绍",
    completed: false
  }
]

const generateId = (() => {
  let id = todos.length
  return () => id++
})()

const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_, {id}) => todos.find(todo => todo.id == id),
    hello: (_, {name}) => `Hello, ${name}`
  },
  Mutation: {
    addTodo: (_, {title}) => {
      let todo = { id: generateId(), title, completed: false }
      todos.push(todo)
      return todo
    },
    deleteTodo: (_, {index}) => {
      if(index < 0)
        return
      let todo = todos.splice(index, 1)
      return todo[0]
    },
    editTodo: (_, {id, title, completed}) => {
      let index = todos.findIndex((item) => {
        return item.id == id
      })
      if(title != undefined) {
        todos[index].title = title
      }
      if(completed != undefined) {
        todos[index].completed = completed
      }
      return todos[index]
    },
  }
}

const Schema = makeExecutableSchema({ typeDefs, resolvers })

graphql(Schema, introspectionQuery)
  .then(schema => fs.writeFile(path.join(__dirname, 'schema.json'),
    JSON.stringify(schema, null, 2),
    err => err && console.log(`write schema failed: ${err}`)))
  .catch(err => err && console.log(`parse schema failed: ${err}`))

module.exports = Schema
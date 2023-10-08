import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "/home/murilo/Development/CursoMario/core/db/.env";

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };
  const todos: Array<Todo> = [...read(), todo];
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return todo;
}

export function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (db.todos) {
    return db.todos;
  }
  return [];
}

function deleteById(id: UUID) {
  const todos = read();

  const todosWithoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWithoutOne,
      },
      null,
      2
    )
  );
}

function update(id: UUID, partialTodo: Partial<Todo>) {
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}
// clearDB();
// create("PRIMEIRA TO DO");
// create("SGUNDA TO DO");
// create("Terceira to do");
// const terceiraTodo = create("TERCEIRA TO DO");
// update(terceiraTodo.id, {
//   content: "TERCEIRA TO DO NOVA",
// });
// const quartaTodo = create("quarta to do");
// deleteById(quartaTodo.id);
// // eslint-disable-next-line no-console
// console.log(read());

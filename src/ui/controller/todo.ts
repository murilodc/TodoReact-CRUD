import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
  page: number;
}

async function get(params: todoControllerGetParams) {
  return todoRepository.get({ page: params.page, limit: 2 });
}

function filterTodosByContent<Todo>(
  search: string,
  todos: Array<Todo & { content: string }>
): Array<Todo> {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase();
    const contentNormalized = todo.content.toLowerCase();
    return contentNormalized.includes(searchNormalized);
  });
  return homeTodos;
}

export const todoController = {
  get,
  filterTodosByContent,
};

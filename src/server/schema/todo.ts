import { z as schema } from "zod";
// Model/Schema
// interface Todo {
//   id: string;
//   content: string;
//   date: Date;
//   done: boolean;
// }
export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  date: schema.string().transform((date) => {
    return new Date(date).toISOString();
  }),
  done: schema.string().transform((done) => {
    if (done === "true") return true;
    if (done === "false") return false;
    return done;
  }),
});

export type Todo = schema.infer<typeof TodoSchema>;

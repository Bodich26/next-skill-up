import { TasksForm, TasksList } from "@/components/shared";

export default function Products() {
  return (
    <div className="flex justify-between gap-8">
      <TasksList />
      <TasksForm />
    </div>
  );
}

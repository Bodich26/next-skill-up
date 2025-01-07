import { TasksForm, TasksList } from "@/components/shared";

export default function Products() {
  return (
    <div className="flex justify-between gap-8 flex-grow">
      <div className="basis-[75%] border-[1px] border-solid border-input bg-card rounded-lg p-4">
        <TasksList />
      </div>
      <div className="basis-[25%] border-[1px] border-solid border-input bg-card rounded-lg p-4 ">
        <TasksForm />
      </div>
    </div>
  );
}

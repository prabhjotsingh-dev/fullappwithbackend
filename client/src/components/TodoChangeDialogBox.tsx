import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@apollo/client/react";
import { addTodoMutation, deleteTodoMutation } from "../apolloClient/querys";
import { updateTodoMutation } from "../apolloClient/querys";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";

type TodoChangeDialogBoxProps = {
  Trigger?: string | null;
  Title?: string | null;
  Description?: string | null;
  hideinput?: boolean;
  id?: number | string | null;
  typeCheckbox?: boolean;
  todoCompleted?: boolean;
};

const TodoChangeDialogBox = ({
  Trigger = null,
  Title = null,
  Description = null,
  hideinput = false,
  id = null,
  typeCheckbox = false,
  todoCompleted = false,
}: TodoChangeDialogBoxProps) => {
  const [addTodo] = useMutation(addTodoMutation);
  const [updateTodo] = useMutation(updateTodoMutation);
  const [deleteTodo] = useMutation(deleteTodoMutation);
  const [value, setValue] = useState("");

  if (typeCheckbox) {
    return (
      <Checkbox
        checked={todoCompleted}
        onCheckedChange={async () => {
          await updateTodo({
            variables: {
              input: {
                id: id as number,
                completed: !todoCompleted,
              },
            },
          });

        }}
      />
    );
  }

  const handleClick = async () => {

    if (Trigger === "Edit") {
      await updateTodo({
        variables: {
          input: {
            id: Number(id),
            todo: value,
          },
        },
      });
      toast("Todo edited Successfully refresh the page to see the changes", { position: "top-left" });

    } else if (Trigger === "Delete") {

      await deleteTodo({
        variables: { id: id },
      });
      toast("Todo Deleted Successfully refresh the page to see the changes", { position: "top-left" });

    } else if (Trigger === "Add New Todo") {

      const newTodo = { todo: value, completed: false };
      await addTodo({
        variables: {
          input: newTodo,
        },
      });
      toast("Todo Added Successfully refresh the page to see the changes", { position: "top-left" });


    }
  };

  return (
    <Dialog>
      <DialogTrigger>{Trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Title}</DialogTitle>
          <DialogDescription>{Description}</DialogDescription>
        </DialogHeader>
        {!hideinput && <Input onChange={(e) => setValue(e.target.value)} placeholder={Title || ""} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                handleClick();
              }}>
              {Trigger}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoChangeDialogBox;

"use client";

import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { nanoid } from "nanoid";
import {
  CalendarDaysIcon,
  FlagIcon,
  Link2Icon,
  ListChecksIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";

type Task = {
  id: string;
  title: string;
  description?: string;
  assignees?: string;
  startDate?: string;
  endDate?: string;
  status?: "Not Started" | "In Research" | "On Track" | "Complete";
  priority?: "Low" | "Medium" | "High";
  comments?: number;
  links?: number;
  subtasksDone?: number;
  subtasksTotal?: number;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function ProjectBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [{ id: nanoid(), title: "First Task" }],
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const handleAddTask = (
    columnId: string,
    taskData: Omit<Task, "id">
  ) => {
    const defaultStatusByColumn: Record<string, Task["status"]> = {
      todo: "Not Started",
      inprogress: "In Research",
      done: "Complete",
    };

    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? {
            ...col,
            tasks: [
              ...col.tasks,
              {
                id: nanoid(),
                status: defaultStatusByColumn[columnId] ?? "Not Started",
                priority: taskData.priority ?? "Low",
                comments: taskData.comments ?? 0,
                links: taskData.links ?? 0,
                subtasksDone: taskData.subtasksDone ?? 0,
                subtasksTotal: taskData.subtasksTotal ?? 0,
                ...taskData,
              },
            ],
          }
          : col
      )
    );
  };

  const findColumnByTaskId = (taskId: string) => {
    return columns.find((col) => col.tasks.find((task) => task.id === taskId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);

    const column = columns.find((col) => col.id === active.id);

    if (task) setActiveTask(task);
    if (column) setActiveColumn(column);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;

    // COLUMN DRAG
    if (columns.find((col) => col.id === active.id)) {
      const oldIndex = columns.findIndex((col) => col.id === active.id);
      const newIndex = columns.findIndex((col) => col.id === over.id);

      setColumns((cols) => arrayMove(cols, oldIndex, newIndex));
      return;
    }

    // TASK DRAG
    const activeCol = findColumnByTaskId(active.id as string);
    const overCol =
      findColumnByTaskId(over.id as string) ||
      columns.find((col) => col.id === over.id);

    if (!activeCol || !overCol) return;

    if (activeCol.id === overCol.id) {
      const oldIndex = activeCol.tasks.findIndex(
        (task) => task.id === active.id
      );
      const newIndex = activeCol.tasks.findIndex(
        (task) => task.id === over.id
      );

      const newTasks = arrayMove(activeCol.tasks, oldIndex, newIndex);

      setColumns((cols) =>
        cols.map((col) =>
          col.id === activeCol.id ? { ...col, tasks: newTasks } : col
        )
      );
    } else {
      const activeTask = activeCol.tasks.find(
        (task) => task.id === active.id
      );
      if (!activeTask) return;

      setColumns((cols) =>
        cols.map((col) => {
          if (col.id === activeCol.id) {
            return {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== active.id),
            };
          }
          if (col.id === overCol.id) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask],
            };
          }
          return col;
        })
      );
    }
  };

  const addColumn = () => {
    const title = prompt("Enter column name");
    if (!title) return;

    setColumns([...columns, { id: nanoid(), title, tasks: [] }]);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Kanban Board</h1>

      <Button onClick={addColumn} variant="outline">
        + Add Column
      </Button>

      <div className="overflow-x-auto mt-6">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-6 min-w-max pb-2">
              {columns.map((column) => (
                <ColumnComponent
                  key={column.id}
                  column={column}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
            {activeColumn && (
              <Card className="w-72 p-4 rounded border shadow-sm text-lg font-semibold bg-white/70">
                <CardContent className="p-0">
                  {activeColumn.title}
                </CardContent>
              </Card>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

function ColumnComponent({
  column,
  onAddTask,
}: {
  column: Column;
  onAddTask: (columnId: string, taskData: Omit<Task, "id">) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

  const [quickTitle, setQuickTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleQuickAdd = () => {
    const value = quickTitle.trim();
    if (!value) return;

    onAddTask(column.id, {
      title: value,
    });
    setQuickTitle("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;

    onAddTask(column.id, {
      title: value,
      description: description.trim() || undefined,
      assignees: assignees.trim() || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });

    setTitle("");
    setDescription("");
    setAssignees("");
    setStartDate("");
    setEndDate("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="w-80 flex flex-col border rounded-2xl p-4 shadow-sm bg-card/90 backdrop-blur-sm"
      >
        <div className="mb-3 space-y-3">
          <div
            {...listeners}
            className="flex items-center justify-between gap-2 cursor-grab"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-sky-400 opacity-40 animate-pulse" />
                <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
              </span>
              <span className="font-semibold text-sm tracking-tight">
                {column.title}
              </span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {column.tasks.length}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Open modal for add task when PlusIcon is clicked */}
              <Dialog>
                <DialogTrigger>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 rounded-full"
                  // onClick={() => setOpen(true)}
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full"
              >
                <MoreHorizontalIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <Input
            value={quickTitle}
            onChange={(event) => setQuickTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleQuickAdd();
              }
            }}
            placeholder="Quick add task title"
            className="h-8 text-xs bg-muted/60 border-muted"
          />
        </div>

        <Separator className="mb-2" />

        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 flex-1 min-h-[40px] max-h-[60vh] overflow-y-auto pr-1">
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </Card>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
          <DialogDescription>
            Create a new task for the <span className="font-semibold">{column.title}</span> column.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Task title</FieldLabel>
                <FieldContent>
                  <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter task title"
                    autoFocus
                  />
                  <FieldDescription>
                    This is the main title that will appear on the card.
                  </FieldDescription>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                  <Textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Add a short description for this task"
                    rows={3}
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Assignee(s)</FieldLabel>
                <FieldContent>
                  <Input
                    value={assignees}
                    onChange={(event) => setAssignees(event.target.value)}
                    placeholder="e.g. Alice, Bob"
                  />
                  <FieldDescription>
                    Add one or multiple assignees, separated by commas.
                  </FieldDescription>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Start date</FieldLabel>
                <FieldContent>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>End date</FieldLabel>
                <FieldContent>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-2xl border border-border/60 bg-background/80 cursor-grab shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-3 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant="secondary"
            className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-50 text-amber-700 border-0 dark:bg-amber-500/10 dark:text-amber-300"
          >
            <span className="relative flex size-1.5 mr-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-amber-300 opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
            </span>
            {task.status ?? "Not Started"}
          </Badge>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-6 w-6 rounded-full text-muted-foreground"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm font-semibold leading-snug text-foreground">
            {task.title}
          </div>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] text-muted-foreground">Assignees</p>
          {task.assignees ? (
            <AvatarGroup>
              {task.assignees
                .split(",")
                .map((name) => name.trim())
                .filter(Boolean)
                .slice(0, 3)
                .map((name) => {
                  const initials = name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <Avatar key={name} size="sm">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  );
                })}
            </AvatarGroup>
          ) : (
            <p className="text-[11px] text-muted-foreground/80 italic">
              Unassigned
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <CalendarDaysIcon className="h-3.5 w-3.5" />
            {task.endDate || task.startDate ? (
              <span>{task.endDate ?? task.startDate}</span>
            ) : (
              <span>No due date</span>
            )}
          </div>

          <Badge
            variant={
              task.priority === "High"
                ? "destructive"
                : task.priority === "Medium"
                  ? "secondary"
                  : "outline"
            }
            className="text-[10px] px-2 py-0.5 rounded-full"
          >
            <FlagIcon className="h-3 w-3" />
            {task.priority ?? "Low"}
          </Badge>
        </div>

        <Separator className="my-1" />

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1">
              <MessageCircleIcon className="h-3.5 w-3.5" />
              <span>{task.comments ?? 0} Comments</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <Link2Icon className="h-3.5 w-3.5" />
              <span>{task.links ?? 0} Links</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1">
            <ListChecksIcon className="h-3.5 w-3.5" />
            <span>
              {task.subtasksDone ?? 0}/{task.subtasksTotal ?? 0}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

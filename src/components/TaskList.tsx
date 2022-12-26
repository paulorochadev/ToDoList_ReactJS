import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskProps } from './Task';

import clipboard from "./../assets/todolist-clipboard.svg";

import styles from './TaskList.module.css';

export function TaskList() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const taskAllDone = tasks.reduce((total, task) => {
        if (task.isComplete == true) {
            return (total += 1);
        } else {
            return total;
        }
    }, 0);

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const newTask = { id: uuidv4(), title: newTaskTitle, isComplete: false };
        setTasks((state) => [...state, newTask]);
        setNewTaskTitle("");
    }

    function handleNewInputTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("");

        setNewTaskTitle(event.target.value);
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity("Esse campo é obrigatório!");
    }

    function handleRemoveTask(taskIdToDelete: string) {
        const taskWithotDeletedOne = tasks.filter((task) => {
          return task.id != taskIdToDelete;
        });

        setTasks(() => {
          return taskWithotDeletedOne;
        });
    }

    function handleCheckTask(taskIdToCheck: string, check: boolean) {
        setTasks((state) =>
          state.map((task) => {
            if (task.id == taskIdToCheck) {
              return { ...task, isComplete: check };
            } else {
              return task;
            }
          })
        );
    }    

    return (
        <main className={styles.taskList}>
            <form
                className={styles.taskAdd}
                onSubmit={handleCreateNewTask}
            >
                <input className={styles.taskInput}
                    type="text"
                    name="task"
                    placeholder="Adicione uma nova tarefa"
                    value={newTaskTitle}
                    onChange={handleNewInputTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required={true}                
                />

                <button className={styles.taskButton}>
                    Criar <PlusCircle size={16} weight="bold"/>
                </button>
            </form>

            <section className={styles.taskStatus}>
                <div className={styles.status}>
                    <span className={styles.blue}>
                        Tarefas criadas
                    </span>
                    <div className={styles.contagem}>
                        {tasks.length}
                    </div>
                </div>
                <div className={styles.status}>
                    <span className={styles.purple}>
                        Concluídas
                    </span>
                    <div className={styles.contagem}>
                        {tasks.length > 0
                            ? `${taskAllDone} de ${tasks.length}`
                            : tasks.length}
                    </div>
                </div>
            </section>

            <section className={styles.content}>
                {tasks.length == 0 ? (
                    <div className={styles.emptyArea}>
                        <img src={clipboard} alt="Imagem de uma clipboard" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                ) : (
                    <div className={styles.fullArea}>
                        {tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    content={task}
                                    onDeleteTask={handleRemoveTask}
                                    onCheckTask={handleCheckTask}                                
                                />
                            )
                        })}
                    </div>
                )}
            </section>
        </main>
    )
}
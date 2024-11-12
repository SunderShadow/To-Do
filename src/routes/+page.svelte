<script lang="ts">
  import TaskComponent from "$lib/components/Task.svelte"
  import {onMount} from "svelte"
  import TaskTable from "$lib/components/Icons/TaskTable.svelte"
  import Plus from "$lib/components/Icons/Plus.svelte"

  type TaskType = {
      description: string
      completed: boolean,
      difficult: 1 | 2 | 3 // 1 - Easy, 2 - Medium, 3 - Hard
  }

  let inputTask = $state('')
  let tasks: TaskType[] = $state([])

  onMount(loadFromLocalStorage)

  function addTask() {
      tasks.push({
          description: inputTask,
          completed: false,
          difficult: 3
      })

      saveToLocalstorage()
  }

  function removeTask(task: TaskType) {
      let i = tasks.findIndex(el => el === task)

      if (tasks.length !== 0) {
          tasks.splice(i, 1)
      } else {
          if (tasks[0] === task) {
              tasks = []
          }
      }

      saveToLocalstorage()
  }

  function toggleTaskComplete(task: TaskType) {
      task.completed = !task.completed
      saveToLocalstorage()
  }

  function saveToLocalstorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function loadFromLocalStorage() {
      let stringedTasks = localStorage.getItem('tasks')

      console.log(stringedTasks)
      if (stringedTasks == null) {
          tasks = [
              {
                  description: "Easy task",
                  completed: false,
                  difficult: 1
              },
              {
                  description: "Medium task",
                  completed: false,
                  difficult: 2
              },
              {
                  description: "Hard task",
                  completed: false,
                  difficult: 3
              }
          ]
      } else {
          tasks = JSON.parse(stringedTasks)
      }
  }
</script>

<section>
  <header>
    <span class="icon"><TaskTable/></span>
    <h1>To-Do</h1>
    <button class="add-task"><Plus/></button>
  </header>
  <div class="tasks">
    {#each tasks as task}
      <TaskComponent
              {...task}
              remove={() => {removeTask(task)}}
              toggleComplete={() => {toggleTaskComplete(task)}}
      ></TaskComponent>
    {/each}
  </div>
</section>

<style>
  .tasks {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  section {
    background: #D5CCFF;
    padding: 24px;
    border-radius: 1rem;
  }

  header {
    display: flex;
    align-items: center;
    gap: 1em;

    margin-bottom: 1.5rem;
  }

  header .icon {
    display: flex;
    height: 1.5em;

    margin-left: 5px;

    color: var(--deep-blue);
    stroke: var(--deep-blue);
  }

  h1 {
    margin: 0;
  }

  .add-task {
    display: flex;
    height: 1.5rem;
    margin-left: auto;

    stroke: var(--second-color);

    border: none;
    background: none;
  }
</style>
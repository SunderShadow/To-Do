<script lang="ts">
  import TaskComponent from "$lib/components/Task.svelte"
  import {onMount} from "svelte"

  type TaskType = {
      description: string
      completed: boolean
  }

  let inputTask = $state('')
  let tasks: TaskType[] = $state([])

  onMount(loadFromLocalStorage)

  function addTask() {
      tasks.push({
          description: inputTask,
          completed: false
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

      if (stringedTasks == null) {
          tasks = []
      } else {
          tasks = JSON.parse(stringedTasks)
      }
  }
</script>

<input type="text" bind:value={inputTask}>
<button onclick={addTask}>add</button>

{#each tasks as task}
  <TaskComponent
    {...task}
    remove={() => {removeTask(task)}}
    toggleComplete={() => {toggleTaskComplete(task)}}
  ></TaskComponent>
{/each}

<style>

</style>
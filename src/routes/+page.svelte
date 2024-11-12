<script lang="ts">
  import {onMount} from "svelte"

  import DefaultTask from "$lib/components/Task/Default.svelte"
  import EditModeTask from "$lib/components/Task/Edit.svelte"
  import TaskTable from "$lib/components/Icons/TaskTable.svelte"
  import Plus from "$lib/components/Icons/Plus.svelte"
  import type {Task} from '$lib'


  let inputTask = $state('')
  let tasks: Task[] = $state([])

  onMount(loadFromLocalStorage)

  function addTask() {
      tasks.unshift({
          description: 'Any description here...',
          completed: false,
          difficult: 1,
          mode: 'edit'
      })

      saveToLocalstorage()
  }

  function removeTask(task: Task) {
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

  function updateTaskComplete(task: Task) {
      task.completed = !task.completed
      saveToLocalstorage()
  }

  function updateDifficult(task: Task, difficult: 1 | 2 | 3) {
      task.difficult = difficult
      saveToLocalstorage()
  }

  function updateDescription(task: Task, description: string) {
      task.description = description
      saveToLocalstorage()
  }

  function saveToLocalstorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks.map(i => ({
          description: i.description,
          completed: i.completed,
          difficult: i.difficult
      }))))
  }

  function loadFromLocalStorage() {
      let stringedTasks = localStorage.getItem('tasks')

      if (stringedTasks == null) {
          tasks = [
              {
                  description: "Easy task",
                  completed: false,
                  difficult: 1,
                  mode: 'default'
              },
              {
                  description: "Medium task",
                  completed: false,
                  difficult: 2,
                  mode: 'default'
              },
              {
                  description: "Hard task",
                  completed: false,
                  difficult: 3,
                  mode: 'default'
              }
          ]
      } else {
          tasks = JSON.parse(stringedTasks).map(i => ({...i, mode: 'default'}))
      }
  }

  function acceptTaskEdit(task: Task) {
      task.mode = 'default'
  }

  function rejectTaskEdit(task: Task) {
      task.mode = 'default'
  }

  function editMode(task: Task) {
      task.mode = 'edit'
  }
</script>

<section>
  <header>
    <span class="icon"><TaskTable/></span>
    <h1>To-Do</h1>
    <button onclick={addTask} class="add-task"><Plus/></button>
  </header>
  <div class="tasks">
    {#each tasks as task}
      {#if task.mode === 'default'}
        <DefaultTask
                {...task}
                editMode={() => {editMode(task)}}
        ></DefaultTask>
      {:else}
        <EditModeTask
                {...task}
                accept={() => {acceptTaskEdit(task)}}
                updateDescription={diff => {updateDescription(task, diff)}}
                updateDifficult={diff => {updateDifficult(task, diff)}}
                remove={() => {removeTask(task)}}
        ></EditModeTask>
      {/if}
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
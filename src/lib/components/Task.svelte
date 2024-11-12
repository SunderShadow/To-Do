<script lang="ts">
  import type {MouseEventHandler} from "svelte/elements"

  type Props = {
      description: string,
      completed: boolean,
      remove: MouseEventHandler<any>,
      toggleComplete: MouseEventHandler<any>
  }

  let {description, completed, remove, toggleComplete}: Props = $props()

</script>
<div class="task" class:completed>
  <button onclick={toggleComplete}>complete</button>
  <button onclick={remove}>delete</button>
  <span>{description}</span>
</div>

<style>
  .task {
    background-color: aquamarine;
    padding: 20px;
    border-radius: 10px;
  }

  .task button {
    background: white;
    border: none;
    cursor: pointer;
  }

  .task.completed button {
    background-color: azure;
  }

  .task.completed span {
    text-decoration: line-through;
  }
</style>
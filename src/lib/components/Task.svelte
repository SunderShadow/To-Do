<script lang="ts">
  let {description, completed, remove, toggleComplete} = $props()

</script>
<div class="task" class:completed>
  <button on:click={toggleComplete}>complete</button>
  <button on:click={remove}>delete</button>
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
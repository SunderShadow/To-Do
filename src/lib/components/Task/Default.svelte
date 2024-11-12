<script lang="ts">
    import type {MouseEventHandler} from "svelte/elements"
    import Difficult from "$lib/components/Icons/Difficult.svelte"
    import Pen from "$lib/components/Icons/Pen.svelte"
    import type {Task} from "$lib"

    type Props = Task & {
        remove: MouseEventHandler<any>,
        editMode: () => void
    }

    let {
        description, completed, difficult,
        editMode
    }: Props = $props()
</script>
<div class="task" class:completed>
  <button onclick={editMode} class="edit"><Pen/></button>

  <div class="description">{description}</div>

  <div
    class="difficult"
    class:easy={difficult === 1}
    class:medium={difficult === 2}
    class:hard={difficult === 3}
  >
    <div><Difficult /></div>
    <div><Difficult /></div>
    <div><Difficult /></div>
  </div>
</div>

<style>
  .task {
    position: relative;
    padding: 1rem;

    background: #F4F2FF;
    border-radius: 12px;
  }

  .description {
    font-weight: 600;
  }

  .difficult {
    --easy-color: #2D41A7;
    --medium-color: #ECB800;
    --hard-color: #E42C5F;

    margin-top: 1rem;

    display: flex;
    gap: .5rem;

    height: 20px;
    fill: #D9D9D9;
  }

  .difficult > * {
    height: 100%;
    width: 30px;
  }

  .difficult.easy > div:first-child {
    fill: var(--easy-color);
  }

  .difficult.medium > div:nth-child(1),
  .difficult.medium > div:nth-child(2) {
    fill: var(--medium-color);
  }

  .difficult.hard {
    fill: var(--hard-color);
  }

  .edit {
    border: none;
    background: none;
    position: absolute;
    top: 15px; right: 15px;

    stroke: #000;
  }
</style>
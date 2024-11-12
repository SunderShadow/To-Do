<script lang="ts">
    import type {MouseEventHandler} from "svelte/elements"
    import Difficult from "$lib/components/Icons/Difficult.svelte"
    import type {Task} from "$lib"

    type Props = Task & {
        remove: MouseEventHandler<any>,
        accept: () => void,
        updateDescription: (description: string) => void
        updateDifficult: (difficult: 1 | 2 | 3) => void
    }

    let {
        description, completed, difficult,
        remove,
        accept,
        updateDescription,
        updateDifficult
    }: Props = $props()

</script>
<div class="task" class:completed>
  <div class="toolbar">
    <button onclick={accept}>Accept</button>
    <button onclick={remove}>Delete</button>
  </div>

  <textarea placeholder="Any description here..." class="description" oninput={e => {updateDescription(e.target.value)}}>{description}</textarea>

  <div
    class="difficult"
    class:easy={difficult === 1}
    class:medium={difficult === 2}
    class:hard={difficult === 3}
  >
    <div onclick={() => {updateDifficult(1)}}><Difficult /></div>
    <div onclick={() => {updateDifficult(2)}}><Difficult /></div>
    <div onclick={() => {updateDifficult(3)}}><Difficult /></div>
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

  .toolbar {
    display: flex;

    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .edit {
    border: none;
    background: none;
    position: absolute;
    top: 15px; right: 15px;

    stroke: #000;
  }
</style>
// place files you want to import through the `$lib` alias in this folder.
export type Task = {
    description: string
    completed: boolean,
    difficult: 1 | 2 | 3, // 1 - Easy, 2 - Medium, 3 - Hard
    mode: 'default' | 'edit'
}
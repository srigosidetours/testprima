import { render } from 'preact'; // Puede que no necesites 'render' aquí si se renderiza en Astro
import { signal, computed, effect } from '@preact/signals'; // Importamos 'effect'

const LOCAL_STORAGE_KEY = 'preactTodosApp';

// --- Cargar Todos Iniciales desde localStorage ---
let initialTodosData = [
    { text: "Escribir mi primer post", completed: true },
    { text: "Comprar víveres", completed: false },
    { text: "Pasear al perro", completed: false }
];

try {
    // Verificar si localStorage está disponible (importante para SSR o entornos sin él)
    if (typeof localStorage !== 'undefined') {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTodos) {
            initialTodosData = JSON.parse(storedTodos);
        }
    }
} catch (e) {
    console.error("Error al cargar tareas desde localStorage:", e);
    // Opcional: si hay un error, podrías querer limpiar el item corrupto
    // if (typeof localStorage !== 'undefined') {
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    // }
}

// --- Signals ---
const todos = signal(initialTodosData);
const newItem = signal(''); // Signal para el nuevo ítem

// --- Computed Signal ---
// Cuenta los todos completados
const completedCount = computed(() => {
    return todos.value.filter(todo => todo.completed).length;
});

// --- Funciones Auxiliares (sin cambios, ya actualizan todos.value) ---
function addTodo(e) {
    e.preventDefault();
    if (!newItem.value.trim()) return;
    todos.value = [
        ...todos.value,
        { text: newItem.value, completed: false }
    ];
    newItem.value = '';
}

function removeTodo(indexToRemove) {
    todos.value = todos.value.filter(
        (_, index) => index !== indexToRemove
    );
}

function toggleTodo(indexToToggle) {
    todos.value = todos.value.map((todo, index) => {
        if (index === indexToToggle) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
}

// --- Efecto para Persistencia en localStorage ---
effect(() => {
    // Este código se ejecuta cada vez que `todos.value` cambia.
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos.value));
        }
    } catch (e) {
        console.error("Error al guardar tareas en localStorage:", e);
    }
});

// --- Componente Principal (Exportado por defecto) ---
export default function XdosComponent() {
    const onInput = event => (newItem.value = event.target.value);

    return (
        <form onSubmit={addTodo} class="todo-app">
            <div class="input-group">
                <input
                    type="text"
                    value={newItem.value}
                    onInput={onInput}
                    placeholder="¿Qué necesitas hacer?"
                />
                <button type="submit">Añadir</button>
            </div>
            
            <ul class="todo-list">
                {todos.value.map((todo, index) => (
                    <li key={index} class={todo.completed ? "completed" : ""}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(index)}
                            />
                            {todo.completed ? <s>{todo.text}</s> : todo.text}
                        </label>
                        <button
                            type="button"
                            onClick={() => removeTodo(index)}
                            aria-label="Eliminar tarea"
                            class="remove-btn"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
            
            {todos.value.length > 0 && (
                <p class="completed-count">
                    Completadas: {completedCount.value} de {todos.value.length}
                </p>
            )}
        </form>
    );
}

// Si necesitas renderizar este componente directamente en un HTML (fuera de Astro)
// import { render } from 'preact'; // Asegúrate de que esté importado arriba
// const appContainer = document.getElementById('app');
// if (appContainer) {
// render(<XdosComponent />, appContainer);
// }
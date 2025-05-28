import { render } from 'preact';
import { signal } from '@preact/signals';

export default function XunoComponent() {
    const count = signal(0);

    return (
        <div class="counter-container">
            <button class="btn" onClick={()=>count.value++}>
                Increment
            </button>
            <input class="input" readonly value={count} />
            <button class="btn" onClick={()=>count.value--}>
                Decrement
            </button>
        </div>
    );
}


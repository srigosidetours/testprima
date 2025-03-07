import { h } from 'preact';
import { useSignal } from '@preact/signals';
import { useState, useEffect } from 'preact/hooks';

export default function PreactTestComponent() {
    // Variables con signals (reactividad fina)
    const checkboxSignal = useSignal(false);
    const textSignal = useSignal('coso');

    // Variables con useState (hook clásico)
    const [checkboxHook, setCheckboxHook] = useState(false);
    const [textHook, setTextHook] = useState('coso');

    // Estado para almacenar la hora actual
    const [time, setTime] = useState({ hours: null, minutes: null, seconds: null });

    // Función para actualizar la hora actual
    const updateTime = () => {
        const now = new Date();
        setTime({
            hours: String(now.getHours()).padStart(2, '0'),
            minutes: String(now.getMinutes()).padStart(2, '0'),
            seconds: String(now.getSeconds()).padStart(2, '0')
        });
    };


    // useEffect para simular onMounted: se ejecuta solo una vez al montar el componente
    useEffect(() => {
        updateTime();
        console.log('Componente montado');
    }, []);

    // useEffect que actúa como watcher para textHook (opcional)
    useEffect(() => {
        console.log('textHook ha cambiado:', textHook);
    }, [textHook]);

    useEffect(() => {
        updateTime();
    }, [checkboxHook]);

    return (
        <div className="p-6 space-y-6">
            {/* Mostramos la hora actual */}
            {time.hours !== null ? (
                <p className="text-sm text-gray-500">
                    Hora actualizada: {time.hours}:{time.minutes}:{time.seconds}
                </p>
            ) : (
                <p>Cargando hora...</p>
            )}

            {/* Sección usando Preact Signals */}
            <div className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Usando Preact Signals</h2>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={checkboxSignal.value}
                        onChange={(e) => {
                            checkboxSignal.value = e.target.checked;
                            updateTime(); // Actualiza la hora cuando cambia la casilla
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className={checkboxSignal.value ? 'text-blue-700' : 'bg-red-700 text-white px-2 rounded'}>
                        {checkboxSignal.value ? 'Activada' : 'Desactivada'}
                    </span>
                </label>
                <input
                    type="text"
                    value={textSignal.value}
                    onInput={(e) => (textSignal.value = e.target.value)}
                    className="input input-bordered w-full mt-2"
                    placeholder="Escribe algo..."
                />
                <p className="mt-2 text-gray-600">Valor: {textSignal.value}</p>
            </div>

            {/* Sección usando useState */}
            <div className="bg-white p-4 shadow rounded-lg">
                <h2 className="text-xl font-bold mb-4">Usando useState</h2>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={checkboxHook}
                        onChange={(e) => {
                            setCheckboxHook(e.target.checked);
                        }}
                        className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <span className="text-gray-700">
                        {checkboxHook ? 'Activada' : 'Desactivada'}
                    </span>
                </label>
                <input
                    type="text"
                    value={textHook}
                    onInput={(e) => setTextHook(e.target.value)}
                    className="input input-bordered w-full mt-2"
                    placeholder="Escribe algo..."
                />
                <p className="mt-2 text-gray-600">Valor: {textHook}</p>
            </div>
        </div>
    );
}

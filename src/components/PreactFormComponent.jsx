// Componente funcional
import { h } from "preact";
import { useState } from "preact/hooks";

export default function MyComponent() {
    console.log('Componente renderizado');
    const [numero, setNumero] = useState(0);
    const [value, setValue] = useState('');
    const [selectValue, setSelectValue] = useState('B');
    const [checked, setChecked] = useState();
    const [test, setTest] = useState(
        {
            uno: 'uno',
            dos: 'dos'
        }
    )

    const onSubmit = e => {
        e.preventDefault();
        console.log(`Enviado ${value}`);
    };

    const prueba = (e) => {
        console.log(e);
    }

    return (
 
        <form onSubmit={onSubmit}>       {test.uno} {test.dos}
          

            <button
                type="button"
                class="btn"
                onClick={() => setTest(
                    test.uno = 'dfdas'
                )}
            >Test dsf
            </button>

            <button
                type="button"
                class="btn"
                onClick={() => setNumero(numero + 1)}
            >Test {numero}
            </button>
            <input
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg my-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={value}
                onInput={e => {
                    setValue(e.target.value);
                }}
            />
            <p>You typed this value: {value}</p>

            <select class="select my-1" value={selectValue} onChange={x => setSelectValue(x.target.value)}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <p>You selected this value: {selectValue}</p>

            <p class="my-5">
                <label class="bg-yellow-100 rounded-lg p-2 ">
                    <input
                        class="mr-5"
                        type="checkbox"
                        checked={checked}
                        onClick={() => setChecked(!checked)}
                    />
                    check this box
                    <span className={checked ? 'bg-green-100 mx-10 px-10 rounded-lg' : 'bg-red-100 mx-10 px-10 rounded-lg'}>
                        ({checked ? 'sí' : 'no'})
                    </span>


                </label>
            </p>

            <button
                className="btn btn-wide sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}
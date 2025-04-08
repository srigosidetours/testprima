import { useState, useEffect } from "preact/hooks";
import Manifest from "@mnfst/sdk";

function LoginComponent() {
  const [cats, setCats] = useState([]);
  const [coso, setCoso] = useState([]);
  const [credenciales, setCredenciales] = useState({
    email: "test@test.com",
    password: "test",
  })

  // Se obtiene la lista de gatos al cargar el componente
  useEffect(() => {
    async function fetchCats() {
      const manifest = new Manifest('https://1111-idx-testprima-1741185966697.cluster-rz2e7e5f5ff7owzufqhsecxujc.cloudworkstations.dev');
      const result = await manifest.from("cats").find();
      console.log(result);
      setCats(result.data);
    }
    fetchCats();
  }, []);

  useEffect(()=>{
   console.log('hola');
  });

  // Maneja el click en el botón de login
  async function handleClick() {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbnRpdHlTbHVnIjoidXNlcnMiLCJpYXQiOjE3NDI5MTI2NTV9.StQ8MEqofDF65cO9mlJkXnmNSnutt-ILAms9UkrEhhc"
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: "test@test.com",
      password: "test",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://1111-idx-testprima-1741185966697.cluster-rz2e7e5f5ff7owzufqhsecxujc.cloudworkstations.dev/api/auth/users/login",
        requestOptions
      );
      const result = await response.json();
      setCoso(result.token);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <form className="space-y-4">
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            value={credenciales.email}
            type="email"
            id="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button type="button" onClick={handleClick} className="btn btn-primary">
          Login
        </button>
      </form>

<div style="color:red;">

<textarea className="input w-full mt-5">
{ coso }
</textarea>

</div>
      <ul className="p-5">
        {cats.map((cat, index) => (
          <li key={index}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LoginComponent;

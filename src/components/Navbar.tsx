import { Button, ButtonGroup } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import Account from "./Account"

export default function Navbar() {
  const navigate = useNavigate();
  let admin = true;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name
    if (name === "Home") navigate("/home")
    else if (name === "MyList") navigate("/my-list")
    else if (name === "Admin") navigate("/admin")
  };

  return (
    <div className="bg-navbar text-white flex justify-center md:justify-between p-4 items-center h-16">
      <div className="w-2/5 h-full hidden md:inline">
        <Link className="flex max-w-full w-max h-full gap-5 items-center" to="/home">
          <img src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg" alt="Logo del Gobierno" className=" h-full" />
          <h1 className=" text-2xl uppercase">Guía turística</h1>
        </Link>
      </div>
      <ButtonGroup variant="text" aria-label="text button group">
        {admin && <Button className="text-white" onClick={handleClick} name="Admin">Admin</Button>}
        <Button className="text-white" onClick={handleClick} name="Home">Inicio</Button>
        <Button className="text-white" onClick={handleClick} name="MyList">Mi Lista</Button>
        <Account />
      </ButtonGroup>
    </div>
  )
}

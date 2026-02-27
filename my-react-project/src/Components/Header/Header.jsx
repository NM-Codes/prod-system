import "./Header.css"
import menuItems from "./navData"
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx"


//ChangePage state funktion från app.jsx för att uppdatera sidan, activepage är den aktiva sidans titel
function Header ({changePage, activePage}) {
  

  return (
    <header className="header-wrapper">
        <h1>Projektnamn</h1>
        
        <nav>
          <ul>
              {/* Gå igenom arrayen och mappa ut */}
              {menuItems.filter((item)=>item.title !== "Session")
              .map((item) => (
                <li
                  key={item.title}
                  /* Sätter klassen "active" om knappen matchar nuvarande sida */
                  className={activePage === item.title ? "active" : ""}
                >
                  {/* Vid klick anropas changePage för att byta vy i huvudkomponenten */}
                  <a onClick={ () => changePage(item.title)}>
                    <span className="icon">{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
          </ul>

        </nav>

        <div className="header-right">
            <ThemeToggle />
        </div>
        
    </header>
  );
}

export default Header;
import { GoHome, GoCheckbox, GoClock, GoGraph, GoArchive, } from "react-icons/go"
import { LuSettings } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

//Central lista för att enkelt lägga till/ta bort menyval
const menuItems = [
  {title: "Home",
    icon: <GoHome />,
  },

  {title: "Dashboard",
    icon: <RxDashboard />,
  },

  {title: "Tasks", 
    icon: <GoCheckbox />,
  },

  {title: "Timer", 
    icon: <GoClock />,
  },

  {title: "Session",
    icon: <GoGraph />,
  },

  {title: "History",
    icon: <GoArchive />,
  },
  {title: "Setting",
    icon: <LuSettings />,
  },
]

export default menuItems
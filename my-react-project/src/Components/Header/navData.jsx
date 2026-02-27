
import { GoHome, GoCheckbox, GoClock, GoGraph, GoArchive, } from "react-icons/go"
import { LuSettings } from "react-icons/lu";
//import { GoHome, GoCheckbox, GoClock, GoGraph, GoArchive, GoGear } from "react-icons/go"
import { RxDashboard } from "react-icons/rx";

//Central lista för att enkelt lägga till/ta bort menyval
const menuItems = [


  {title: "Dashboard",
    icon: <RxDashboard />,
  },

  {title: "Timer", 
    icon: <GoClock />,
  },

  {title: "Analysis",
    icon: <GoGraph />,
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


    //{title: "Settings",
    //icon: <GoGear />,
    //},
]

export default menuItems

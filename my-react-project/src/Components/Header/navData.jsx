
//import { GoHome, GoCheckbox, GoClock, GoGraph, GoArchive, GoGear } from "react-icons/go"
import { GoClock, GoGraph, GoArchive, } from "react-icons/go"
import { LuSettings } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";


const menuItems = [
  {title: "Dashboard",
    icon: <RxDashboard />,
    path: "/",
  },

  {title: "Timer", 
    icon: <GoClock />,
    path: "/timer",
  },

  {title: "Analysis",
    icon: <GoGraph />,
    path: "/analysis",
  },

  {title: "Session",
    icon: <GoGraph />,
    path: "/session",
  },

  {title: "History",
    icon: <GoArchive />,
    path: "/history",
  },

  {title: "Setting",
    icon: <LuSettings />,
    path: "/setting",
  },
]

export default menuItems
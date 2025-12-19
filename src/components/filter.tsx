import { Badge } from "./ui/badge"
import { CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"
import * as lucideReact from "lucide-react";

export type FilterType = "all" | "pending" | "completed";

type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}


export const Filter = ({currentFilter, setCurrentFilter}:FilterProps ) => {
  return (
   <CardHeader className="flex flex-wrap gap-2">
          <Separator className="bg-[#ffffff49] mb-4" />

          <Badge
            className="cursor-pointer"
            variant={currentFilter === "all" ? "default" : "outline"}
            onClick={() => setCurrentFilter("all")}
          >
            <lucideReact.Logs /> Todos
          </Badge>

          <Badge
            className="cursor-pointer"
            variant={currentFilter === "pending" ? "default" : "outline"}
            onClick={() => setCurrentFilter("pending")}
          >
            <lucideReact.CircleDashed /> Pendentes
          </Badge>

          <Badge
            className="cursor-pointer"
            variant={currentFilter === "completed" ? "default" : "outline"}
            onClick={() => setCurrentFilter("completed")}
          >
            <lucideReact.Check /> Concluídos
          </Badge>
        </CardHeader>
  )
}


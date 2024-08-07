import { Icon } from "leaflet";
import { IconType } from "react-icons";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPoo, TbPool } from "react-icons/tb";
import { Category } from "./types";

export const categories: Category[] = [
  {
    id: 1,
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    id: 2,
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    id: 3,
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    id: 4,
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the country side!",
  },
  {
    id: 5,
    label: "Pools",
    icon: TbPool,
    description: "This property has pools!",
  },
  {
    id: 6,
    label: "Islands",
    icon: GiIsland,
    description: "This property on an island!",
  },
  {
    id: 7,
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    id: 8,
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    id: 9,
    label: "Castles",
    icon: GiCastle,
    description: "This property is in the castles!",
  },
  {
    id: 10,
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    id: 11,
    label: "Artic",
    icon: BsSnow,
    description: "This property is in the artic!",
  },
  {
    id: 12,
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in the cave!",
  },
  {
    id: 13,
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    id: 14,
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barns!",
  },
  {
    id: 15,
    label: "Lux",
    icon: IoDiamond,
    description: "This property is in the luxury!",
  },
];

export const INITIAL_DATE_RANGE = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

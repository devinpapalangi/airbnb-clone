import React from "react";
import Heading from "../../../Heading";
import CategoryInput from "../../../Inputs/CategoryInput";
import { Category } from "@/app/utils/types";

interface Props {
  onClick: (category: string) => void;
  category: string;
  categories: Category[];
}
const CategoryStep: React.FC<Props> = ({ onClick, category, categories }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which one of this best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h=[50vh] overflow-y-auto">
        {categories.map((item) => {
          const selected = category === item.label;
          return (
            <div key={item.id} className="col-span-1">
              <CategoryInput
                onClick={(category) => onClick(category)}
                selected={selected}
                label={item.label}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryStep;

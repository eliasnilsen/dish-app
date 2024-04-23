import { useFieldArray, useFormContext } from "react-hook-form";
import { DishFormData } from "./CreateDishForm";

const DishInstructionsSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<DishFormData>();

  const {
    fields: fieldsInstructions,
    prepend: prependInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    // @ts-expect-error //irritating error
    name: "instructions",
    control,
    rules: {
      required: "Atleast one instruction is required.",
    },
  });

  return (
    <div className="space-y-4">
      <h2>Instructions</h2>
      <div className="">
        <div className="p-2 space-y-2 w-full">
          <div>
            <button
              className="primary-btn-teal"
              onClick={() => {
                // @ts-expect-error //irritating error
                prependInstructions("");
              }}
            >
              New
            </button>
          </div>
          {fieldsInstructions.map((field, index) => {
            return (
              <div key={field.id} className="flex items-end gap-2 w-full">
                <label className="flex flex-1 items-start gap-2">
                  <span className="font-semibold">
                    {fieldsInstructions.length - index}.
                  </span>

                  <textarea
                    {...register(`instructions.${index}`, {
                      required: true,
                    })}
                    className="p-1 w-full focus:outline-none"
                  />
                </label>

                <button
                  onClick={() => {
                    removeInstructions(index);
                  }}
                  className="primary-btn-danger"
                >
                  Delete
                </button>
              </div>
            );
          })}

          {errors.instructions && (
            <span className="text-red-600 font-normal text-xs">
              {errors.instructions.message}
            </span>
          )}

          {errors.instructions?.root && (
            <span className="text-red-600 font-normal text-xs">
              {errors.instructions.root.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishInstructionsSection;

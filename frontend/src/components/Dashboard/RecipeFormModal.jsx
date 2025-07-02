import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const RecipeFormModal = ({ isOpen, onClose }) => {
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
      name: "",
      description: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: [""],
      cookingTime: "",
      preparationTime: "",
      servings: "",
      cuisine: "",
      difficultyLevel: "Easy",
      tags: [],
      image: null,
      nutritionInfo: {
         calories: "",
         protein: "",
         carbs: "",
         fats: "",
      },
   });

   const handleChange = (e, field, index, nestedField = null) => {
      const { name, value, files } = e.target;
      if (field === "ingredients") {
         const updated = [...formData.ingredients];
         updated[index][name] = value;
         setFormData({ ...formData, ingredients: updated });
      } else if (field === "instructions") {
         const updated = [...formData.instructions];
         updated[index] = value;
         setFormData({ ...formData, instructions: updated });
      } else if (field === "nutritionInfo") {
         setFormData({
            ...formData,
            nutritionInfo: { ...formData.nutritionInfo, [name]: value },
         });
      } else if (name === "image") {
         setFormData({ ...formData, image: files[0] });
      } else {
         setFormData({ ...formData, [name]: value });
      }
   };

   const addIngredient = () => {
      setFormData({
         ...formData,
         ingredients: [...formData.ingredients, { name: "", quantity: "" }],
      });
   };

   const addInstruction = () => {
      setFormData({
         ...formData,
         instructions: [...formData.instructions, ""],
      });
   };

   const handleSubmit = async () => {
      try {
         const token = localStorage.getItem("token");
         const url = `${import.meta.env.VITE_SERVER_URL}/recipes`;

         const data = new FormData();
         data.append("name", formData.name);
         data.append("description", formData.description);
         data.append("cuisine", formData.cuisine);
         data.append("difficultyLevel", formData.difficultyLevel);
         data.append("cookingTime", formData.cookingTime);
         data.append("preparationTime", formData.preparationTime);
         data.append("servings", formData.servings);

         // Append image file
         if (formData.image) {
            data.append("image", formData.image);
         }

         // Manually append structured fields
         data.append("ingredients", JSON.stringify(formData.ingredients));
         data.append("instructions", JSON.stringify(formData.instructions));
         data.append("tags", JSON.stringify(formData.tags));
         data.append("nutritionInfo", JSON.stringify(formData.nutritionInfo));

         const res = await fetch(url, {
            method: "POST",
            headers: {
               Authorization: token,
            },
            body: data,
         });

         const result = await res.json();
         if (res.ok) {
            toast.success("Recipe created successfully");
            onClose();
         } else {
            toast.error(result.message || "Error creating recipe");
         }
      } catch (err) {
         toast.error("Failed to create recipe");
      }
   };

   return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
         <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
         <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl bg-white rounded shadow p-6 overflow-y-auto max-h-[90vh]">
               <Dialog.Title className="text-xl font-bold text-[#ff4d00] mb-4">
                  Create New Recipe - Step {step}/3
               </Dialog.Title>

               {/* Step 1: Basic Info */}
               {step === 1 && (
                  <div className="space-y-3">
                     <input
                        name="name"
                        onChange={handleChange}
                        placeholder="Recipe Name"
                        className="input"
                     />
                     <textarea
                        name="description"
                        onChange={handleChange}
                        placeholder="Description"
                        className="input"
                     />
                     <input
                        type="file"
                        name="image"
                        onChange={(e) => handleChange(e)}
                     />
                     <input
                        name="cuisine"
                        onChange={handleChange}
                        placeholder="Cuisine"
                        className="input"
                     />
                     <select
                        name="difficultyLevel"
                        onChange={handleChange}
                        className="input"
                     >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                     </select>
                     <div className="flex justify-end">
                        <button onClick={() => setStep(2)} className="btn">
                           Next
                        </button>
                     </div>
                  </div>
               )}

               {/* Step 2: Ingredients & Instructions */}
               {step === 2 && (
                  <div className="space-y-3">
                     <div>
                        <label className="font-medium">Ingredients</label>
                        {formData.ingredients.map((ing, idx) => (
                           <div key={idx} className="flex gap-2">
                              <input
                                 name="name"
                                 value={ing.name}
                                 onChange={(e) =>
                                    handleChange(e, "ingredients", idx)
                                 }
                                 placeholder="Name"
                                 className="input"
                              />
                              <input
                                 name="quantity"
                                 value={ing.quantity}
                                 onChange={(e) =>
                                    handleChange(e, "ingredients", idx)
                                 }
                                 placeholder="Quantity"
                                 className="input"
                              />
                           </div>
                        ))}
                        <button
                           onClick={addIngredient}
                           className="text-sm text-blue-500"
                        >
                           + Add Ingredient
                        </button>
                     </div>

                     <div>
                        <label className="font-medium">Instructions</label>
                        {formData.instructions.map((inst, idx) => (
                           <textarea
                              key={idx}
                              value={inst}
                              onChange={(e) =>
                                 handleChange(e, "instructions", idx)
                              }
                              placeholder={`Step ${idx + 1}`}
                              className="input"
                           />
                        ))}
                        <button
                           onClick={addInstruction}
                           className="text-sm text-blue-500"
                        >
                           + Add Step
                        </button>
                     </div>

                     <div className="flex justify-between">
                        <button
                           onClick={() => setStep(1)}
                           className="btn-secondary"
                        >
                           Back
                        </button>
                        <button onClick={() => setStep(3)} className="btn">
                           Next
                        </button>
                     </div>
                  </div>
               )}

               {/* Step 3: Nutrition and Misc */}
               {step === 3 && (
                  <div className="space-y-3">
                     <input
                        name="cookingTime"
                        onChange={handleChange}
                        placeholder="Cooking Time (min)"
                        className="input"
                     />
                     <input
                        name="preparationTime"
                        onChange={handleChange}
                        placeholder="Preparation Time (min)"
                        className="input"
                     />
                     <input
                        name="servings"
                        onChange={handleChange}
                        placeholder="Servings"
                        className="input"
                     />
                     <input
                        name="calories"
                        onChange={(e) => handleChange(e, "nutritionInfo")}
                        placeholder="Calories"
                        className="input"
                     />
                     <input
                        name="protein"
                        onChange={(e) => handleChange(e, "nutritionInfo")}
                        placeholder="Protein"
                        className="input"
                     />
                     <input
                        name="carbs"
                        onChange={(e) => handleChange(e, "nutritionInfo")}
                        placeholder="Carbs"
                        className="input"
                     />
                     <input
                        name="fats"
                        onChange={(e) => handleChange(e, "nutritionInfo")}
                        placeholder="Fats"
                        className="input"
                     />

                     <div className="flex justify-between">
                        <button
                           onClick={() => setStep(2)}
                           className="btn-secondary"
                        >
                           Back
                        </button>
                        <button
                           onClick={handleSubmit}
                           className="btn bg-[#ff4d00] text-white hover:bg-orange-600"
                        >
                           Submit
                        </button>
                     </div>
                  </div>
               )}
            </Dialog.Panel>
         </div>
      </Dialog>
   );
};

export default RecipeFormModal;

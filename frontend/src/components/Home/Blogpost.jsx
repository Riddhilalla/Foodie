import React from "react";

function Blogpost() {
  return (
    <>
      <div className="border-4 border-gray-500 rounded-lg w-[90vw] mx-auto mt-6 p-4 flex flex-row h-[65vh]">
        <div className="mt-4 mx-10">
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-4">
            <span className="font-headings text-2xl sm:text-5xl leading-tight">
              Discover the <span className="text-btnColor  ">World</span> of
              Food Like Never Before
            </span>
          </div>
          <div className="mt-6 w-[40vw] ml-15 font-body text-l font-semibold">
            <p>
              Embark on a flavorful journey through the vibrant world of food,
              restaurants, and culinary delights. Whether you're a foodie, a
              chef, or someone who simply loves to explore new cuisines,
              Culinary Chronicles is your ultimate guide to everything
              delicious.
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="burger"
            className="w-[80vw] h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="bg-btnColor mt-10 w-[90vw] mx-auto px-4 rounded-md">
        <p className="font-headings text-l text-white ">Recipe Blog & Review</p>
      </div>

      <div className="mt-20 w-[90vw] h-[60vh] mx-auto px-4 rounded-md  flex flex-row">
        <div className="flex flex-col items-center ">
          <img
            src="https://images.unsplash.com/photo-1590052420599-a5a76c23f1e4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Global Cuisines"
            className="w-[23vw] h-auto rounded-lg"
          />
          <div className="h-[30vh] w-[23vw] bg-background border border-black rounded-lg">
            <h3 className="text-xl font-semibold text-black">
              Global Cuisines
            </h3>
            <p className="text-sm text-black">
              From the spicy streets of Bangkok to the sophisticated kitchens of
              Paris, we bring you stories, recipes, and traditions behind the
              world's most celebrated cuisines.
            </p>
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="h-[30vh] w-auto bg-background border border-black rounded-lg px-5 ">
            <h3 className="text-xl font-semibold text-black">
              Tantalizing Recipes
            </h3>
            <p className="text-sm text-black mt-2">
              Recreate restaurant-quality dishes at home with our step-by-step
              recipes, cooking tips, and secret ingredients to elevate your
              skills.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1574926053821-79c5e338a933?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMHN0eWxpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Tantalizing Recipes"
            className="h-[85vh] w-auto rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1554980291-c3e7cea75872?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxmb29kJTIwc3R5bGluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Beverage Bliss"
            className="w-[23vw] h-auto rounded-lg"
          />
          <div className="h-[30vh] w-[23vw] bg-background border border-black rounded-lg">
            <h3 className="text-xl font-semibold text-black">Beverage Bliss</h3>
            <p className="text-sm text-black">
              Explore pairings, mixology guides, and reviews of wines,
              cocktails, and non-alcoholic beverages that perfectly complement
              your meals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogpost;

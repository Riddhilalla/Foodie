import React from "react";
import { ArrowUp, Mail, Twitter, Instagram, Youtube } from "lucide-react";

function Blogpost() {
  const mainNav = [
    "Recipe",
    "Blog",
    "Wellness",
    "Stories",
    "Reviews",
    "Nutrition",
    "Health",
  ];

  const footerLinks = {
    Company: ["About us", "Careers", "Press"],
    Resources: ["Recipe", "Articles", "Shop"],
    "Use Cases": ["Startup", "Enterprise", "Ecommerce"],
    Product: ["Overview", "Features", "Pricing"],
    Legal: ["Terms", "Privacy", "Cookies"],
  };

  const posts = [
    {
      id: 1,
      title: "Tasty Food",
      subtitle: "for Allergic Person",
      image: "https://plus.unsplash.com/premium_photo-1676106623769-539ecc6d7f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      bgColor: "bg-purple-100",
    },
    {
      id: 2,
      title: "Buy 2",
      subtitle: "Get 1 free",
      price: "$28",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      bgColor: "bg-yellow-100",
    },
    {
      id: 3,
      title: "Cook & Book",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      title: "Food & Veg",
      subtitle: "Nutrition info",
      author: "- Dr. John",
      image: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      bgColor: "bg-amber-50",
    },
    {
      id: 5,
      title: "Save",
      subtitle: "20%",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      bgColor: "bg-orange-100", // fixed invalid color
    },
    {
      id: 6,
      title: "Healthy Options",
      price: "$12 off",
      image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      bgColor: "bg-green-100",
    },
    {
      id: 7,
      title: "SOFT SUGAR",
      subtitle: "Zero Sugar",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      bgColor: "bg-red-50",
    },
    {
      id: 8,
      title: "Vegan Recipe",
      image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="border-4 border-gray-500 rounded-lg w-[90vw] mx-auto mt-6 p-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-1/2">
          <h1 className="text-3xl sm:text-5xl font-bold font-headings">
            Discover the <span className="text-orange-500">World</span> of
            Food Like Never Before
          </h1>
          <p className="mt-6 font-body text-lg font-semibold">
            Embark on a flavorful journey through the vibrant world of food,
            restaurants, and culinary delights. Whether you're a foodie, a chef,
            or someone who simply loves to explore new cuisines, Culinary
            Chronicles is your ultimate guide to everything delicious.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=1470&auto=format&fit=crop"
            alt="burger"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-7xl mx-10 p-6 bg-[#fdfbf6]">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-headings font-bold text-[#ff4d00]">
      A Platform For Foodies
    </h2>
  </div>

  <div className="grid grid-cols-1 font-body md:grid-cols-3 ">
    
      <div className="space-y-4">
        <video
        src="/food1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[30rem] object-cover rounded-lg"
        />
      </div>

      {/* Center Quote Block with green background */}
    <div className="flex flex-col justify-center items-center bg-secondary2 p-4 rounded-lg shadow-md">
      <img
        src="/burger.png"
        alt="Delicious Burger"
        className="w-66 h-50 rounded-lg"
      />
      <blockquote className="text-2xl font-bold leading-tight  text-center text-white">
        "Good food is the foundation of genuine happiness."
      </blockquote>
    </div>

    {/* Right Video */}
    <div className="space-y-4">
      <video
        src="/food2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full  h-[30rem] object-cover rounded-lg"
      />
    </div>
  </div>
</div>


      <div className="max-w-7xl mx-10 p-6 bg-[#fdfbf6]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-headings font-bold text-[#ff4d00]">
            Recipe Blog & Review
          </h2>
          <span className="text-sm font-body">01/03</span>
        </div>

        <div className="grid grid-cols-1 font-body md:grid-cols-3 gap-6">
          {/* Left Post */}
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Food spread"
              className="w-full h-64 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-xl">
              The only premise behind the myth of eating protein and starch.
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#ff4d00]">— Lucas Kay</span>
              <span className="flex items-center gap-2">
                97
                <span role="img" aria-label="comment">💬</span>
              </span>
            </div>
          </div>

          {/* Center Quote */}
          <div className="flex flex-col justify-between">
            <blockquote className="text-3xl font-bold leading-tight">
              "Why not eat meats and starches all at the same time?"
            </blockquote>
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-[#ff4d00]">— Doctor Strange</span>
              <span className="flex items-center gap-2">
                42 <span role="img" aria-label="comment">💬</span>
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
              alt="Grilled meat"
              className="w-full h-48 object-cover rounded-lg mt-4"
            />
          </div>

          {/* Right Post */}
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
              alt="Burger"
              className="w-full h-64 object-cover rounded-lg"
            />
            <h3 className="font-semibold text-xl">
              Tasty Burgers has been on hiatus since the beginning of the
              pandemic.
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#ff4d00]">— Zamir Sheikh</span>
              <span className="flex items-center gap-2">
                63 <span role="img" aria-label="comment">💬</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Follow Grid Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-headings text-btnColor font-bold">
            Follow us for - @culnary_chronicles
          </h2>
          <Instagram className="w-6 h-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`${post.bgColor} rounded-lg overflow-hidden relative group cursor-pointer transition-all hover:opacity-90`}
            >
              <div className="aspect-square relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    {post.subtitle && (
                      <p className="text-sm mt-1">{post.subtitle}</p>
                    )}
                    {post.price && (
                      <span className="inline-block bg-white text-black px-2 py-1 rounded-full text-sm mt-2">
                        {post.price}
                      </span>
                    )}
                    {post.author && (
                      <p className="text-sm mt-1 italic">{post.author}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-background">
        {/* Subscribe Section */}
        <div className="w-full bg-secondary2 to-emerald-700 p-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white">
              <Mail className="h-6 w-6" />
              <h2 className="text-2xl font-headings font-bold">Subscribe to Stay Updated</h2>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-white px-4 py-2 rounded-md w-full md:w-auto"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>



        {/* Footer Content */}
        <div className="max-w-6xl mx-auto px-4 bg-background font-body py-12 grid  gap-8">
          {/* Promo Box */}


          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-3">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-gray-600 hover:text-black"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <div className="border-t border-gray-200 py-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex items-center gap-2 hover:text-gray-600"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </button>

            <p className="text-gray-600">
              ©2025 Riddhi Lalla
            </p>

            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Blogpost;

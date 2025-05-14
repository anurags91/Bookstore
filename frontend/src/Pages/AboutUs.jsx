import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1631269902806-58d69401d065?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bookstore Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0  flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome to Our Bookstore
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Where every page opens a new world
          </p>
        </div>
      </section>

      {/* About Us Text Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <img
            src="https://images.unsplash.com/photo-1552154083-7dec56de59bb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bookshelf"
            className="rounded-xl shadow-lg w-full md:w-1/2"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="mb-4">
              At Our Bookstore, we believe in the power of stories. Since our
              founding, we've aimed to create a warm and inviting space for
              readers of all ages. Whether you're hunting for bestsellers, indie
              gems, or academic references — we’ve got you covered.
            </p>
            <p>
              Beyond selling books, we host reading clubs, author events, and
              educational workshops — creating a true hub for book lovers and
              learners.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            What Makes Us Unique
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <img
                src="https://graciousquotes.com/wp-content/uploads/2021/10/The-reading-of-all-good-books-is-like-a-conversation-with-the-finest-minds-of-past-centuries.-%E2%80%94-Rene-Descartes.jpg"
                alt="Vision"
                className="rounded mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p>
                To make quality literature accessible, affordable, and engaging
                for everyone.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <img
                src="https://images.unsplash.com/photo-1640070820570-ccf645e10a39?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Community"
                className="rounded mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold mb-2">Reader Community</h3>
              <p>
                Join events, meet authors, and connect with readers across all
                ages and interests.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <img
                src="https://images.unsplash.com/photo-1602221527282-dabc4778535b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Collection"
                className="rounded mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold mb-2">Diverse Collection</h3>
              <p>
                From classics to the latest releases, our shelves are full of
                curated picks for every taste.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

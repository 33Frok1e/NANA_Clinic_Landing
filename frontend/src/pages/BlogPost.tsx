import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActionButtons from "@/components/ActionButtons";
import { Button } from "@/components/ui/button";
import { blogs } from "@/data/blogs";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-clinic-secondary via-white to-clinic-secondary flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-clinic-accent mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link to="/blog">
              <Button className="bg-clinic-primary text-white hover:bg-clinic-accent rounded-full px-6">
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-secondary via-white to-clinic-secondary flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-semibold text-clinic-primary hover:text-clinic-accent transition-colors duration-300 gap-1.5 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-clinic-muted text-clinic-accent text-xs font-semibold rounded-full uppercase tracking-wider">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-clinic-accent leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-clinic-muted flex items-center justify-center">
                <User className="h-4 w-4 text-clinic-accent" />
              </div>
              <span className="font-medium text-gray-700">{blog.author}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4.5 w-4.5 text-clinic-primary" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-clinic-primary" />
                {blog.readTime}
              </span>
            </div>
          </div>

          {/* Picture after the Title */}
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-10 bg-gray-50">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Bunch of text like paragraph */}
          <div className="prose prose-lg prose-clinic max-w-none text-gray-700 space-y-6 leading-relaxed">
            {blog.content.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
      <ActionButtons />
    </div>
  );
};

export default BlogPost;

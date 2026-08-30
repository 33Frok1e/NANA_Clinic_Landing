import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActionButtons from "@/components/ActionButtons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { blogs } from "@/data/blogs";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Hearing Health", "Technology", "Speech Care"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-clinic-secondary via-white to-clinic-secondary flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-clinic-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-clinic-muted text-clinic-primary rounded-full text-sm font-semibold mb-4 animate-fade-in">
            Health Insights & Education
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-accent mb-4">
            Our <span className="text-clinic-primary">Medical Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with expert articles on audiology advancements, hearing aid care, speech therapy practices, and general ear health.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-clinic-primary text-white shadow-md"
                    : "bg-white text-clinic-accent border border-gray-200 hover:bg-clinic-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-clinic-muted focus:border-clinic-primary focus:ring-clinic-primary rounded-full bg-white text-clinic-accent w-full"
            />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 max-w-md mx-auto">
              <p className="text-gray-500 text-lg font-medium mb-4">No articles found</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-clinic-primary text-white hover:bg-clinic-accent rounded-full px-6"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="group bg-white border border-gray-200 overflow-hidden flex flex-col h-full card-shadow hover:-translate-y-1.5 transition-all duration-300 rounded-2xl"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-clinic-accent shadow-sm border border-white/20">
                      {blog.category}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Meta Information */}
                      <div className="flex items-center text-xs text-gray-500 gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-clinic-primary" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-clinic-primary" />
                          {blog.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-clinic-accent line-clamp-2 group-hover:text-clinic-primary transition-colors duration-300">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-clinic-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-clinic-accent" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{blog.author}</span>
                      </div>
                      <Link
                        to={`/blog/${blog.id}`}
                        className="inline-flex items-center text-sm font-semibold text-clinic-primary group-hover:text-clinic-accent transition-colors duration-300 gap-1.5"
                      >
                        Read Post
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ActionButtons />
    </div>
  );
};

export default BlogList;

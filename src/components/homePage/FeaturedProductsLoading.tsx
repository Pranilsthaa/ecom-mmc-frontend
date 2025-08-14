import React from "react";

export default function FeaturedProductsLoading() {
  return (
    <section className="py-16 bg-[var(--color-muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-80 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse w-32"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-10 bg-gray-200 rounded w-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

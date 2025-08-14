import { Product } from "@/components/ui/ProductCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ProductsAPI {
  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      // Uncomment and modify when you have a real API
      // const response = await fetch(`${API_BASE_URL}/products/featured`, {
      //   next: { 
      //     revalidate: 3600, // Revalidate every hour
      //     tags: ['featured-products'] // For on-demand revalidation
      //   },
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      // if (!response.ok) {
      //   throw new Error(`Failed to fetch featured products: ${response.status}`);
      // }
      
      // const result: ApiResponse<Product[]> = await response.json();
      // return result.data;

      // Mock data for now - replace with actual API call above
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              name: "Classic Wooden Frame edited",
              price: 89,
              originalPrice: 120,
              image: "/placeholder-frame-1.jpg",
              rating: 4.8,
              reviews: 124,
              isNew: false,
              isBestseller: true,
              category: "Wooden Frames",
              description: "Handcrafted from premium oak wood with a natural finish",
              sizes: ["5x7", "8x10", "11x14", "16x20"],
              colors: ["Natural", "Dark Walnut", "White Wash"],
              inStock: true,
            },
            {
              id: 2,
              name: "Modern Metal Frame",
              price: 65,
              originalPrice: null,
              image: "/placeholder-frame-2.jpg",
              rating: 4.9,
              reviews: 89,
              isNew: true,
              isBestseller: false,
              category: "Metal Frames",
              description: "Sleek aluminum frame perfect for contemporary spaces",
              sizes: ["4x6", "5x7", "8x10", "12x16"],
              colors: ["Silver", "Black", "Gold"],
              inStock: true,
            },
            {
              id: 3,
              name: "Vintage Gold Frame",
              price: 145,
              originalPrice: 180,
              image: "/placeholder-frame-3.jpg",
              rating: 4.7,
              reviews: 203,
              isNew: false,
              isBestseller: true,
              category: "Vintage Collection",
              description: "Ornate gold-leafed frame with intricate baroque details",
              sizes: ["8x10", "11x14", "16x20", "20x24"],
              colors: ["Antique Gold", "Silver Leaf"],
              inStock: true,
            },
            {
              id: 4,
              name: "Minimalist Black Frame",
              price: 75,
              originalPrice: null,
              image: "/placeholder-frame-4.jpg",
              rating: 4.6,
              reviews: 156,
              isNew: false,
              isBestseller: false,
              category: "Modern Collection",
              description: "Clean lines and matte black finish for a modern aesthetic",
              sizes: ["5x7", "8x10", "11x14"],
              colors: ["Matte Black", "Glossy Black"],
              inStock: false,
            },
          ]);
        }, 500); // Simulate API delay
      });
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Return empty array or throw error based on your error handling strategy
      return [];
    }
  }

  static async getProductById(id: number): Promise<Product | null> {
    // Implementation for getting a single product
    const products = await this.getFeaturedProducts();
    return products.find(p => p.id === id) || null;
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    // Implementation for getting products by category
    const products = await this.getFeaturedProducts();
    return products.filter(p => 
      p.category?.toLowerCase().includes(category.toLowerCase())
    );
  }
}

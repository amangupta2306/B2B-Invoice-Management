import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, PieChart, Shield } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-full max-w-7xl pt-32">
      <h2 className="text-6xl font-bold text-center">
        Welcome to{" "}
        <div className="pt-4">
          <span className="text-blue-500">B2B</span> INVOICE MANGEMENT SYSTEM
        </div>
      </h2>
      <p className="text-3xl">
        A Place where you can manage all your invoice work at one place.
      </p>
      
      <div className="py-6">
        <Link href={"/auth/signin"}>
          <Button className="px-8 py-6 text-lg  flex items-center">
            Sign in
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Automated Processing
              </h3>
              <p className="text-gray-600">
                Save time with AI-powered invoice processing and data extraction
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <PieChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Get instant insights into your cash flow and payment trends
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
              <p className="text-gray-600">
                Enterprise-grade security to protect your sensitive financial
                data
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, PieChart, Shield } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-12 h-full max-w-7xl pt-32 px-5 text-white text-center">
      <div className="text-5xl lg:text-6xl font-bold text-center w-full">
        Welcome to
        <div className="lg:pt-4">
          <span className="text-[#5c7cfa]">B2B</span> INVOICE MANGEMENT SYSTEM
        </div>
      </div>
      <p className="text-2xl lg:text-3xl text-[#cdd6f4]">
        A Place where you can manage all your invoice work at one place.
      </p>

      <div className="py-6">
        <Link href={"/auth/signin"}>
          <Button className="font-semibold px-8 py-6 text-lg text-[#ffffff] bg-[#4c6ef5] hover:bg-[#3b5bdb] flex items-center">
            Sign in
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="py-14 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center bg-[#1e1e2f] rounded-lg p-12 shadow-lg">
            <div className="bg-[#cdd6f4] w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Automated Processing</h3>
            <p className="text-[#adb5bd]">
              Save time with invoice processing and data extraction
            </p>
          </div>
          <div className="text-center bg-[#1e1e2f] rounded-lg p-12 shadow-lg">
            <div className="bg-[#cdd6f4] w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <PieChart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
            <p className="text-[#adb5bd]">
              Get instant insights into your cash flow and payment trends
            </p>
          </div>
          <div className="text-center bg-[#1e1e2f] rounded-lg p-12 shadow-lg">
            <div className="bg-[#cdd6f4] w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
            <p className="text-[#adb5bd]">
              Enterprise-grade security to protect your sensitive financial data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

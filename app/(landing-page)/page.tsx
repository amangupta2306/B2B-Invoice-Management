import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center text-center flex-1">
        <Heading />
      </div>
      <Footer />
    </div>
  );
}

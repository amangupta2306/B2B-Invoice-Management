"use client";

import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export const SmlTemplate = ({ invoiceInfo }: { invoiceInfo: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const unfilledArray = Array.from(
    { length: 29 - invoiceInfo.pricedProducts?.length },
    (_, i) => i + 1
  );
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // onAfterPrint: () => {
    //     router.back();
    // },
  });

  useEffect(() => {
    if (searchParams.get("print")) handlePrint();
  }, []);

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    if (!input) return;
    html2canvas(input)?.then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(
        imgData,
        "JPEG",
        3,
        3,
        canvas.width * 0.29,
        canvas.height * 0.25
      );
      pdf.save(`Invoice.pdf`);
      pdf.autoPrint();
    });
  };
  5;

  return (
    <>
      <div className="max-w-screen-md container mx-auto">
        <div className="flex justify-center mt-6 gap-3">
          <Button onClick={handlePrint} variant="secondary">
            Print Invoice
          </Button>
          <Button onClick={printDocument} variant="secondary">
            Download PDF
          </Button>
        </div>
      </div>

      <div ref={componentRef} id="divToPrint">
        <div className="border border-black dark:border-white rounded-xl m-10">
          <div className="text-center">
            <h4 className="underline">BILL/CASH MEMO</h4>

            <div className="text-right px-1">Mob : 8826196480</div>
            <h1 className="text-4xl font-bold">RAVI KUMAR</h1>
            <p>(Supplier of Pure Bisleri & Aqua Drinking Water)</p>
            <div className="border border-black dark:border-white rounded-lg mx-2 text-sm mt-1">
              Off: E-67, Laxmi Market, Munirka, Opp. Canara Bank, New
              Delhi-110067
            </div>
          </div>

          <div className="max-w-full border-black dark:border-white mt-2">
            <div className="grid grid-cols-2 justify-between border-b border-black dark:border-white w-full">
              <div className="p-1 border-r border-t border-black dark:border-white">
                S. No : 1000
              </div>
              <div className="p-1 border-t border-black dark:border-white">
                Date : 24-01-2025
              </div>
            </div>
            <div className="p-1">M/S : Aman</div>
          </div>

          <div className="h-[470px]">
            <div className="flex max-w-full border-black dark:border-white text-center">
              <div className="w-20 border-r border-b border-t border-black dark:border-white">
                Sl No.
              </div>
              <div className="w-[600px] border-r border-b border-t border-black dark:border-white">
                Description of Goods
              </div>
              <div className="w-36 border-r border-b border-t border-black dark:border-white">
                Quantity
              </div>
              <div className="w-32 border-r border-b border-t border-black dark:border-white">
                Rate
              </div>
              <div className="w-40 border-b border-t border-black dark:border-white">
                Amount
              </div>
            </div>

            <div className="flex max-w-full border-black dark:border-white max-h-full text-center ">
              <div className="w-20 border-r border-black dark:border-white">
                10
              </div>
              <div className="w-[595.5px] border-r border-black dark:border-white text-start px-1">
                Bisleri Water 20 Ltr. Jar
              </div>
              <div className="w-36 border-r border-black dark:border-white">
                85
              </div>
              <div className="w-32 border-r border-black dark:border-white">
                85
              </div>
              <div className="w-40 border-black dark:border-white">850</div>
            </div>

            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />
            <UnfilledProductTable />

            {unfilledArray.map((item) => (
              <UnfilledProductTable key={item} />
            ))}
          </div>
          <div className="flex max-w-full flex-1 border-black dark:border-white max-h-full text-center border-t">
            <div className="w-20 border-r border-black dark:border-white">
              &nbsp;
            </div>
            <div className="w-[595.5px] border-r border-black dark:border-white text-end px-1">
              Total
            </div>
            <div className="w-36 border-r border-black dark:border-white">
              &nbsp;
            </div>
            <div className="w-32 border-r border-black dark:border-white">
              &nbsp;
            </div>
            <div className="w-40 border-black dark:border-white">850</div>
          </div>

          <footer className="flex w-full justify-between h-16 px-1 border-black dark:border-white border-t">
            <div className="italic">E. & O.E.</div>
            <div>for Mukesh Traders</div>
          </footer>
        </div>
      </div>
    </>
  );
};

const UnfilledProductTable = () => {
  return (
    <div className="flex items-center text-center">
      <div className="border-r border-black dark:border-white w-20">&nbsp;</div>
      <div className="border-r border-black dark:border-white w-[600px]">
        &nbsp;
      </div>
      <div className="border-r border-black dark:border-white w-36">&nbsp;</div>
      <div className="border-r border-black dark:border-white w-32">&nbsp;</div>
      <div className="border-black dark:border-white w-40">&nbsp;</div>
    </div>
  );
};

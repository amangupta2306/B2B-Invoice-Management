"use client";

import { useEffect, useRef } from "react";
import { ToWords } from "to-words";
import { cn, formatCurrencyForIndia } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export const InvoiceTemplate = ({
  invoiceInfo,
  companyInfo,
}: {
  invoiceInfo: any;
  companyInfo: any;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toWords = new ToWords();

  const unfilledArray = Array.from(
    {
      length:
        invoiceInfo.pricedProducts?.length > 7
          ? 21 - invoiceInfo.pricedProducts?.length
          : 29 - invoiceInfo.pricedProducts?.length,
    },
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

  const totalCgstAmt = Number(
    invoiceInfo?.pricedProducts?.reduce(
      (sum: number, product: any) => sum + Number(product.cgstAmt),
      0
    )
  ).toFixed(2);
  const totalSgstAmt = Number(
    invoiceInfo?.pricedProducts?.reduce(
      (sum: number, product: any) => sum + Number(product.sgstAmt),
      0
    )
  ).toFixed(2);

  return (
    <div className="max-w-screen-md container mx-auto">
      <div className="flex justify-center mt-6 gap-3">
        <Button onClick={handlePrint} variant="secondary">
          Print Invoice
        </Button>
        <Button onClick={printDocument} variant="secondary">
          Download PDF
        </Button>
      </div>
      <div
        ref={componentRef}
        id="divToPrint"
        className="text-xs text-black dark:text-white"
      >
        <header className="pt-5">
          <div className=" flex justify-between items-center mb-1">
            <div></div>
            <div className="font-bold text-center ml-56 text-lg">
              TAX INVOICE
            </div>
            <div className="italic mr-28">(ORIGINAL FOR RECIPIENT)</div>
          </div>
        </header>

        <main>
          <div className="border border-black dark:border-white mx-12">
            <div className="flex">
              <div className="w-[57%]">
                <div className="border-r border-black dark:border-white px-1">
                  <p className="font-bold uppercase">
                    {companyInfo?.companyName}
                  </p>
                  <p className="w-52 uppercase">
                    {companyInfo?.companyAddress}
                  </p>
                  <p>GSTIN/UIN : {companyInfo?.gstNo}</p>
                  <p>
                    State Name : {companyInfo?.state}, Code : 0
                    {companyInfo?.stateCode}
                  </p>
                </div>
                <div className="border-t border-r border-black dark:border-white px-1">
                  <p>Buyer (Bill to)</p>
                  <p className="font-bold">
                    {invoiceInfo?.customer?.customerName}
                  </p>
                  <p className="w-72">{invoiceInfo?.customer?.address}</p>
                  <p>GSTIN/UIN : {invoiceInfo?.customer?.gstIn}</p>
                  <p>
                    State Name : {invoiceInfo?.customer?.state}, Code : 0
                    {invoiceInfo?.customer?.stateCode}
                  </p>
                </div>
              </div>

              <div className="w-[43%]">
                <div className="grid grid-cols-2">
                  <span className="border-b border-r border-black dark:border-white px-1 h-[36px]">
                    <p>Invoice No.</p>
                    <p className="font-bold">{invoiceInfo?.invoiceNo}</p>
                  </span>
                  <span className="border-b border-black dark:border-white px-1 h-[36px]">
                    <p>Dated</p>
                    <p className="font-bold">
                      {format(invoiceInfo?.invoiceDate, "dd-MM-yyyy")}
                    </p>
                  </span>
                  <span className="border-b border-r border-black dark:border-white px-1 h-[36px]">
                    <p>Month</p>
                    <p className="font-bold">
                      {invoiceInfo?.monthOf}, {invoiceInfo?.yearOf}
                      {/* Aug-Sep, 2023 */}
                    </p>
                  </span>
                  <span className="border-b border-black dark:border-white px-1 h-[36px]">
                    <p>Mode/Terms of Payment</p>
                  </span>
                  <span className="border-b border-r border-black dark:border-white px-1 h-[36px]">
                    <p>Reference No. & Date</p>
                  </span>
                  <span className="border-b border-black dark:border-white px-1 h-[36px]">
                    <p>Other References</p>
                  </span>
                </div>
                <div className="px-1">
                  <p>Terms of Delivery</p>
                </div>
              </div>
            </div>

            <div className="relative -z-10 max-h-[35.1rem] w-full text-center border-y border-black dark:border-white">
              <div className="flex border-b border-black dark:border-white items-center text-center">
                <div className="border-r border-black dark:border-white w-10">
                  Sl No.
                </div>
                <div className="border-r border-black dark:border-white w-[322px]">
                  Description of Goods
                </div>
                <div className="border-r border-black dark:border-white w-16">
                  HSN/SAC
                </div>
                <div className="border-r border-black dark:border-white w-20">
                  Quantity
                </div>
                <div className="border-r border-black dark:border-white w-20">
                  Rate
                </div>
                <div className="w-28 pr-1">Amount</div>
              </div>

              <div>
                {invoiceInfo?.pricedProducts?.map((item: any, i: number) => (
                  <div key={item.id} className="flex w-full text-center">
                    <div className="border-r border-black dark:border-white w-10">
                      {i + 1}
                    </div>
                    <div className="border-r border-black dark:border-white w-[322px] text-start px-1 font-bold">
                      {item?.product?.productName}
                    </div>
                    <div className="border-r border-black dark:border-white w-16">
                      {item?.product?.hsnCode}
                    </div>
                    <div className="border-r border-black dark:border-white w-20">
                      {item?.qty}
                    </div>
                    <div className="border-r border-black dark:border-white w-20">
                      {item?.rate.toFixed(2)}
                    </div>
                    <div className="w-28 text-end pr-1">
                      {item?.taxableValue}
                    </div>
                  </div>
                ))}
              </div>

              <UnfilledProductTable />
              <UnfilledProductTable />
              <UnfilledProductTable />

              {!invoiceInfo.isOutsideDelhiInvoice ? (
                <>
                  <div className=" w-full flex border-black dark:border-white items-center text-center">
                    <div className="border-r border-black dark:border-white w-10 ">
                      &nbsp;
                    </div>
                    <div className="border-r border-black dark:border-white w-[322px] text-end px-1 italic font-bold">
                      CGST %
                    </div>
                    <div className="border-r border-black dark:border-white w-16">
                      &nbsp;
                    </div>
                    <div className="border-r border-black dark:border-white w-20">
                      &nbsp;
                    </div>
                    <div className="border-r border-black dark:border-white w-20">
                      &nbsp;
                    </div>
                    <div className="w-28 text-end pr-1">{totalCgstAmt}</div>
                  </div>

                  <div className=" w-full flex border-black dark:border-white items-center text-center">
                    <div className="border-r border-black dark:border-white w-10 ">
                      &nbsp;
                    </div>
                    <div className="border-r border-black dark:border-white w-[322px] text-end px-1 italic font-bold">
                      SGST %
                    </div>
                    <div className="border-r border-black dark:border-white w-16">
                      &nbsp;
                    </div>
                    <div className="border-r border-black dark:border-white w-20">
                      &nbsp;
                    </div>
                    <div className="border-r border-black dark:border-white w-20">
                      &nbsp;
                    </div>
                    <div className="w-28 text-end pr-1">{totalSgstAmt}</div>
                  </div>
                </>
              ) : (
                <div className=" w-full flex border-black dark:border-white items-center text-center">
                  <div className="border-r border-black dark:border-white w-10 ">
                    &nbsp;
                  </div>
                  <div className="border-r border-black dark:border-white w-[322px] text-end px-1 italic font-bold">
                    IGST %
                  </div>
                  <div className="border-r border-black dark:border-white w-16">
                    &nbsp;
                  </div>
                  <div className="border-r border-black dark:border-white w-20">
                    &nbsp;
                  </div>
                  <div className="border-r border-black dark:border-white w-20">
                    &nbsp;
                  </div>
                  <div className="w-28 text-end pr-1">
                    {(Number(totalSgstAmt) + Number(totalCgstAmt)).toFixed(2)}
                  </div>
                </div>
              )}

              <div className=" absolute bottom-0 w-full flex border-t border-black dark:border-white items-center text-center">
                <div className="border-r border-black dark:border-white w-10 ">
                  &nbsp;
                </div>
                <div className="border-r border-black dark:border-white w-[322px] text-end px-1">
                  Total
                </div>
                <div className="border-r border-black dark:border-white w-16">
                  &nbsp;
                </div>
                <div className="border-r border-black dark:border-white w-20">
                  &nbsp;
                </div>
                <div className="border-r border-black dark:border-white w-20">
                  &nbsp;
                </div>
                <div className="w-28 text-end font-bold pr-1">
                  {formatCurrencyForIndia(invoiceInfo?.totalInvoiceValue)}
                </div>
              </div>

              {unfilledArray.map((item) => (
                <UnfilledProductTable key={item} />
              ))}
            </div>

            <div className="border-b border-black dark:border-white flex justify-between px-1">
              <div>
                <p>Amount Chargeable (in words)</p>
                <p className="font-bold">
                  INR{" "}
                  {toWords.convert(invoiceInfo?.totalInvoiceValue, {
                    currency: true,
                  })}
                </p>
              </div>
              <div className="italic">E. & O.E</div>
            </div>

            <div className="flex text-center">
              {/* Header 1 */}

              <div
                className={cn(
                  "border-b border-r border-black dark:border-white",
                  invoiceInfo.isOutsideDelhiInvoice ? "w-[26.2rem]" : "w-80"
                )}
              >
                <div>HSN/SAC</div>
              </div>

              {/* Header 2 */}
              <div className="flex border-b border-black dark:border-white text-center">
                <div className="w-20 border-r px-2 border-black dark:border-white">
                  <div>Taxable Value</div>
                </div>

                {!invoiceInfo.isOutsideDelhiInvoice ? (
                  <>
                    <div>
                      <div className="border-b border-r border-black dark:border-white">
                        Central Tax
                      </div>
                      <div className="flex">
                        <div className="w-12 border-r border-black dark:border-white">
                          Rate
                        </div>
                        <div className="w-16 border-r border-black dark:border-white">
                          Amount
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="border-b border-r border-black dark:border-white">
                        State Tax
                      </div>
                      <div className="flex">
                        <div className="w-12 border-r border-black dark:border-white">
                          Rate
                        </div>
                        <div className="w-16 border-r border-black dark:border-white">
                          Amount
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="border-b border-r border-black dark:border-white">
                      IGST
                    </div>
                    <div className="flex">
                      <div className="w-12 border-r border-black dark:border-white">
                        Rate
                      </div>
                      <div className="w-16 border-r border-black dark:border-white">
                        Amount
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-[91px] border-black dark:border-white">
                  <div>Total</div>
                  Tax Amount
                </div>
              </div>
            </div>

            <div className="w-full">
              {invoiceInfo?.pricedProducts?.map((item: any) => (
                <div key={item.id} className="flex">
                  <div
                    className={cn(
                      invoiceInfo.isOutsideDelhiInvoice ? "w-[26.2rem]" : "w-80"
                    )}
                  >
                    <div className="border-b border-r border-black dark:border-white text-start px-1">
                      {item?.product?.hsnCode}
                    </div>
                  </div>

                  <div className="flex text-center">
                    <div className="w-20 border-b border-r border-black dark:border-white">
                      {item?.taxableValue}
                    </div>

                    {invoiceInfo.isOutsideDelhiInvoice ? (
                      <div className="flex">
                        <div className="w-12 border-b border-r border-black dark:border-white">
                          {Number(item?.product?.cgstRate) +
                            Number(item?.product?.sgstRate)}
                          %
                        </div>
                        <div className="w-16 border-b border-r border-black dark:border-white">
                          {(
                            Number(item?.cgstAmt) + Number(item?.sgstAmt)
                          ).toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex">
                          <div className="w-12 border-b border-r border-black dark:border-white">
                            {Number(item?.product?.cgstRate)}%
                          </div>
                          <div className="w-16 border-b border-r border-black dark:border-white">
                            {Number(item?.cgstAmt).toFixed(2)}
                          </div>
                        </div>

                        <div className="flex">
                          <div className="w-12 border-b border-r border-black dark:border-white">
                            {Number(item?.product?.sgstRate)}%
                          </div>
                          <div className="w-16 border-b border-r border-black dark:border-white">
                            {Number(item?.sgstAmt).toFixed(2)}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="w-[91px] border-b border-black dark:border-white">
                      {(Number(item?.cgstAmt) + Number(item?.sgstAmt)).toFixed(
                        2
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex">
                <div
                  className={cn(
                    invoiceInfo.isOutsideDelhiInvoice ? "w-[26.2rem]" : "w-80"
                  )}
                >
                  <div className="border-b border-r border-black dark:border-white text-right px-1">
                    Total
                  </div>
                </div>

                <div className="flex text-center font-bold">
                  <div className="w-20 border-b border-r border-black dark:border-white">
                    {Number(invoiceInfo?.totalTaxableValue).toFixed(2)}
                  </div>
                  {invoiceInfo.isOutsideDelhiInvoice ? (
                    <div className="flex">
                      <div className="w-12 border-b border-r border-black dark:border-white">
                        &nbsp;
                      </div>
                      <div className="w-16 border-b border-r border-black dark:border-white">
                        {(Number(totalCgstAmt) + Number(totalSgstAmt)).toFixed(
                          2
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex">
                        <div className="w-12 border-b border-r border-black dark:border-white">
                          &nbsp;
                        </div>
                        <div className="w-16 border-b border-r border-black dark:border-white">
                          {totalCgstAmt}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-12 border-b border-r border-black dark:border-white">
                          &nbsp;
                        </div>
                        <div className="w-16 border-b border-r border-black dark:border-white">
                          {totalSgstAmt}
                        </div>
                      </div>
                    </>
                  )}

                  {invoiceInfo.isOutsideDelhiInvoice ? (
                    <div className="w-[91px] border-b border-black dark:border-white">
                      {(Number(totalCgstAmt) + Number(totalSgstAmt)).toFixed(2)}
                    </div>
                  ) : (
                    <div className="w-[91px] border-b border-black dark:border-white">
                      {(Number(totalCgstAmt) + Number(totalSgstAmt)).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="px-1">
                Tax Amount (in words) :{" "}
                <span className="font-bold">
                  INR{" "}
                  {toWords.convert(invoiceInfo?.totalTaxGST, {
                    currency: true,
                  })}
                </span>
              </span>
              <div className="flex w-full">
                <div className="w-[450px]">&nbsp;</div>
                <div className="w-full">
                  <p>Company&apos;s Bank Details</p>
                  <table>
                    <thead>
                      <tr>
                        <td>Bank Name</td>
                        <td className="font-bold">: {companyInfo?.bankName}</td>
                      </tr>
                      <tr>
                        <td>A/c No.</td>
                        <td className="font-bold">
                          : {companyInfo?.bankAccountNo}
                        </td>
                      </tr>
                      <tr>
                        <td>Branch & IFSC Code</td>
                        <td className="font-bold">
                          : {companyInfo?.bankBranch} &&nbsp;
                          {companyInfo?.bankIfscCode}
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <div className="w-full flex">
                <div className="px-1 w-2/4">
                  <p>Declaration :</p>
                  We declare that this invoice shows the actual price of the
                  goods described and that all the particulars are true &
                  correct.
                </div>
                <div className="border-t border-l border-black dark:border-white flex flex-col justify-between px-1 w-2/4">
                  <div className="text-end font-bold">
                    for {companyInfo?.companyName}
                  </div>
                  <div className="text-end">Authorised Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <p className="text-center mt-1">
            This is a Computer Generated Invoice
          </p>
        </footer>
      </div>
    </div>
  );
};

const UnfilledProductTable = () => {
  return (
    <div className="flex items-center text-center">
      <div className="border-r border-black dark:border-white w-10 ">
        &nbsp;
      </div>
      <div className="border-r border-black dark:border-white w-[322px] ">
        &nbsp;
      </div>
      <div className="border-r border-black dark:border-white w-16">&nbsp;</div>
      <div className="border-r border-black dark:border-white w-20">&nbsp;</div>
      <div className="border-r border-black dark:border-white w-20">&nbsp;</div>
      <div className="w-28 pr-1"></div>
    </div>
  );
};

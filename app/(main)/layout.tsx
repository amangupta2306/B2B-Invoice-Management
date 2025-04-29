import { AppSidebar } from "@/components/app-sidebar";
import { BreadCrumb } from "@/components/breadcrumb";
import { Profile } from "@/components/profile";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (session && !session?.user?.companyName) {
  //   redirect("/settings");
  // }
  return (
    <>
      {/* {showModal && <CompanyProfileModal />} */}
      <SidebarProvider>
        <AppSidebar  />
        <main className="flex flex-col flex-1 w-full h-screen overflow-x-hidden">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 shadow">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className="flex items-center justify-between w-full">
              <BreadCrumb />
              <Profile />
            </div>
          </header>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

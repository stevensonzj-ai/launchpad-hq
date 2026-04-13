import { Header } from "@/components/layout/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-950">{children}</main>
    </>
  );
}

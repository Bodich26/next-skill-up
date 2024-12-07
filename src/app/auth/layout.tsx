import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Skill Up",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header></header>
      <main className="">{children}</main>
      <footer className="">
        {/* <Container>©Сreator and Author by Bodich</Container> */}
      </footer>
    </>
  );
}

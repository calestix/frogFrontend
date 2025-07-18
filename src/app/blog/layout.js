
export const metadata={
  title:"Blog - Forgetc",
  description:"Latest news and articles about construction and repair services by Forge.",
   openGraph: {
    title:"Blog - Forgetc",
    description:"Trusted construction and repair services in Saudi Arabia"
   }
}

export default function blogLayout({children}) {
  return (
    <section>
        {children}
    </section>
  );
}

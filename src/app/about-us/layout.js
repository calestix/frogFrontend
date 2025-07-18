
export const metadata={
  title:"About Us - Forgetc",
  description:"Forgetc - Saudi Arabia's trusted construction & repair services partner.",
   openGraph: {
    title:"About Us - Forgetc",
    description:"Trusted construction and repair services in Saudi Arabia"
   }
}

export default function AboutLayout({children}) {
  return (
    <section>
        {children}
    </section>
  );
}

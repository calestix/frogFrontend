
export const metadata={
  title:"Our Services - FORGE Trading and Construction",
  description:"Explore our range of construction and repair services across Saudi Arabia.",
   openGraph: {
    title:"Blog - FORGE Trading and Construction",
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

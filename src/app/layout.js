import ClientLayout from "./ClientLayout";
import "./globals.css";
import {AuthProvider} from "./context/auth.context"


export const metadata = {
  title: "FORGE T&C EST",
  description: "FORGE T&C EST",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <AuthProvider>
        <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

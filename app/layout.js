import "./globals.css";

export const metadata = {
  title: "TODO APPLICATION | todo-devops",
  description: "A simple task list for staying on track.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

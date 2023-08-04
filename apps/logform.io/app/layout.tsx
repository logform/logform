export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Logform</title>
      <body>{children}</body>
    </html>
  );
}

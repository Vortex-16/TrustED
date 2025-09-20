export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t py-6">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {currentYear} TrustED. All rights reserved.</p>
        <p className="text-sm mt-1">
          Government of Jharkhand, Department of Higher and Technical Education
        </p>
      </div>
    </footer>
  );
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Default admin to dark before hydration to avoid light flash */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('portfolio-admin-theme');if(t!=='light'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}}catch(e){document.documentElement.classList.add('dark');}})();`,
        }}
      />
      {children}
    </>
  );
}

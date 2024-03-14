/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // REDIRECCIONA DE LA PRINCIPAL DIRECTAMENTE A PRODUCT (BORRAMOS LA PAGE PRINCIPAL SI NO SIRVE)
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

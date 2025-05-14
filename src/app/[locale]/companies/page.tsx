import { getData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CompanyTypes } from "@/libs/types/types";

const CompaniesPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  
  const fetchData = async () => {
    try {
      const response = await getData(
        "company",
        {},
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  }
  
  const companies = await fetchData();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Moving Companies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies &&
          companies.map((company: CompanyTypes) => (
            <div
              key={company.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={company.image || "/placeholder-company.jpg"}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{company.name}</h2>

                <div className="text-gray-600 mb-4">
                  <p className="flex items-center mb-1">
                    <span className="font-medium mr-2">Address:</span>
                    {company.address}, {company.postal_code} {company.city}
                  </p>
                  <p className="flex items-center mb-1">
                    <span className="font-medium mr-2">Phone:</span>
                    {company.phone || company.telephone || company.mobile_phone}
                  </p>
                  {company.email && (
                    <p className="flex items-center mb-1">
                      <span className="font-medium mr-2">Email:</span>
                      {company.email}
                    </p>
                  )}
                  {company.possible_website && (
                    <p className="flex items-center mb-1">
                      <span className="font-medium mr-2">Website:</span>
                      <a
                        href={company.possible_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {company.possible_website}
                      </a>
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">
                      {company.reviews && company.reviews.length > 0
                        ? (
                            company.reviews.reduce(
                              (acc, review) => acc + review.rating,
                              0
                            ) / company.reviews.length
                          ).toFixed(1)
                        : "No ratings"}
                    </span>
                  </div>
                  <Link
                    href={`/companies/${company.id}?page=about%20us`}
                    locale={locale}
                    className="bg-[#192953] text-white px-4 py-2 rounded hover:bg-[#0F1A36] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {(!companies || companies.length === 0) && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No companies found</p>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
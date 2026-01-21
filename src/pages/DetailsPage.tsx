import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import contractDetails from "../const/contractDetails.json";

/* -------------------- Types -------------------- */

type ContractType =
  | "job_offer_letter"
  | "internship_offer_letter"
  | "job_agreement"
  | "rent_agreement"
  | "nda";

interface ContractDetail {
  title: string;
  description: string;
  preview: string;
}

type ContractDetailsMap = Record<ContractType, ContractDetail>;

/* -------------------- Component -------------------- */

const DetailsPage: React.FC = () => {
  const { type } = useParams<{ type: ContractType }>();
  const navigate = useNavigate();

  const details = type
    ? (contractDetails as ContractDetailsMap)[type]
    : undefined;

  if (!details) {
    return <p className="p-6">No details available</p>;
  }

  return (
    <div className="p-6 flex min-h-screen">
      {/* Left section */}
      <div className="max-w-xl whitespace-pre-line">
        <h1 className="text-2xl font-bold mb-2">{details.title}</h1>

        <p className="text-gray-600 mb-4">{details.description}</p>

        {/* Contract preview */}
        <div className="bg-gray-50 p-4 rounded shadow-inner text-sm">
          {details.preview}
        </div>
      </div>

      {/* Next button */}
      <div className="ml-auto mt-auto">
        <div
          onClick={() => navigate(`/form/${type}`)}
          className="
            border-blue-300 font-bold shadow-blue-300
            border-2 rounded-4xl h-10 w-40
            flex justify-center items-center
            text-blue-300 hover:cursor-pointer
            hover:border-blue-600 hover:text-blue-600
            hover:shadow-xl hover:shadow-blue-600
            transition
          "
        >
          NEXT
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

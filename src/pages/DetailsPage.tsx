import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import contractDetails from "../const/contractDetails.json";
import "../styles/DetailsPage.css"

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
    <div className="details-container">
      {/* Left section */}
      <div className="details-left">
        <h1 className="details-title">{details.title}</h1>
        <p className="details-description">{details.description}</p>

        {/* Contract preview */}
        <div className="details-preview">{details.preview}</div>
      </div>

      {/* Next button */}
      <div
        className="next-button"
        onClick={() => navigate(`/form/${type}`)}
      >
        NEXT
      </div>
    </div>
  );
};

export default DetailsPage;

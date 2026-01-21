import React from "react";
import Card from "../widgets/CardComponent";

import jobOfferLetter from "../assets/job_offer.png";
import internship from "../assets/internship.png";
import jobAgreement from "../assets/job_agreement.png";
import nda from "../assets/nda.png";
import rentAgreement from "../assets/rent_agreement.png";

interface CardData {
  card_title: string;
  card_image: string;
  card_description: string;
  card_type: string;
}

const HomePage: React.FC = () => {
  // list cards to show Contract-Cards
  const cards: CardData[] = [
    {
      card_title: "Job offer letter",
      card_image: jobOfferLetter,
      card_description: "tap to see",
      card_type: "job_offer_letter",
    },
    {
      card_title: "Internship offer letter",
      card_image: internship,
      card_description: "tap to see",
      card_type: "internship_offer_letter",
    },
    {
      card_title: "Job Contract Agreement",
      card_image: jobAgreement,
      card_description: "tap to see",
      card_type: "job_agreement",
    },
    {
      card_title: "Rent Agreement",
      card_image: rentAgreement,
      card_description: "tap to see",
      card_type: "rent_agreement",
    },
    {
      card_title: "Non-Disclosure Agreement",
      card_image: nda,
      card_description: "tap to see",
      card_type: "nda",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.card_title}
            description={card.card_description}
            image={card.card_image}
            type={card.card_type}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

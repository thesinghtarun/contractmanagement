import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

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
  preview: string;
}

type ContractDetailsMap = Record<ContractType, ContractDetail>;

type FormData = Record<string, string>;

/* -------------------- Component -------------------- */

const FormPage: React.FC = () => {
  const { type } = useParams<{ type: ContractType }>();
  const navigate = useNavigate();

  const details = type
    ? (contractDetails as ContractDetailsMap)[type]
    : undefined;

  const [formData, setFormData] = useState<FormData>({});

  const inputStyle = `
    bg-white rounded-md px-3 py-2
    shadow-md
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
    focus:shadow-xl
    transition
    w-full
  `;

  /* 🔹 Extract placeholders dynamically from preview string */
  const fields = useMemo<string[]>(() => {
    if (!details) return [];

    const regex = /{{(.*?)}}/g;
    const found = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = regex.exec(details.preview)) !== null) {
      found.add(match[1]);
    }

    return Array.from(found);
  }, [details]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ✅ Validation */
  const validateForm = (): boolean => {
    for (const field of fields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill ${field.replaceAll("_", " ")}`);
        return false;
      }
    }
    return true;
  };

  /* 🔹 Replace placeholders with user data */
  const generateFinalText = (): string[] => {
    if (!details) return [];

    let finalText = details.preview;

    Object.keys(formData).forEach(key => {
      finalText = finalText.replaceAll(`{{${key}}}`, formData[key]);
    });

    return finalText.split("\n");
  };

  /* 📄 Generate PDF */
  const handleDownload = () => {
    if (!details) return;
    if (!validateForm()) return;

    const doc = new jsPDF();
    doc.setFont("times");

    const finalText = generateFinalText();
    let y = 20;

    // Title
    doc.setFontSize(16);
    doc.text(details.title, 20, y);
    y += 15;

    doc.setFontSize(12);

    finalText.forEach(line => {
      const splitLines = doc.splitTextToSize(line, 170);
      (splitLines as string[]).forEach((l: string) => {
  doc.text(l, 20, y);
  y += 8;
  if (y > 280) {
    doc.addPage();
    y = 20;
  }
});
      y += 2;
    });

    doc.save(`${type}.pdf`);
    alert("Form downloaded successfully!");
    navigate("/");
  };

  if (!details) {
    return <p className="p-6">No form available</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl flex gap-8 shadow-2xl">
        {/* Form Section */}
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-4">{details.title}</h1>

          <div className="flex flex-col gap-4">
            {fields.map(field => {
  const isDateField = field.toLowerCase().includes("date");

  return (
    <div key={field} className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600">
        {field.replaceAll("_", " ").toUpperCase()}
      </label>

      <input
        type={isDateField ? "date" : "text"}
        className={inputStyle}
        value={formData[field] ?? ""}
        onChange={e => handleChange(field, e.target.value)}
      />
    </div>
  );
})}

          </div>
        </div>

        {/* Download Button */}
        <div className="flex items-end">
          <div
            onClick={handleDownload}
            className="
              bg-white font-bold
              border border-blue-300
              shadow-lg shadow-blue-200
              rounded-full h-10 w-40
              flex justify-center items-center
              text-blue-500 hover:cursor-pointer
              hover:shadow-xl hover:shadow-blue-500
              transition
            "
          >
            Download PDF
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;

import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import contractDetails from "../const/contractDetails.json";
import "../styles/FormPage.css";

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

const FormPage: React.FC = () => {
  const { type } = useParams<{ type: ContractType }>();
  const navigate = useNavigate();

  const details = type
    ? (contractDetails as ContractDetailsMap)[type]
    : undefined;

  const [formData, setFormData] = useState<FormData>({});

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

  const validateForm = (): boolean => {
    for (const field of fields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill ${field.replaceAll("_", " ")}`);
        return false;
      }
    }
    return true;
  };

  const generateFinalText = (): string[] => {
    if (!details) return [];

    let finalText = details.preview;
    Object.keys(formData).forEach(key => {
      finalText = finalText.replaceAll(`{{${key}}}`, formData[key]);
    });

    return finalText.split("\n");
  };

  const handleDownload = () => {
    if (!details) return;
    if (!validateForm()) return;

    const doc = new jsPDF();
    doc.setFont("times");

    const finalText = generateFinalText();
    let y = 20;

    doc.setFontSize(16);
    doc.text(details.title, 20, y);
    y += 15;

    doc.setFontSize(12);

    finalText.forEach(line => {
      const splitLines = doc.splitTextToSize(line, 170);
      (splitLines as string[]).forEach(l => {
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
    return <p style={{ padding: "1.5rem" }}>No form available</p>;
  }

  return (
    <div className="formpage-container">
      <div className="formpage-card">
        {/* Form Section */}
        <div className="formpage-form">
          <h1 className="formpage-title">{details.title}</h1>
          <div className="formpage-fields">
            {fields.map(field => {
              const isDateField = field.toLowerCase().includes("date");

              return (
                <div key={field} className="formpage-field">
                  <label className="formpage-label">
                    {field.replaceAll("_", " ").toUpperCase()}
                  </label>
                  <input
                    type={isDateField ? "date" : "text"}
                    className="formpage-input"
                    value={formData[field] ?? ""}
                    onChange={e => handleChange(field, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Download Button */}
        <div className="formpage-download-container">
          <div
            onClick={handleDownload}
            className="formpage-download"
          >
            Download PDF
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;

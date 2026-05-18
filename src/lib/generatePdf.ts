import jsPDF from "jspdf";

export const generatePdf = (
  question: string,
  answer: string
) => {

  const doc = new jsPDF();

  const pageWidth =
    doc.internal.pageSize.width;

  const pageHeight =
    doc.internal.pageSize.height;

  const margin = 15;

  const maxWidth =
    pageWidth - margin * 2;

  // CLEAN MARKDOWN

  const cleanedAnswer = answer

    // remove bold
    .replace(/\*\*/g, "")

    // remove inline latex $
    .replace(/\$/g, "")

    // remove markdown headers
    .replace(/#/g, "")

    // remove backticks
    .replace(/`/g, "");

  // TITLE

  doc.setFontSize(20);

  doc.text(
    "AI Generated Notes",
    margin,
    20
  );

  // QUESTION TITLE

  doc.setFontSize(15);

  doc.text(
    "Question:",
    margin,
    40
  );

  // QUESTION

  doc.setFontSize(12);

  const questionLines =
    doc.splitTextToSize(
      question,
      maxWidth
    );

  doc.text(
    questionLines,
    margin,
    50
  );

  // ANSWER TITLE

  let currentY =
    60 +
    questionLines.length * 7;

  doc.setFontSize(15);

  doc.text(
    "Answer:",
    margin,
    currentY
  );

  currentY += 10;

  // ANSWER

  doc.setFontSize(12);

  const answerLines =
    doc.splitTextToSize(
      cleanedAnswer,
      maxWidth
    );

  answerLines.forEach(
    (line: string) => {

      // NEW PAGE
      if (
        currentY >
        pageHeight - 20
      ) {

        doc.addPage();

        currentY = 20;
      }

      doc.text(
        line,
        margin,
        currentY
      );

      currentY += 7;
    }
  );

  doc.save("AI_Notes.pdf");
};
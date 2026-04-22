# server/app/utils/pdf_generator.py

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO


def generate_note_pdf(note_data: dict):
    buffer = BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 50

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "ClinicalDocAI - Clinical Note")

    y -= 40
    pdf.setFont("Helvetica", 11)

    for key, value in note_data.items():
        text = f"{key}: {value}"
        pdf.drawString(50, y, text[:100])
        y -= 25

        if y < 60:
            pdf.showPage()
            y = height - 50

    pdf.save()
    buffer.seek(0)

    return buffer
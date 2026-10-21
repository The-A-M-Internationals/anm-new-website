import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface ConsultationData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  vision: string;
  howHeard?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, email, data } = body;

    const smtpHost = process.env.SMTP_HOST || "smtp.office365.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromAddress =
      process.env.FROM_EMAIL ||
      `"The A&M Internationals" <${smtpUser || "am@theaminternationals.com"}>`;
    const adminEmail = process.env.ADMIN_EMAIL || "am@theaminternationals.com";

    const hasSmtpCredentials = Boolean(smtpUser && smtpPass);

    let transporter: nodemailer.Transporter | null = null;
    if (hasSmtpCredentials) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    }

    // 1. NEWSLETTER SUBSCRIPTION EMAIL
    if (type === "subscribe") {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required for subscription" },
          { status: 400 }
        );
      }

      const subscriberSubject =
        "Welcome to The A&M Internationals Newsletter";
      const subscriberHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0D1B3E; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: #C9A84C; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">THE A&M INTERNATIONALS</h1>
            <p style="color: #ffffff; font-size: 13px; margin-top: 6px; opacity: 0.8;">Elevating the World, Elegantly</p>
          </div>
          <div style="padding: 35px 30px; background-color: #ffffff; color: #1F2937;">
            <h2 style="color: #0D1B3E; font-size: 20px; margin-top: 0;">Thank You for Subscribing!</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #4B5563;">
              We are delighted to welcome you to <strong>The A&M Internationals</strong> community. You are now subscribed to receive our latest enterprise insights, industry analysis, and corporate updates.
            </p>
            <div style="margin: 25px 0; padding: 20px; background-color: #FFFBED; border-left: 4px solid #C9A84C; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #78350F; font-weight: 500;">
                Subscribed Email: <strong>${email}</strong>
              </p>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #6B7280;">
              If you ever have any questions or would like to explore our advisory services, feel free to reply directly to this email or contact us at <a href="mailto:am@theaminternationals.com" style="color: #C9A84C; text-decoration: none; font-weight: bold;">am@theaminternationals.com</a>.
            </p>
          </div>
          <div style="padding: 20px 30px; text-align: center; background-color: #09132B; font-size: 12px; color: #9CA3AF;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} The A&M Internationals. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">Ajman Free Zone C1 Building, Ajman Free Zone, UAE</p>
          </div>
        </div>
      `;

      const adminSubject = `New Newsletter Subscriber: ${email}`;
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
          <h2 style="color: #0D1B3E; margin-top: 0;">New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `;

      // Fallback: Also save to Firestore 'mail' collection (triggers Firebase Trigger Email extension if installed)
      try {
        await addDoc(collection(db, "mail"), {
          to: [email],
          message: {
            subject: subscriberSubject,
            html: subscriberHtml,
          },
          createdAt: Timestamp.now(),
        });
      } catch (err) {
        console.warn("Could not write to Firestore mail collection:", err);
      }

      // If SMTP transporter is configured, send emails directly
      if (transporter) {
        try {
          await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: subscriberSubject,
            html: subscriberHtml,
          });

          await transporter.sendMail({
            from: fromAddress,
            to: adminEmail,
            subject: adminSubject,
            html: adminHtml,
          });
          return NextResponse.json({ success: true, method: "smtp" });
        } catch (mailError) {
          console.error("SMTP error sending newsletter email:", mailError);
          return NextResponse.json({
            success: true,
            method: "firestore_fallback",
            warning: "SMTP send failed, queued in Firestore",
          });
        }
      }

      return NextResponse.json({
        success: true,
        method: "firestore_queued",
        notice: "SMTP credentials not provided in .env.local; lead recorded in Firestore",
      });
    }

    // 2. CONSULTATION / INQUIRY BOOKING EMAIL
    if (type === "consultation") {
      const consultData = data as ConsultationData;
      if (!consultData || !consultData.email || !consultData.name) {
        return NextResponse.json(
          { error: "Name and email are required for consultation" },
          { status: 400 }
        );
      }

      const clientSubject =
        "Consultation Request Received - The A&M Internationals";
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0D1B3E; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: #C9A84C; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">THE A&M INTERNATIONALS</h1>
            <p style="color: #ffffff; font-size: 13px; margin-top: 6px; opacity: 0.8;">Enterprise Performance Management & Digital Solutions</p>
          </div>
          <div style="padding: 35px 30px; background-color: #ffffff; color: #1F2937;">
            <h2 style="color: #0D1B3E; font-size: 20px; margin-top: 0;">Dear ${consultData.name},</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #4B5563;">
              Thank you for reaching out to <strong>The A&M Internationals</strong>. We have received your consultation request and our advisory team will review your inquiry and connect with you within <strong>one business day</strong>.
            </p>
            <div style="margin: 25px 0; padding: 20px; background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px;">
              <h3 style="color: #0D1B3E; margin-top: 0; font-size: 16px; border-bottom: 2px solid #C9A84C; padding-bottom: 6px;">Your Request Summary</h3>
              <table style="width: 100%; font-size: 14px; color: #374151; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 35%;">Service:</td>
                  <td style="padding: 6px 0; color: #C9A84C; font-weight: bold;">${consultData.service || "General Inquiry"}</td>
                </tr>
                ${consultData.company ? `<tr><td style="padding: 6px 0; font-weight: bold;">Company:</td><td style="padding: 6px 0;">${consultData.company}</td></tr>` : ""}
                ${consultData.phone ? `<tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td style="padding: 6px 0;">${consultData.phone}</td></tr>` : ""}
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Message / Vision:</td>
                  <td style="padding: 6px 0; line-height: 1.5;">${consultData.vision || "N/A"}</td>
                </tr>
              </table>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #6B7280;">
              If your request is urgent, you can reach our office directly via phone at <a href="tel:+971564783478" style="color: #C9A84C; font-weight: bold; text-decoration: none;">+971 564783478</a> or WhatsApp.
            </p>
          </div>
          <div style="padding: 20px 30px; text-align: center; background-color: #09132B; font-size: 12px; color: #9CA3AF;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} The A&M Internationals. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">Ajman Free Zone C1 Building, Ajman Free Zone, UAE</p>
          </div>
        </div>
      `;

      const adminSubject = `New Consultation Request: ${consultData.name} (${consultData.service})`;
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 25px; border: 1px solid #D1D5DB; border-radius: 8px;">
          <h2 style="color: #0D1B3E; margin-top: 0; border-bottom: 2px solid #C9A84C; padding-bottom: 8px;">New Consultation Request Received</h2>
          <table style="width: 100%; font-size: 15px; border-collapse: collapse; margin-top: 15px;">
            <tr style="border-bottom: 1px solid #E5E7EB;"><td style="padding: 8px 0; font-weight: bold; width: 35%;">Client Name:</td><td style="padding: 8px 0;">${consultData.name}</td></tr>
            <tr style="border-bottom: 1px solid #E5E7EB;"><td style="padding: 8px 0; font-weight: bold;">Work Email:</td><td style="padding: 8px 0;"><a href="mailto:${consultData.email}">${consultData.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #E5E7EB;"><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${consultData.phone || "Not provided"}</td></tr>
            <tr style="border-bottom: 1px solid #E5E7EB;"><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${consultData.company || "Not provided"}</td></tr>
            <tr style="border-bottom: 1px solid #E5E7EB;"><td style="padding: 8px 0; font-weight: bold;">Service Needed:</td><td style="padding: 8px 0; font-weight: bold; color: #C9A84C;">${consultData.service}</td></tr>
            <tr style="border-bottom: 1px solid #E5E7EB;"><td style="padding: 8px 0; font-weight: bold;">How Heard:</td><td style="padding: 8px 0;">${consultData.howHeard || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Vision / Message:</td><td style="padding: 8px 0; white-space: pre-wrap;">${consultData.vision}</td></tr>
          </table>
          <p style="font-size: 12px; color: #6B7280; margin-top: 20px;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      `;

      // Fallback: Also save to Firestore 'mail' collection
      try {
        await addDoc(collection(db, "mail"), {
          to: [consultData.email],
          message: {
            subject: clientSubject,
            html: clientHtml,
          },
          createdAt: Timestamp.now(),
        });
      } catch (err) {
        console.warn("Could not write to Firestore mail collection:", err);
      }

      // If SMTP is configured, send emails directly
      if (transporter) {
        try {
          await transporter.sendMail({
            from: fromAddress,
            to: consultData.email,
            subject: clientSubject,
            html: clientHtml,
          });

          await transporter.sendMail({
            from: fromAddress,
            to: adminEmail,
            subject: adminSubject,
            html: adminHtml,
          });
          return NextResponse.json({ success: true, method: "smtp" });
        } catch (mailError) {
          console.error("SMTP error sending consultation email:", mailError);
          return NextResponse.json({
            success: true,
            method: "firestore_fallback",
            warning: "SMTP send failed, queued in Firestore",
          });
        }
      }

      return NextResponse.json({
        success: true,
        method: "firestore_queued",
        notice: "SMTP credentials not provided in .env.local; inquiry recorded in Firestore",
      });
    }

    return NextResponse.json({ error: "Invalid email request type" }, { status: 400 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("Email route error:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

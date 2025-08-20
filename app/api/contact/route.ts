import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi()
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, designation, companyName, website, phone, message } = body

    // Validate required fields
    if (!fullName || !designation || !companyName || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
      <h2>New Google Workspace Inquiry from ${companyName}</h2>
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Full Name:</strong> ${fullName}</li>
          <li><strong>Designation:</strong> ${designation}</li>
          <li><strong>Company:</strong> ${companyName}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          ${website ? `<li><strong>Website:</strong> <a href="${website}">${website}</a></li>` : ''}
        </ul>
        
        ${message ? `
          <h3>Message:</h3>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        ` : ''}
        
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This inquiry was submitted through the Digitbite Google Workspace website contact form.
        </p>
      </div>
    `

    // Prepare email data
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.to = [{ 
      email: process.env.BREVO_TO_EMAIL || 'sales@digitbite.com',
      name: 'Digitbite Sales Team'
    }]
    sendSmtpEmail.sender = { 
      email: process.env.BREVO_FROM_EMAIL || 'noreply@digitbite.com',
      name: process.env.BREVO_FROM_NAME || 'Digitbite'
    }
    sendSmtpEmail.subject = `New Google Workspace Inquiry from ${companyName} - ${fullName}`
    sendSmtpEmail.htmlContent = emailContent
    sendSmtpEmail.replyTo = {
      email: phone.includes('@') ? phone : `${fullName.toLowerCase().replace(/\s+/g, '.')}@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      name: fullName
    }

    // Send email via Brevo
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
    
    console.log('Email sent successfully:', result)

    // Send auto-reply to the customer
    const autoReplyEmail = new brevo.SendSmtpEmail()
    autoReplyEmail.to = [{ 
      email: phone.includes('@') ? phone : `${fullName.toLowerCase().replace(/\s+/g, '.')}@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      name: fullName
    }]
    autoReplyEmail.sender = { 
      email: process.env.BREVO_FROM_EMAIL || 'noreply@digitbite.com',
      name: process.env.BREVO_FROM_NAME || 'Digitbite'
    }
    autoReplyEmail.subject = 'Thank you for your Google Workspace inquiry - Digitbite'
    autoReplyEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="color: #4F46E5;">Thank you for your inquiry, ${fullName}!</h2>
        
        <p>We've received your Google Workspace inquiry and our team will get back to you within 24 hours.</p>
        
        <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Your Inquiry Details:</h3>
          <ul style="margin: 0;">
            <li><strong>Company:</strong> ${companyName}</li>
            <li><strong>Contact:</strong> ${fullName} (${designation})</li>
            <li><strong>Phone:</strong> ${phone}</li>
            ${website ? `<li><strong>Website:</strong> ${website}</li>` : ''}
          </ul>
        </div>
        
        <p>In the meantime, here's what you can expect:</p>
        <ul>
          <li>✅ Personalized Google Workspace Business Plus quote</li>
          <li>✅ AI-powered Gemini Pro features demonstration</li>
          <li>✅ Migration and setup assistance</li>
          <li>✅ Up to 75% discount for qualified businesses</li>
        </ul>
        
        <p>If you have any urgent questions, feel free to call us directly.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
          <p style="margin: 0; color: #6B7280; font-size: 14px;">
            Best regards,<br>
            <strong>Digitbite Sales Team</strong><br>
            Google Workspace Authorized Reseller
          </p>
        </div>
      </div>
    `

    try {
      await apiInstance.sendTransacEmail(autoReplyEmail)
      console.log('Auto-reply sent successfully')
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError)
      // Don't fail the main request if auto-reply fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been sent successfully! We\'ll get back to you within 24 hours.',
        messageId: result.messageId 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send inquiry. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}
